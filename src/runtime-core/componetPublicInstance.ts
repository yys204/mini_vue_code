import { hasOwn } from "../shared/index"
const proxyInstanceMap = {
    "$el":(i)=>i.vnode.el
}

interface ComponentInstance {
    _: any;
}

export const PublicInstanceProxyHandler = {
    get(target: ComponentInstance, key: string) {
            const instance = target._ as any
            const {setupState,props} = instance
            if(hasOwn(setupState, key)){
                return setupState[key]
            }else if(hasOwn(props, key)){
                return props[key]
            }
           
            const proxyInstance = proxyInstanceMap[key]
            if(proxyInstance){
                return proxyInstance(instance)
            }
    }
}