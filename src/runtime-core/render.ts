import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./components"
import { ShapeFlags } from "../shared/ShapeFlags"
import { Fragment, Text } from "./vNode"
export function render(vnode, rootContainer){
    patch(vnode, rootContainer)
}

function patch(vnode, rootContainer){
    const {type,shapeFlag} = vnode
   //todo 判断vnode类型是不是一个element
   //是element 则处理element
   //不是element 则处理component
   // processElement(vnode, rootContainer)
//    Fragment  -> 只渲染children
//    Text  -> 只渲染text
//    component  -> 渲染component


switch(type){
    case Fragment:
        processFragment(vnode, rootContainer)
        break;
    case Text:
        processText(vnode, rootContainer)
        break;
    default:
        if(shapeFlag & ShapeFlags.ELEMENT){
            processElement(vnode, rootContainer)
          }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
            processComponent(vnode, rootContainer)
          }
        break;
}

  console.log(vnode,"vnode");
  
}

function processFragment(vnode, rootContainer){
    mountChildren(vnode.children, rootContainer)
}

function processText(vnode, rootContainer){
    const {children} = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    rootContainer.appendChild(textNode)
}

function processElement(vnode, rootContainer){
    // 处理element
    const el = (vnode.el = document.createElement(vnode.type))
    const {children, props} = vnode
    if(vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN){
        el.textContent = children
    }else if(vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN){
        mountChildren(children, el)
    }
    for(const key in props){
        const value = props[key]
        // 正侧表达式判断，以on开头并且下一个字母为大写的
        const pertterns = /^on[A-Z]/
        if(pertterns.test(key)){
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event, value)
        }else{
            el.setAttribute(key, value)
        }
    }
    rootContainer.appendChild(el)
}

function mountChildren(children, el){
    for(let i = 0; i < children.length; i++){
        patch(children[i], el)
    }
}

function processComponent(vnode, rootContainer){
    mountComponent(vnode, rootContainer)
}

function mountComponent(initialVNode, rootContainer){
    // 创建一个虚拟节点
    const instance = createComponentInstance(initialVNode)
    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, rootContainer)
}

function setupRenderEffect(instance, initialVNode, rootContainer){
    const {proxy} = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, rootContainer)
    initialVNode.el = subTree.el
}