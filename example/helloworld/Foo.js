import { h } from '../../lib/guide-mini-vue.esm.js'
export const Foo = {
    name: 'Foo',
    setup(props){
        console.log(props);
        props.count++
    },
    render(){
        return h('div',{
            class: 'red',
            onClick:()=>{
                console.log('click');
                this.count++
            }
        },'count:'+this.count)
    }
}