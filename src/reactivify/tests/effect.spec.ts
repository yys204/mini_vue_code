import {reactive} from "../reactive"
import {effect,stop} from "../effect"
describe("effect",()=>{
    it("happy effect",()=>{
        const user = reactive({
            age:10
        })
        let nextAge
        effect(()=>{
            nextAge = user.age + 1
        })
        expect(nextAge).toBe(11)
        // 依赖变化
        user.age++
        expect(nextAge).toBe(12)
    })
    it("should return runner when call effect",()=>{
        let foo = 10
        const runner = effect(()=>{
            foo++
            return "foo"
        })
        expect(foo).toBe(11)
        const r = runner()
        expect(foo).toBe(12)
        expect(r).toBe("foo")
    })
    it("scheduler",()=>{
        let dummy
        let run:any
        const scheduler = jest.fn(()=>{
            run = runner
        })
        const obj = reactive({foo:1})
        const runner = effect(()=>{
            dummy = obj.foo
        },{scheduler})
        expect(scheduler).not.toHaveBeenCalled()
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1)
        expect(dummy).toBe(1)
        runner()
        expect(dummy).toBe(2)
    })
    it("stop",()=>{
        let dumny;
        const obj = reactive({
            foo:1
        })
        const runner = effect(()=>{
            dumny = obj.foo
        })
        obj.foo = 2
        expect(dumny).toBe(2)
        stop(runner)
        obj.foo++
        expect(dumny).toBe(2)
        runner()
        expect(dumny).toBe(3)
    })
    it("onStop",()=>{
        const obj = reactive({
            foo:1
        })
        const onStop = jest.fn()
        let dumny
        const runner = effect(()=>{
            dumny = obj.foo
        },{onStop})
        stop(runner)
        expect(onStop).toHaveBeenCalledTimes(1)
    })  
})
