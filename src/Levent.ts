import ILevent, { DefaultEventRecords, EventType, ExtractArgument, ExtractReturn } from "./ILevent";
import { EventHandler } from "./IEventHandler";
import { AsyncEmitOptions, EmitOptions } from "./Options";
import { isAsyncEmitOption } from "./parseOptions";
import { isPreventable, prevent } from "./IPreventableEventArg";

/**
 * Default Levent implementation.
 */
export default class Levent<Events extends Record<EventType, EventHandler<any, any>> = DefaultEventRecords> implements ILevent<Events> {

    private readonly handlers: Map<keyof Events, Set<any>>;
    private readonly stickyRecords: Map<keyof Events, any>;

    /**
     * Create a new EventBus
     */
    constructor() {
        this.handlers = new Map()
        this.stickyRecords = new Map()
    }

    once<N extends keyof Events>(event: N, handler: Events[N]): void {
        const wrapped = (e: any): any => {
            this.off(event, wrapped as any)
            return handler(e)
        }
        this.on(event, wrapped as any)
    }

    emit<N extends keyof Events>(event: N, args?: ExtractArgument<Events[N]>, options?: EmitOptions): ExtractReturn<Events[N]>[]
    emit<N extends keyof Events>(event: N, args?: ExtractArgument<Events[N]>, options?: AsyncEmitOptions): Promise<ExtractReturn<Events[N]>[]>;
    emit<N extends keyof Events>(event: N, args?: any, options?: EmitOptions | AsyncEmitOptions): any {

        if (options?.sticky) {
            this.stickyRecords.set(event, args)
        } else if (this.stickyRecords.has(event)) {
            this.stickyRecords.delete(event)
        }

        if (isAsyncEmitOption(options) && options.async) {
            return this.async(event, args, options);
        } else {
            return this.sync(event, args, options)
        }

    }

    on<N extends keyof Events>(event: N, handler: Events[N]): void {
        this.handlerSetOf(event).add(handler)

        if (this.stickyRecords.has(event)) {
            handler(this.stickyRecords.get(event))
        }

    }

    off<N extends keyof Events>(event: N, handler: Events[N]): void {
        this.handlerSetOf(event).delete(handler)
    }

    private async async<N extends keyof Events>(event: N, arg: any, options?: AsyncEmitOptions)
        : Promise<any[]> {
        const ahook = options?.afterEachOne;
        const results = []

        for (const h of this.handlerSetOf(event)) {

            const result = await h(arg)
            results.push(result)

            if (!this.hasNext(options, arg, result)) {
                break;
            }

        }

        return results;
    }

    private sync<N extends keyof Events>(event: N, arg: any, options?: EmitOptions) {
        const results = []

        for (const h of this.handlerSetOf(event)) {
            const result = h(arg)
            results.push(result)
            if (!this.hasNext(options, arg, result)) {
                break;
            }
        }

        return results;
    }

    private hasNext(options: EmitOptions | undefined, arg: any, result: any): boolean {

        const ahook = options?.afterEachOne;

        if (isPreventable(arg) && arg[prevent]) {
            return false;
        } else if (ahook && ahook(result) === false) {
            return false;
        }

        return true
    }

    private handlerSetOf<N extends keyof Events>(eventName: N): Set<Events[N]> {
        if (this.handlers.has(eventName)) {
            return this.handlers.get(eventName)!
        } else {
            const result = new Set<Events[N]>();
            this.handlers.set(eventName, result)
            return result
        }
    }
}