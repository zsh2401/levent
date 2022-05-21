import { AsyncEmitOptions, EmitOptions } from "./Options";

type OptionsType = AsyncEmitOptions | EmitOptions

export function asyncEnabled(options?: OptionsType): boolean {
    if (isAsyncEmitOption(options)) {
        return options.async
    }
    return false
}

export function stickyEnable(options?: OptionsType) {
    return options?.sticky ?? false
}

export function isAsyncEmitOption(option?: EmitOptions | AsyncEmitOptions): option is AsyncEmitOptions {
    return (option as AsyncEmitOptions)?.async !== undefined;
}