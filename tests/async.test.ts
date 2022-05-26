import { Levent } from "../src"
describe("async test", () => {

    const instance = new Levent<{
        "test": (x: string) => Promise<string>
    }>();

    it("awaitable", async () => {

        instance.on("test", async (arg: string) => arg)
        instance.on("test", async (arg: string) => arg + "x")

        const results = await instance.emit("test", "fine", { async: true })

        expect(results).toStrictEqual(["fine", "finex"])
    })

})