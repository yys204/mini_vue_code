import { reactiveHandlers,readonlyHandlers,shallowReadonlyHandlers } from "./baseHandles"
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
export function shallowReadonly(value){
    return new Proxy(value,shallowReadonlyHandlers)
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

