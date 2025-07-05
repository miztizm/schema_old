<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import type { Link } from '#ui-pro/types'

const { isAuthenticated, user } = useAuthStore();

const logo = ref(null)
const navigation = inject<Ref<NavItem[]>>('navigation')

const stats = useStats()
const { metaSymbol } = useShortcuts()
const { copy } = useCopyToClipboard()

const version = computed(() => '0.6')
const isHovered = ref(false)
const versionCode = ref('07EE')
const open = ref(false)

const route = useRoute()
const { mobileNav } = useNavigation()
/* const mobileNav = computed(() => {
  const links = mapContentNavigation(navigation.value)

  // Find docs link and create a copy to avoid mutation
  const originalDocsLink = links.find(link => link.to === '/docs')
  let docsLink = originalDocsLink ? { ...originalDocsLink } : undefined

  if (docsLink) {
    // Filter children only if not viewing bridge/migration
    if (!route.path.startsWith('/docs/bridge') && !route.path.startsWith('/docs/migration')) {
      docsLink.children = (docsLink.children || []).filter(link => 
        !['/docs/bridge', '/docs/migration'].includes(link.to as string)
      )
    }
  }

  return [
    // Only include docsLink if it exists
    ...(docsLink ? [docsLink] : []),
    ...headerLinks.value.slice(1),
    {
      label: 'About',
      icon: 'ph:codesandbox-logo-duotone',
      to: '/about'
    }
  ]
})
 */
const dropdownItems = [
  [{
    label: 'Extract Core Sigil',
    icon: 'i-ph-lock-key-open-fill',
    click: () => {
      // Generate random ID
      const generateRandomId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      };

      const randomId = generateRandomId();
      
      // SVG template with random ID
      const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6260 7070">
  <g id="${randomId}" fill="rgb(226,31,38)" style="transform: none;">
    <g>
      <path d="M3455 6234 c-115 -19 -285 -58 -342 -80 -38 -14 -143 -45 -235 -69 -200 -53 -304 -91 -553 -203 -104 -46 -259 -116 -344 -154 -156 -70 -284 -146 -377 -224 -61 -52 -91 -64 -121 -53 -53 20 -13 102 126 259 60 68 62 72 25 45 -23 -17 -107 -91 -188 -165 -80 -74 -169 -147 -197 -161 -56 -28 -81 -60 -105 -134 -21 -65 -38 -83 -63 -68 -17 10 -19 8 -24 -30 -9 -65 9 -215 32 -281 12 -33 21 -69 21 -80 0 -12 7 -30 15 -40 19 -26 19 -60 -1 -102 -21 -43 -47 -44 -132 -4 -34 16 -62 27 -62 25 0 -3 43 -51 95 -107 52 -57 95 -106 95 -110 0 -5 -9 -8 -20 -8 -27 0 -231 44 -349 75 -52 14 -95 24 -97 22 -2 -2 74 -47 169 -100 94 -53 186 -106 202 -118 l30 -21 -75 6 -75 6 61 -39 c34 -22 71 -44 83 -50 31 -17 26 -27 -24 -46 -34 -13 -64 -16 -122 -13 l-78 5 64 -29 c36 -17 117 -43 180 -60 120 -31 179 -56 292 -126 208 -127 384 -200 453 -187 36 7 179 -36 269 -82 55 -28 127 -89 127 -109 0 -7 -15 -21 -32 -30 -18 -9 -73 -56 -123 -103 -111 -107 -147 -132 -302 -210 -89 -44 -126 -68 -137 -88 -23 -44 -99 -113 -266 -238 -85 -65 -146 -115 -135 -111 37 11 127 26 156 26 22 0 29 -5 29 -20 0 -22 -21 -36 -90 -56 -68 -20 -272 -126 -329 -171 -27 -21 -53 -50 -60 -64 -13 -30 -56 -56 -166 -98 -44 -17 -89 -38 -100 -47 -19 -14 -17 -14 23 -8 69 11 53 -15 -80 -130 -108 -92 -248 -234 -248 -250 0 -11 103 45 179 96 141 96 264 137 441 148 88 5 142 14 183 29 32 12 94 24 138 28 87 7 92 2 67 -52 -6 -14 -9 -27 -6 -30 3 -3 99 33 214 81 115 47 272 108 349 136 77 28 187 72 244 99 88 41 113 49 163 49 39 0 90 10 146 29 48 16 112 37 142 46 30 9 93 39 139 67 47 28 119 66 160 85 42 18 142 67 223 108 80 41 155 75 167 75 32 0 266 -147 377 -237 95 -77 184 -138 266 -183 21 -11 42 -29 48 -39 15 -29 12 -83 -5 -108 -14 -20 -13 -23 15 -40 16 -9 30 -25 30 -34 0 -29 -52 -81 -105 -105 l-50 -23 130 -1 c273 -3 272 -44 -8 -258 -78 -59 -164 -125 -191 -146 -69 -53 -126 -77 -208 -87 -38 -5 -88 -18 -111 -29 -72 -36 -190 -107 -242 -146 -58 -44 -107 -59 -248 -74 -56 -6 -172 -27 -257 -46 -176 -39 -336 -63 -629 -95 -219 -24 -239 -23 -338 21 -30 13 -43 25 -43 38 0 22 125 149 168 171 15 7 54 37 87 66 33 28 87 70 120 92 75 51 190 143 179 143 -5 0 -25 -4 -44 -9 -111 -28 -117 -21 -32 41 119 87 260 215 285 257 l18 31 -34 -16 c-73 -35 -92 18 -29 77 69 65 176 145 352 263 96 65 182 125 190 133 32 33 -513 -253 -559 -293 -50 -43 -134 -94 -158 -94 -8 0 -45 -14 -83 -30 -38 -17 -81 -31 -97 -31 -21 -1 -23 -3 -8 -6 45 -11 33 -22 -47 -47 -91 -28 -177 -78 -380 -221 -110 -78 -123 -85 -126 -65 -2 12 -9 19 -15 17 -20 -6 -85 -98 -127 -180 -37 -73 -40 -84 -40 -161 0 -165 36 -270 134 -387 133 -159 244 -220 551 -302 112 -29 131 -31 280 -31 202 1 541 34 808 80 248 42 662 192 1050 380 163 79 302 144 307 144 6 0 15 -11 21 -24 16 -34 -23 -102 -119 -206 l-77 -84 86 64 c48 36 115 89 150 119 l64 54 3 -29 c6 -58 13 -57 41 2 31 66 53 88 93 98 37 8 73 56 114 150 19 44 36 82 40 85 8 9 24 -21 24 -49 l1 -25 11 25 c6 14 10 86 10 160 0 93 6 166 19 235 10 55 19 110 19 122 0 22 9 27 73 39 l37 6 -45 47 c-61 62 -115 144 -122 185 l-5 33 103 8 104 7 -94 44 -93 44 3 87 4 88 -21 -24 c-12 -14 -26 -21 -33 -17 -16 10 -59 97 -91 186 l-28 74 -113 38 c-148 49 -366 157 -418 206 -45 43 -60 84 -40 109 8 9 32 30 54 46 32 24 35 28 15 23 -14 -3 -74 -9 -135 -12 -127 -7 -168 3 -163 38 4 27 94 102 207 171 69 43 95 67 149 137 37 47 85 108 108 135 23 28 56 73 73 100 37 59 120 146 176 185 56 39 407 400 423 435 8 17 19 41 26 55 7 15 42 42 86 67 155 86 179 113 99 113 -50 0 -51 19 -1 48 40 22 165 147 278 276 81 93 64 87 -94 -32 -53 -40 -119 -86 -147 -102 -76 -43 -189 -77 -300 -90 -75 -8 -114 -18 -156 -40 -56 -28 -246 -76 -258 -65 -3 4 4 25 17 47 12 23 21 42 20 43 -4 4 -327 -149 -621 -294 -257 -126 -271 -131 -315 -125 -43 5 -58 0 -187 -62 -77 -37 -194 -104 -260 -148 -66 -44 -148 -90 -185 -103 -36 -13 -86 -33 -113 -45 l-47 -21 -25 23 c-13 13 -29 38 -35 56 l-11 34 -31 -16 c-52 -27 -104 -12 -215 63 -54 37 -192 118 -308 181 -115 63 -248 138 -295 166 -83 50 -84 52 -103 112 -32 99 -25 114 106 236 61 58 130 116 153 130 66 42 244 116 504 209 l245 88 -105 1 c-146 2 -212 27 -149 57 84 40 444 205 546 249 204 89 273 102 543 105 l175 1 90 -43 c50 -24 93 -45 96 -46 4 -2 4 8 2 22 -4 17 -1 25 8 25 24 -1 93 -36 114 -59 19 -22 19 -23 0 -57 -22 -41 -70 -81 -135 -114 -46 -23 -482 -331 -477 -336 2 -2 52 15 111 37 59 23 110 39 113 35 22 -22 -67 -117 -289 -309 -36 -32 -73 -69 -82 -82 l-16 -24 35 15 c46 19 91 18 99 -2 11 -28 -25 -76 -143 -197 l-115 -118 74 27 c52 18 127 61 240 138 125 85 183 117 244 138 55 18 75 29 63 34 -32 12 -16 29 61 66 72 34 253 169 347 258 22 21 51 43 64 50 24 12 24 12 18 -24 -3 -20 -4 -36 -2 -36 10 0 102 151 126 208 53 128 46 260 -24 407 -78 164 -281 318 -488 369 -180 44 -534 84 -624 70z" style="fill:#d03737;"></path>
      <path d="M3592 2548 c-29 -29 3 -88 48 -88 59 0 56 69 -3 90 -36 12 -31 12 -45 -2z"></path>
    </g>
  </g>
</svg>
      `.trim();

      copy(svgContent, {
        title: 'Sigil Fractal Copied',
        description: 'Embedding in network cache...'
      });
    }
  }],
  [{
    label: 'Konami Code',
    icon: 'i-ph-skull-fill',
    click: () => unlockEasterEgg('konami'),
    class: 'dark:bg-primary-500/20 !text-red-400 animate-pulse opacity-50 hover:opacity-100 transition-opacity'
  }] 
]
const isMobile = ref(false)
function openLogoContext() {
  if (isMobile.value) return navigateTo('/')
  open.value = true
}

onMounted(() => {
  isMobile.value = ('ontouchstart' in document.documentElement)
})

defineProps<{
  links?: Link[]
}>()
const { t, setLocale, locale } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
const toast = useToast()

const initializeLanguage = () => {
  // Check the URL first
  const urlLocale = route.params.locale;
  if (urlLocale) {
    setLocale(urlLocale);
    return;
  }

  // Check the cookie next
  const cookieLanguage = getCookie('node-language');
  if (cookieLanguage) {
    setLocale(cookieLanguage);
    return;
  }

  // If not in cookie, use the default locale
  setLocale('en');
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

onMounted(() => {
  initializeLanguage();
});

const languages = [
  { code: 'en', name: 'English', flag: 'twemoji:flag-united-kingdom', rtl: false },
  { code: 'fr', name: 'Français', flag: 'twemoji:flag-france', rtl: false },
  { code: 'ru', name: 'Русский', flag: 'twemoji:flag-russia', rtl: false }
];

const items = computed(() => [
  [{ label: t('current_language'), slot: 'current', disabled: true }],
  languages.map(lang => ({
    label: lang.name,
    icon: lang.flag,
    click: () => changeLanguage(lang.code),
    trailingIcon: locale.value === lang.code ? 'i-heroicons-check-20-solid' : undefined
  }))
]);

const changeLanguage = (newLocale: string) => {
  try {
    setLocale(newLocale)
    router.push(switchLocalePath(newLocale))

    // Update the cookie
    document.cookie = `node-language=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year

    // Show a success toast notification
    toast.add({
      title: t('language_changed'),
      icon: 'i-ph-globe-stand-duotone',
      color: 'primary'
    })
  } catch (error) {
    // Show an error toast notification if something goes wrong
    toast.add({
      title: t('language_change_error'),
      icon: 'i-ph-warning-duotone',
      color: 'red'
    })
  }
}

interface Language {
  code: string
  name: string 
  flag: string
  rtl: boolean
}
const { unlockEasterEgg, terminalVisible, terminalCommands  } = useCyberEggs()


</script>

<template>
  <UHeader :links="links">
    <template #left>
      <UDropdown
        v-model:open="open"
        :items="dropdownItems"
        :popper="{ strategy: 'absolute', placement: 'bottom-start' }"
        :ui="{ 
          container: '!mt-0.5',
          rounded: 'rounded-md',
          item: { 
            disabled: 'cursor-text select-text',
            active: 'dark:bg-primary-500/20',
            padding: 'px-3 py-2',
          },
          width: 'w-48',
          ring: 'ring-1 ring-gray-200 dark:ring-slate-800/45',
          background: 'bg-white dark:bg-gray-950/95 bg-clip-padding backdrop-filter backdrop-blur-lg'
        }"
      >
        <NuxtLink to="/" class="flex gap-2 items-end">

          <Logo ref="logo" class="block w-auto h-5" @click.right.prevent="openLogoContext" @click.left.prevent="navigateTo('/')" />
       
          <LogoText class="text-xl opacity-90 group-hover:opacity-100 transition-opacity leading-none " />
   
          <UTooltip v-if="version" :text="`Release: v${version}`">
            <UBadge 
    color="cyan" 
    variant="subtle" 
    size="xs" 
    class="rounded transition-all duration-300"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span class="relative inline-block text-right">
      <span class="absolute inset-0" :class="{'opacity-0': isHovered}">
         BETA
      </span>
      <span class="text-cyan-400" :class="{'opacity-0': !isHovered}">
        {{ versionCode }}
      </span>
    </span>
  </UBadge>
          </UTooltip>
        </NuxtLink>
      </UDropdown>
    </template>

    <template #center>
      <UHeaderLinks
        :links="links"
        :ui="{
          default: {
            popover: {
              popper: { strategy: 'absolute' },
              ui: { width: 'w-[256px]' }
            }
          }
        }"
        class="hidden lg:flex"
      />
    </template>

    <template #right>
      <UTooltip v-if="false" text="Search" :shortcuts="[metaSymbol, 'K']">
        <UContentSearchButton :label="null" />
      </UTooltip>

    
        <UDropdown 
    :items="items"
    :ui="{ 
    container: '!mt-0.5',
    rounded: 'rounded-md',
      item: { 
        disabled: 'cursor-text select-text',
        active: 'dark:bg-primary-500/20',
        padding: 'px-3 py-2',
      },
      width: 'w-48',
      ring: 'ring-1 ring-gray-200 dark:ring-slate-800/45',
      background: 'bg-white dark:bg-gray-950/95 bg-clip-padding backdrop-filter backdrop-blur-lg'
    }"
    :popper="{ strategy: 'absolute', placement: 'bottom-start' }"
  > 
  <UTooltip text="Select Language">
     <UButton
      variant="ghost"
      color="black"
      icon="i-ph-translate-duotone"
      v-bind="($ui.button.secondary as any)"
    >
      <span class="sr-only">{{ t('language_switcher') }}</span>
    </UButton>     
   </UTooltip>

    <template #current="{ item }">
      <div class="flex items-center gap-2 px-1 py-2">
        <UIcon name="i-ph-translate-duotone" class="w-5 h-5 text-primary-300" />
        <div class="text-left">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ item.label }}
          </p>
          <p class="font-medium text-xs text-gray-900 dark:text-white">
            {{ languages.find(l => l.code === locale)?.name }}
          </p>
        </div>
      </div>
    </template>

    <template #item="{ item }">
      <div class="flex items-center gap-2">
        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
        <span class="truncate text-xs">{{ item.label }}</span>
        <UIcon 
          v-if="item.trailingIcon" 
          :name="item.trailingIcon" 
          class="ms-auto text-primary-500 w-4 h-4" 
        />
      </div>
    </template>
  </UDropdown>


      <UTooltip :text="$colorMode.preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
        <UColorModeButton />
      </UTooltip>

      <UTooltip v-if="!isAuthenticated" text="Authentication">
        <UButton
          icon="ph:fingerprint-duotone"
          to="/auth"
          v-bind="($ui.button.secondary as any)"
        />
      </UTooltip>

      <UTooltip v-if="!isAuthenticated || !route.meta?.requiresAuth" text="Telegram Subscribers">
        <UButton
          icon="simple-icons:telegram"
          to="https://t.me/sch8ma"
          target="_blank"
          :label="stats ? formatNumber(stats.stars) : '...'"
           class="telegram-btn"
          v-bind="($ui.button.secondary as any)"
        />
      </UTooltip>

      <DemoAccountMenu v-if="isAuthenticated || route.meta?.requiresAuth" />

      <!-- <UTooltip v-if="isAuthenticated || route.meta?.requiresAuth" text="lanbird">
        <UButton
          v-if="isAuthenticated || route.meta?.requiresAuth"
          to="https://t.me/sch8ma"
          v-bind="($ui.button.secondary as any)"
        />
        <BaseUserAvatar class="max-w-full object-cover shadow-sm dark:border-transparent" :size="'xs'" :rounded="'md'" /> 
      </UTooltip> -->
    </template>

    <template #panel>
      <UNavigationTree :links="mobileNav" default-open :multiple="false" />
    </template>
  </UHeader>
<!--     <button @click="  activateShadowProtocol('omega')" class="cyber-button">
  Activate Shadow Protocol
</button> -->
</template>

<style scoped>
/* For the second span that contains the number */
/* Target specifically the Telegram button */
/* OR using data attribute */
:deep(.telegram-btn) span:nth-child(2) {
  display: none !important;
}

@media (min-width: 640px) {
  :deep(.telegram-btn) span:nth-child(2) {
    display: inline !important;
  }
}
/* .cyber-button {
  background: linear-gradient(145deg, #0ff, #00f);
  border: 1px solid #0ff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-button:hover {
  box-shadow: 0 0 10px #0ff, 0 0 20px #0ff;
} */
</style>