import { reactiveHandlers,readonlyHandlers,shallowReadonlyHandlers } from "./baseHandles"
import { isObject } from "../shared/index"
export const enum ReactiveFlags{
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}
export function reactive(raw){
    return new Proxy(raw,reactiveHandlers)
}
export function readonly(raw){
    return new Proxy(raw,readonlyHandlers)
}
export function shallowReadonly(raw){
    return createReactiveObject(raw,shallowReadonlyHandlers)
}
export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]
}
export function isProxy(value){
    return isReactive(value) || isReadonly(value)
}
function createReactiveObject(target,baseHandlers){
    if(!isObject(target)){
        console.warn(`target ${target} 必须是一个对象`)
        return target
    }
    return new Proxy(target,baseHandlers)
}
