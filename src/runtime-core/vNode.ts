import { ShapeFlags } from "../shared/ShapeFlags"
export const Fragment = Symbol("Fragment")
export const Text = Symbol("Text")
export function createVNode(type, props?, children?){
    const shapeFlag = getShapeFlag(type)
    const vnode = {
        type,
        props,
        children,
        shapeFlag,
        el: null
    }
    if(typeof children === 'string'){
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    }else if(Array.isArray(children)){
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
    }
    if(vnode.shapeFlag&ShapeFlags.STATEFUL_COMPONENT){
        if(typeof children === "object"){
            vnode.shapeFlag|=ShapeFlags.SLOTS_CHILDREN
        }
    }
    return vnode
}

export function createTextVNode(text){
    return createVNode(Text,{},text)
}

function getShapeFlag(type){
    return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}