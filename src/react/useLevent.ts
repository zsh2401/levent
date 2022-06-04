import { useEffect } from 'react';
import ILevent, { DefaultEventRecords, EventType, ExtractArgument, ExtractReturn } from '../ILevent';
import levent, { AsyncEmitOptions, EmitOptions } from "../"
import { DependencyList, useMemo } from 'react';
import { EventHandler } from '../IEventHandler';

type Trigger<E, R> =
    ((e: E, options?: EmitOptions) => R[]) |
    ((e: E, options?: AsyncEmitOptions) => Promise<R[]>)

export default function useLevent<EventName extends EventType,
    Events extends Record<EventType, EventHandler<any, any>> = DefaultEventRecords>

    (eventName: EventName, handler?: Events[EventName], deps?: DependencyList, leventInstance?: ILevent<Events>):

    Trigger<ExtractArgument<Events[EventName]>, ExtractReturn<Events[EventName]>> {

    const instance: ILevent = useMemo<ILevent>(() => leventInstance ?? levent, [leventInstance]);

    const trigger = useMemo(() => {
        return (e: ExtractArgument<Events[EventName]>, options?: AsyncEmitOptions | EmitOptions) => {
            return levent.emit(eventName, e, options)
        }
    }, [instance])

    useEffect(() => {
        if (handler) {
            instance.on(eventName, handler)
            return () => {
                instance.off(eventName, handler)
            }
        } else {
            return () => { };
        }

    }, [leventInstance, ...(deps ?? [])])

    return trigger;
}
