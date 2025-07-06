export function createComponentInstance(vnode){
    // 创建一个虚拟节点
    console.log(vnode)

    const component = {
        vnode,
        type: vnode.type,
    }
    return component
}

export function setupComponent(instance){
    // 设置组件
    console.log(instance)
    // todo
    // initProps(instance)
    // initSlots(instance)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance){
    // 设置状态组件
    console.log(instance)
    const Component = instance.type
    // 获取组件的 setup 函数
    const { setup } = Component
    // 如果 setup 函数存在，则调用 setup 函数
    if(setup){
        const setupResult = setup()
        // 处理 setup 函数返回的结果
        handleSetupResult(instance, setupResult)
    }
}

function handleSetupResult(instance, setupResult){
    // 处理 setup 函数返回的结果
    console.log(instance, setupResult)
    // 如果 setup 函数返回的是一个对象，则将对象赋值给 instance.setupState
    if(typeof setupResult === 'object'){
        instance.setupState = setupResult
    }
    // 完成组件的设置
    finishComponentSetup(instance)
}

function finishComponentSetup(instance){
    // 完成组件的设置
    console.log(instance)
    const Component = instance.type
    instance.render = Component.render
}




