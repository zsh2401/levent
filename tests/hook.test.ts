import { Levent } from "../src"

describe("hook test", () => {
    const instance = new Levent()
    
    it("hook with sequence", () => {
        instance.emit("test", () => { })
    })

})