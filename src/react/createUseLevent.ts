import { DependencyList } from "react";
import { EventHandler } from "../IEventHandler";
import ILevent, { EventType } from "../ILevent";
import useLevent from "./useLevent";

export default function <Events extends Record<EventType, EventHandler<any, any>>>(instance: ILevent<Events>) {
    return <E extends keyof Events>(e: E, h: Events[E], d?: DependencyList) => {
        return useLevent(e, h, d, instance)
    }
}