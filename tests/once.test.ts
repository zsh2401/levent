import { Levent } from "../src"

describe("once", () => {
    it("only one time", () => {
        const levent = new Levent()
        let i = 0;
        levent.once("test", () => {
            i++
        })
        levent.emit("test", {})
        levent.emit("test", {})
        expect(i).toBe(1)
    })
})