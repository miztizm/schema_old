import { ofetch } from 'ofetch'
import { logger } from '@nuxt/kit'
import { isWindows } from 'std-env'

function normalizedDirPath(path?: string) {
  if (!path || !isWindows) {
    return path
  }

  return path.replace(/\\/g, '/')
}

const docsSourceBase = normalizedDirPath(process.env.NUXT_DOCS_PATH)
const examplesSourceBase = normalizedDirPath(process.env.NUXT_EXAMPLES_PATH)

const docsSource: any = {
  name: 'nuxt-docs',
  driver: 'github',
  repo: 'nuxt/nuxt',
  branch: '3.x',
  dir: 'docs',
  prefix: '/1.docs',
  token: process.env.NUXT_GITHUB_TOKEN || ''
}
if (docsSourceBase) {
  docsSource.driver = 'fs'
  docsSource.base = docsSourceBase
}

const examplesSource: any = {
  name: 'nuxt-examples',
  driver: 'github',
  repo: 'nuxt/examples',
  branch: 'main',
  dir: '.docs',
  prefix: '/docs/4.examples',
  token: process.env.NUXT_GITHUB_TOKEN || ''
}
if (examplesSourceBase) {
  examplesSource.driver = 'fs'
  examplesSource.base = examplesSourceBase
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Type circular reference
  modules: [
    'nuxt-content-twoslash',
    'nuxt-security',
    'nuxt-og-image',
    'nuxt-rebundle',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/robots',     // https://nuxtseo.com/docs/robots/guides/route-rules
    '@nuxtjs/plausible',
    '@nuxtjs/i18n',
    '@nuxtjs/mdc',
    '@nuxtjs/turnstile',
    '@nuxt/content',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
    // 🔄 Compatibility & Build Configuration
    compatibilityDate: '2025-01-28',
    ssr: true,
    colorMode: { preference: 'dark' },
    devServer: {
      host: 'dev.schema.cx',
      port: 3000,
      https: {
        key: './certs/schema.cx-key.pem',
        cert: './certs/schema.cx.pem'
      },
    },
 // 🛠️ Development Configuration
 $development: {
  devtools: { enabled: true },
  debug: true,
  sourcemap: false,
  runtimeConfig: {
    banner: { enabled: true },
    public: {
      apiBaseUrl: process.env.DEV_API_URL,
      websiteUrl: process.env.DEV_BASE_URL,
      storageBase: process.env.DEV_STORAGE_BASE_URL,
      apiPrefix: '/api/',
      blockchainRPC: process.env.DEV_BLOCKCHAIN_RPC,
      website: { url: '' },
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION,
      providers: [
        { name: 'Google', icon: 'i-mdi-google', color: 'red', click: 'google' },
        { name: 'GitHub', icon: 'i-mdi-github', color: 'gray', click: 'github' },
      ],
      turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      },
    },
  },
},
// 🚀 Production Configuration
$production: {
  devtools: { enabled: false },
  debug: false,
  sourcemap: true,
  runtimeConfig: {
    banner: { enabled: false },
    public: {
      apiBaseUrl: process.env.PROD_API_URL,
      websiteUrl: process.env.PROD_BASE_URL,
      storageBase: process.env.PROD_STORAGE_BASE_URL,
      apiPrefix: '/api/',
      blockchainRPC: process.env.PROD_BLOCKCHAIN_RPC,
      website: { url: '' },
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION,
      providers: [
        { name: 'Google', icon: 'i-mdi-google', color: 'red', click: 'google' },
        { name: 'GitHub', icon: 'i-mdi-github', color: 'gray', click: 'github' },
      ],
      turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      },
    },
  },
  image: {
    ipx: {
      baseURL: '',
    },
  },
},

    // 🎨 CSS files to be included globally.
    css: [
      '~/assets/css/ui.css', // Custom color definitions.
      '~/assets/css/colors.css', // Custom color definitions.
      '~/assets/css/global.css', // Global styles.
      '~/assets/css/main.css', // Main styles.
      '~/assets/css/fonts.css', // Font-face definitions.
      // Including fonts from fontsource package.
    //  '@fontsource-variable/fira-code/index.css',
      '@fontsource-variable/inter/index.css',
     // '@fontsource-variable/karla/index.css',
    ],
  // image: {
  //   ipx: {
  //     baseURL: 'https://ipx.nuxt.com'
  //   }
  // },
   // 🌐 Internationalization (i18n) Configuration
   i18n: {
    defaultDirection: 'ltr',
    defaultLocale: 'en',
    langDir: './',
    lazy: true,
    baseUrl: process.env.WEB_URL ?? 'https://schema.cx',
    locales: [
      { code: 'en', name: 'English', file: 'en.js', language: 'en-US', dir: 'ltr' },
      { code: 'fr', name: 'Français', file: 'fr.js', language: 'fr-FR', dir: 'ltr' },
      { code: 'ru', name: 'Русский', file: 'ru.js', language: 'ru-RU', dir: 'ltr' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'node-language',
      fallbackLocale: 'en',
      // Optionally, redirect users on the initial navigation
      // redirectOn: 'always' // Uncomment if you want to always redirect
    },
    strategy: 'no_prefix', // Disables URL prefixes
  },
  content: {
    navigation: {
      fields: ['titleTemplate']
    },
    sources: {
      content: {
        locales: ['en', 'fr', 'ru'],
        defaultLocale: 'en',
        driver: 'fs',
        base: './content',
      },
    },
    highlight: {
      theme: {
        default: 'material-theme-lighter',  //github-light
        dark: 'material-theme-palenight',   //github-dark
      },
      langs: [
        'js',
        'ts',
        'vue',
        'css',
        'scss',
        'sass',
        'html',
        'bash',
        'md',
        'mdc',
        'json',
        'json5',
        'jsonc',
        'tsx'
      ]
    }
  },
  
  routeRules: {
    // Pre-render
    '/api/search.json': { prerender: true },
    '/api/templates.json': { prerender: true },
    '/blog/rss.xml': { prerender: true },
    // '/sitemap.xml': { prerender: true },
    '/newsletter': { prerender: true },
    // Redirects
    '/docs': { redirect: '/docs/getting-started/introduction', prerender: false },
    '/docs/getting-started': { redirect: '/docs/getting-started/introduction', prerender: false },
    '/docs/guide/concepts': { redirect: '/docs/guide/concepts/auto-imports', prerender: false },
    '/docs/guide/directory-structure': { redirect: '/docs/guide/directory-structure/app', prerender: false },
    '/docs/guide/going-further': { redirect: '/docs/guide/going-further/experimental-features', prerender: false },
    '/docs/guide/going-further/edge-release-channel': { redirect: '/docs/guide/going-further/nightly-release-channel', prerender: false },
    '/docs/bridge': { redirect: '/docs/bridge/overview', prerender: false },
    '/docs/migration': { redirect: '/docs/migration/overview', prerender: false },
    '/docs/api/components': { redirect: '/docs/api/components/client-only', prerender: false },
    '/docs/api/composables': { redirect: '/docs/api/composables/use-app-config', prerender: false },
    '/docs/api/utils': { redirect: '/docs/api/utils/dollarfetch', prerender: false },
    '/docs/api/kit': { redirect: '/docs/api/kit/modules', prerender: false },
    '/docs/api/commands': { redirect: '/docs/api/commands/dev', prerender: false },
    '/docs/api/advanced': { redirect: '/docs/api/advanced/hooks', prerender: false },
    '/docs/api/configuration/nuxt-config': { redirect: '/docs/api/nuxt-config', prerender: false },
    '/docs/examples': { redirect: '/docs/examples/hello-world', prerender: false },
    '/docs/examples/features': { redirect: '/docs/examples/features/auto-imports', prerender: false },
    '/docs/examples/routing': { redirect: '/docs/examples/routing/middleware', prerender: false },
    '/docs/examples/advanced': { redirect: '/docs/examples/advanced/config-extends', prerender: false },
    '/docs/examples/experimental': { redirect: '/docs/examples/experimental/wasm', prerender: false },
    '/docs/community': { redirect: '/docs/community/getting-help', prerender: false },
    '/docs/community/nuxt-community': { redirect: '/docs/community/getting-help', prerender: false },
    '/docs/guide/recipes': { redirect: '/docs/guide/recipes/custom-routing', prerender: false },
    '/docs/guide/going-further/custom-routing': { redirect: '/docs/guide/recipes/custom-routing', prerender: false },
    // '/docs/guide/directory-structure/nuxt.config': { redirect: '/docs/guide/directory-structure/nuxt-config', prerender: false },
    '/enterprise': { redirect: '/enterprise/support', prerender: false }
  },
  future: {
    compatibilityVersion: 4
  },
  experimental: {
    buildCache: false
  },
  nitro: {
    prerender: {
      // failOnError: false
      // TODO: investigate
      // Ignore weird url from crawler on some modules readme
      ignore: ['/modules/%3C/span', '/modules/%253C/span', '/docs/getting-started/</span', '/docs/getting-started/%3C/span', '/modules/Mojo CSS', '/modules/Mojo%20CSS', '/enterprise/agencies?service=content-marketing']
    },
    hooks: {
      'prerender:generate'(route) {
        // TODO: fix issue with recursive fetches with query string, e.g.
        // `/enterprise/agencies?region=europe&amp;amp;amp;service=ecommerce&amp;amp;service=ecommerce&amp;service=content-marketing`
        if (route.route?.includes('&amp;')) {
          route.skip = true
        }
      }
    }
  },
  typescript: {
    strict: false
  },
  hooks: {
    async 'prerender:routes'(ctx) {
      // Add Nuxt 2 modules to the prerender list
      const { modules } = await ofetch<{ modules: [] }>('https://api.nuxt.com/modules?version=2').catch(() => ({ modules: [] }))
      for (const module of modules) {
        ctx.routes.add(`/modules/${module.name}`)
      }
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never'
      }
    }
  },
  icon: {
    clientBundle: {
      scan: true
    }
  },
  twoslash: {
    floatingVueOptions: {
      classMarkdown: 'prose prose-primary dark:prose-invert'
    },
    // Skip Twoslash in dev to improve performance. Turn this on when you want to explictly test twoslash in dev.
    enableInDev: false,
    // Do not throw when twoslash fails, the typecheck should be down in github.com/nuxt/nuxt's CI
    throws: false
  }
})
