import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {   
 //.vue 文件

 renter(){
    // ui
    return h('div', 'hello' + this.name)
 },


setup(){
    // composition api
    return {
        name: '张三'
    }
}

}