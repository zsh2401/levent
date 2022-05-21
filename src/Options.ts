/**
 * Options for emiting events.
 * @author zsh2401
 */
export interface EmitOptions {

    /**
     * If this is a sticky event,
     * those new handler will receive the latest event.
     * 
     * @default false
     */
    sticky?: boolean

    /**
     * Call after each event handler
     * @returns true if next handler is expected to execute.
     */
    afterEachOne?: <R>(returnValue: R) => boolean

    /**
     * Stop publishing events if one handler throws
     * expcetion
     * 
     * @default false
     */
    strict?: boolean
    
}
/**
 * Async emit options.
 * @author zsh2401
 */
export type AsyncEmitOptions = { async: boolean } & EmitOptions
