// vue3 核心
import { createApp } from '../../lib/guide-mini-vue.esm.js'
import { App } from './App.js'
const rootElement = document.querySelector('#app')
createApp(App).mount(rootElement)