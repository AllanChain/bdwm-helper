import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn } from 'vite-plugin-monkey'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      presets: [
        presetAttributify({
          strict: true,
          prefixedOnly: true,
        }),
        presetUno(),
        presetIcons(),
      ],
    }),
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        'name': '未名 BBS 屏蔽助手',
        'namespace': 'https://allanchain.github.io',
        'description': 'BDWM Block',
        'author': 'motaguoke & Allan Chain',
        'match': [
          'http://bbs.pku.edu.cn/*',
          'https://bbs.pku.edu.cn/*',
          'http://*.bdwm.net/*',
          'https://*.bdwm.net/*',
        ],
        'run-at': 'document-body',
        'icon': 'https://bbs.pku.edu.cn/favicon.ico',
        'source': 'https://github.com/AllanChain/bdwm-helper',
        'supportURL': 'https://github.com/AllanChain/bdwm-helper/issues',
        'updateURL': 'https://allanchain.github.io/bdwm-helper/bdwm-helper.iife.user.js',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
})
