import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
export const App = {   
    name:"App",
 //.vue 文件

 render(){
   const app = h("div",{
    id:"app"
   },"App")
   const foo = h(Foo,{},{hearder:(age)=>h("p",{},"header"+age),footer:()=>h("p",{},"footer")})
   return h("div",{},[app,foo])
 },


setup(){
    return {
       
    }
}
}