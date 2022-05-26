import { Levent } from "../src";

describe("sticky", () => {
    it("sticky", () => {
        const instance = new Levent<{ "test": (x: string) => void }>()

        const arg = "fine"

        let beforeRecevied = false;
        let afterReceived = false;
        instance.on("test", () => {
            beforeRecevied = true
        })
        instance.emit("test", arg, { sticky: true })

        instance.on("test", (_arg) => {
            afterReceived = true
            expect(_arg).toBe(arg)
        })

        expect(beforeRecevied).toBeTruthy()
        expect(afterReceived).toBeTruthy()
    })
})