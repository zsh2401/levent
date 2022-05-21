import { EventX } from "../src"

describe("hook test", () => {
    const instance = new EventX()
    
    it("hook with sequence", () => {
        instance.emit("test", () => { })
    })

})