import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import tampermonkey from 'vite-plugin-tampermonkey'

const tmPlugin = tampermonkey({
  externalGlobals: ['vue'],
})

delete tmPlugin.transform
delete tmPlugin.writeBundle

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
    tmPlugin,
    {
      name: 'inject-css',
      apply: 'build',
      enforce: 'post',
      generateBundle(_, bundle) {
        const cssFiles = Object.keys(bundle).filter(i => i.endsWith('.css'))
        const jsFiles = Object.keys(bundle).filter(i => i.endsWith('.js'))
        const cssContent = cssFiles
          .map((cssFile) => {
            const chunk = bundle[cssFile]
            if (chunk.type === 'asset' && typeof chunk.source === 'string') {
              delete bundle[cssFile]
              return chunk.source
            }
            return ''
          })
          .join('\n')
        for (const jsFile of jsFiles) {
          const chunk = bundle[jsFile]
          if (chunk.type === 'chunk') {
            chunk.code = chunk.code.replace(
              'console.warn("__TEMPLATE_INJECT_CSS_PLACEHOLDER_NOT_WORK__")',
              `GM_addStyle(${JSON.stringify(cssContent)})`,
            )
          }
        }
      },
    },
  ],
})
