const proxyInstanceMap = {
    "$el":(i)=>i.vnode.el
}

interface ComponentInstance {
    _: any;
}

export const PublicInstanceProxyHandler = {
    get(target: ComponentInstance, key: string) {
            const instance = target._ as any
            const {setupState} = instance
            if(key in setupState){
                return setupState[key]
            }
            const proxyInstance = proxyInstanceMap[key]
            if(proxyInstance){
                return proxyInstance(instance)
            }
    }
}