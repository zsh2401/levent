import { Levent } from "../src"

describe("arg test", () => {
    const levent = new Levent()
    it("works with no arguments", () => {
        let called = false;
        levent.on("test", () => {
            called = true
        })
        levent.emit("test")
        expect(called).toBeTruthy()
    })
})