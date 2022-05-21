export { default as EventX } from "./Levent"
export { default as IEventBus } from "./IEventBus"
export { default as IPreventableEventArg, isPreventable } from "./IPreventableEventArg"

export * from "./Options"

import Levent from "./Levent";

/**
 * Default EventX instance
 */
export default new Levent();