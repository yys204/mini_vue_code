import { createVNode } from "./vNode"
import { render } from "./render"
export function createApp(rootComponent){
    return {
        mount(rootContainer){
            // 创建 vnode
            const vnode = createVNode(rootComponent)
            // 渲染
            render(vnode, rootContainer)

        }
    }
}

