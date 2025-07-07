import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./components"
export function render(vnode, rootContainer){
    patch(vnode, rootContainer)
}

function patch(vnode, rootContainer){
   //todo 判断vnode类型是不是一个element
   //是element 则处理element
   //不是element 则处理component
   // processElement(vnode, rootContainer)
  console.log(vnode,"vnode");
  if(typeof vnode.type === "string"){
    processElement(vnode, rootContainer)
  }else if(isObject(vnode.type)){
    processComponent(vnode, rootContainer)
  }
}

function processElement(vnode, rootContainer){
    // 处理element
    const el = (vnode.el = document.createElement(vnode.type))
    const {children, props} = vnode
    if(typeof children === "string"){
        el.textContent = children
    }else if(Array.isArray(children)){
        mountChildren(children, el)
    }
    for(const key in props){
        const value = props[key]
        el.setAttribute(key, value)
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