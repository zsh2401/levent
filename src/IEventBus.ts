import { EventHandler } from "./IEventHandler";
import { EmitOptions, AsyncEmitOptions } from "./Options";


export type EventType = string | symbol;

/**
 * Standard EventX bus defination.
 * 
 * @example const bus: IEventBus<{appLoaded:[string,number]}>
 * above codes defined a event bus which contains one event named appLoaed, this
 * event requires a handler that receive a string as args and returns a number as result.
 */
export default interface IEventBus<Events extends Record<EventType, [unknown, unknown]>> {

    emit<N extends keyof Events>(event: N, args?: Events[N][0], options?: EmitOptions): Events[N][1][]

    emit<N extends keyof Events>(event: N, args?: Events[N][0], options?: AsyncEmitOptions): Promise<Events[N][1][]>

    on<N extends keyof Events>(event: N, handler: EventHandler<Events[N][0], Events[N][1]>): void

    off<N extends keyof Events>(event: N, handler: EventHandler<Events[N][0], Events[N][1]>): void

}
