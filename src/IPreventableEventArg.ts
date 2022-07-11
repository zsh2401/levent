export const prevent = Symbol();
export default interface IPreventableEventArg {
    [prevent]: boolean
}
export function isPreventable(arg: any): arg is IPreventableEventArg {
    return arg && arg[prevent] !== undefined;
}
