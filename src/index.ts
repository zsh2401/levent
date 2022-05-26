export { default as Levent } from "./Levent"
export { default as ILevent } from "./ILevent"
export { default as IPreventableEventArg, isPreventable } from "./IPreventableEventArg"

export * from "./Options"

import Levent from "./Levent";

/**
 * Default EventX instance
 */
export default new Levent();