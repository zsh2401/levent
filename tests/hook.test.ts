import { Levent } from "../src"

describe("hook test", () => {
    const instance = new Levent<{
        "test": (x: number) => number
    }>()

    it("hook with sequence", () => {
        // instance.emit("test", 1, { async: true, afterEachOne })
    })

})