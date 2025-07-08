import { ShapeFlags } from "../shared/ShapeFlags"

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
    return vnode
}

function getShapeFlag(type){
    return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}