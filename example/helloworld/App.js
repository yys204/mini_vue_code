import { h } from '../../lib/guide-mini-vue.esm.js'
window.self = null
export const App = {   
 //.vue 文件

 render(){
    window.self = this
    // ui
    return h('div', {'class': 'red'}, [h('div', {class: 'green'}, this.name), h('div', {class: 'blue'}, 'hello world')] )
 },


setup(){
    // composition api
    return {
        name: '张三'
    }
}

}