import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
window.self = null
export const App = {   
 //.vue 文件

 render(){
    window.self = this
    // ui
    return h('div', {'class': 'red',onClick:()=>{
        console.log("click");
    }}, [h('div', {class: 'green',onMouseDown:()=>{
        console.log("mouseDown");
    }}, this.name), h('div', {class: 'blue'}, 'hello world'),h(Foo,{count:1})] )
 },


setup(){
    // composition api
    return {
        name: '张三'
    }
}

}