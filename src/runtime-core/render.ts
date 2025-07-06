import { createComponentInstance, setupComponent } from "./components"
export function render(vnode, rootContainer){
    // 渲染
    console.log(vnode, rootContainer)
    patch(vnode, rootContainer)
}

function patch(vnode, rootContainer){
   //todo 判断vnode类型是不是一个element
   //是element 则处理element
   //不是element 则处理component
   // processElement(vnode, rootContainer)
  

    processComponent(vnode,rootContainer)
}

function processComponent(vnode, rootContainer){
    // 处理组件
    console.log(vnode, rootContainer)
    mountComponent(vnode, rootContainer)
}

function mountComponent(vnode, rootContainer){
    // 挂载组件
    console.log(vnode)

    // 创建一个虚拟节点
    const vNode = createComponentInstance(vnode)
    setupComponent(vNode)
    setupRenderEffect(vNode, rootContainer)
}

function setupRenderEffect(vNode, rootContainer){
    const subTree = vNode.render()
    patch(subTree, rootContainer)
}