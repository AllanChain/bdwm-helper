import { createApp } from 'vue'
import App from './App.vue'
import { initBlock } from './block'
import { createSettingsBtn } from './settings-btn'
import 'uno.css'

initBlock()
createSettingsBtn()
const anchorDiv = document.createElement('div')
document.body.appendChild(anchorDiv)
createApp(App).mount(anchorDiv)
