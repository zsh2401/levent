import ILevent, { DefaultEventRecords, EmittingResult, EventType, ExtractArgument, ExtractReturn } from "./ILevent";
import { EventHandler } from "./IEventHandler";
import { AsyncEmitOptions, EmitOptions } from "./Options";
import { isAsyncEmitOption } from "./parseOptions";
import { isPreventable, prevent } from "./IPreventableEventArg";

/**
 * Default Levent implementation.
 * @author zsh2401
 */
export default class Levent<Events extends Record<EventType, EventHandler<any, any>> = DefaultEventRecords> implements ILevent<Events> {

    private readonly handlers: Map<keyof Events, Map<EventHandler<any, any>, boolean>>;

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

    emit<N extends keyof Events>(event: N, args?: ExtractArgument<Events[N]>, options?: EmitOptions | AsyncEmitOptions): EmittingResult<Events[N]> {

        if (options?.sticky) {
            this.stickyRecords.set(event, args)
        } else if (this.stickyRecords.has(event)) {
            this.stickyRecords.delete(event)
        }

        if (isAsyncEmitOption(options) && options.async) {
            // @ts-ignore
            return this.async(event, args, options);
        } else {
            //@ts-ignore
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
                       //@ts-ignore
            return this.handlers.get(eventName) as Set<Events[N]>
        } else {
            const result = new Set<Events[N]>();
                       //@ts-ignore
            this.handlers.set(eventName, result)
            return result
        }
    }
}