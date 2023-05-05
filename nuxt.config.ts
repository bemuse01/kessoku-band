// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
    app: {
        head: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          title: 'kessoku band',
          meta: [
            { name: 'description', content: 'kessoku band player' }
          ],
        }
    },
    modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt'
    ],
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
      config: {},
      injectPosition: 0,
      // viewer: true,
    },
    vite: {
      assetsInclude: [
        '**/*.WAV', 
        '**/*.wav',
        '**/*.webp'
      ]
    }
}
