import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
window.self = null
export const App = {   
    name:"App",
 //.vue 文件

 render(){
    return h("div",{},[h("div",{},"App"),h(Foo,{onAdd:(a,b)=>{
        console.log("onAdd",a,b);
    },onAddFoo:(a,b)=>{
        console.log("onAddFoo",a,b);
    }})])
 },


setup(){
    return {
       
    }
}
}