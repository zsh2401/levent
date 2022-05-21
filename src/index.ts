export { default as EventX } from "./EventX"
export { default as IEventX } from "./IEventX"
export { default as IPreventableEventArg, isPreventable } from "./IPreventableEventArg"

export * from "./Options"

import EventX from "./EventX";

/**
 * Default EventX instance
 */
export default new EventX();