export interface EventHandler<E, R> {
    (args: E): R | Promise<R>;
}