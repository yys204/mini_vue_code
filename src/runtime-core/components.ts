import { PublicInstanceProxyHandler } from "./componetPublicInstance"
import { initProps } from "./componentsProps"
import { shallowReadonly } from "../reactivify/reactive"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlots"
export function createComponentInstance(vnode){
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        emit:()=>{}
    }
    component.emit = emit.bind(null,component) as any
    return component
}

export function setupComponent(instance){
    initProps(instance, instance.vnode.props)
    initSlots(instance, instance.vnode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance){
    const Component = instance.type
    instance.proxy = new Proxy({_: instance},
        PublicInstanceProxyHandler
   )
    // 获取组件的 setup 函数
    const { setup } = Component
    // 如果 setup 函数存在，则调用 setup 函数
    if(setup){
        const setupResult = setup(shallowReadonly(instance.props),{emit:instance.emit})
        // 处理 setup 函数返回的结果
        handleSetupResult(instance, setupResult)
    }
}

function handleSetupResult(instance, setupResult){
    // 如果 setup 函数返回的是一个对象，则将对象赋值给 instance.setupState
    if(typeof setupResult === 'object'){
        instance.setupState = setupResult
    }
    // 完成组件的设置
    finishComponentSetup(instance)
}

function finishComponentSetup(instance){
    const Component = instance.type
    instance.render = Component.render
}




