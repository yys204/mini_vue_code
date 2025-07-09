import { track,trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"
import { extend, isObject } from "../shared/index"
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const readonlySet = (target,key,value)=>{
    console.warn(`修改失败: ${JSON.stringify(target)} 的 ${key} 属性，${key} 是只读的`)
    return true
}
const shallowReadonlyGet = createGetter(true,true)
function createGetter(isReadonly = false,shallow = false){
    return function get(target,key){
        if(key === ReactiveFlags.IS_REACTIVE){
            return !isReadonly
        }else if(key === ReactiveFlags.IS_READONLY){
            return isReadonly
        }
        const res = Reflect.get(target,key)
        if(shallow){
            return res
        }
        if(isObject(res)){
            return isReadonly ? readonly(res) : reactive(res)
        }
        if(!isReadonly){
            // 收集依赖
            track(target,key)
        }
        return res
    }
}
function createSetter(){
    return function set(target,key,value){
        const res = Reflect.set(target,key,value)
        trigger(target,key)
        return res
    }
}
export const reactiveHandlers = {
    get,
    set
}
export const readonlyHandlers = {
    get:readonlyGet,
    set:readonlySet
}

export const shallowReadonlyHandlers = extend({},readonlyHandlers,{
    get:shallowReadonlyGet
})
