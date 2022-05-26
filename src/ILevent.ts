import { EventHandler } from "./IEventHandler";
import { EmitOptions, AsyncEmitOptions } from "./Options";


export type EventType = string | symbol;

export type ExtractArgument<Type> = Type extends EventHandler<infer X, any> ? X : never
export type ExtractReturn<Type> = Type extends EventHandler<any, infer X> ? X : never

export type DefaultEventRecords = {
    [P in EventType]: any
}
/**
 * Standard EventX bus defination.
 * 
 * @example const bus: IEventBus<{appLoaded:[string,number]}>
 * above codes defined a event bus which contains one event named appLoaed, this
 * event requires a handler that receive a string as args and returns a number as result.
 */
export default interface ILevent<Events extends Record<EventType, EventHandler<any, any>> = DefaultEventRecords> {

    emit<N extends keyof Events, E, V>(event: N, args?: ExtractArgument<Events[N]>, options?: EmitOptions): ExtractReturn<Events[N]>[]

    emit<N extends keyof Events>(event: N, args?: ExtractArgument<Events[N]>, options?: AsyncEmitOptions): Promise<ExtractReturn<Events[N]>[]>

    on<N extends keyof Events>(event: N, handler: Events[N]): void

    off<N extends keyof Events>(event: N, handler: Events[N]): void

}
