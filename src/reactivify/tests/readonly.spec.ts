import { isReadonly, readonly,shallowReadonly,isProxy } from '../reactive'
describe('readonly', () => {
    it('should be readonly', () => {

        const obj = {
            name: 'John',
            age: 20,
            nested:{
                foo:1
            }
        }

        const readonlyObj = readonly(obj)
        expect(readonlyObj).not.toBe(obj)
        expect(readonlyObj.name).toBe('John')
        readonlyObj.name = 'Jane'
        expect(readonlyObj.name).toBe('John')
        expect(isReadonly(readonlyObj)).toBe(true)
        expect(isReadonly(obj)).toBe(false)
        expect(isReadonly(readonlyObj.nested)).toBe(true)
        expect(isProxy(readonlyObj)).toBe(true)
    })
    it('warn when call set',()=>{
        console.warn = jest.fn()
        const user = readonly({
            age:10
        })
        user.age = 11
    })
})

describe("shallow readonly",()=>{
    it("should not make non-reactive properties reactive",()=>{
        const obj = {
            foo:1,
            nested:{
                bar:2
            }
        }
        const shallowReadonlyObj = shallowReadonly(obj)
        expect(isReadonly(shallowReadonlyObj)).toBe(true)
        expect(isReadonly(shallowReadonlyObj.nested)).toBe(false)
    })
})
