<!-- pages/dash.vue -->
<script setup lang="ts">
import { usePlatformStore } from "~/stores/platform";
import { useI18n } from "vue-i18n";
definePageMeta({
  layout: "dashboard",
  requiresAuth: true,
  middleware: "auth",
});

// Load user profile

//import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const page = computed(() => parseInt((route.query.page as string) ?? "1"));
// Assuming usePlatformStore is a custom store that needs to be imported
const platform = usePlatformStore();
const currentWave = computed(() => platform?.currentWave);
const currentMission = computed(() => platform?.currentMission);
console.log("currentWave:", currentWave.value);
console.log("currentMission:", currentMission.value);
const filter = ref("");
const perPage = ref(4);
const config = useRuntimeConfig();
const { locale } = useI18n();
const flagIcon = computed(() => {
  switch (locale.value) {
    case "en":
      return "emojione-v1:flag-for-united-states";
    case "fr":
      return "twemoji:flag-france";
    case "ru":
      return "twemoji:flag-russia";
    default:
      return "emojione-v1:flag-for-united-states";
  }
});

// User connection status
const connectionStatus = computed(() => ({
  online: navigator?.onLine ?? 1,
  schemaNetwork: auth.user !== null,
  pulseBalance: auth.user?.pulses ?? 0,
}));
//  pulseBalance: auth.user?.pulses ?? 0
onMounted(() => {
  if (import.meta.client) {
    auth.sync();
  }
  platform.fetchPlatformData();
});

// Status indicators
const statusClasses = (condition: boolean) =>
  condition
    ? "bg-emerald-500/80 text-emerald-400"
    : "bg-rose-500/80 text-rose-400";

function useWelcomeMessage() {
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;
  const welcomeTitle = ref(isDaytime ? "Good day" : "Good evening");
  const welcomeMessage = computed(() => `${welcomeTitle.value}, node.`);
  return { welcomeMessage };
}
function useInspirationalText(userMood) {
  const texts = [
    {
      mood: "cyberpunk",
      messages: [
        "Greetings, console cowboy.",
        "Jack into the matrix and ride the information superhighway.",
        "Reality is just a shared hallucination.",
      ],
    },
    {
      mood: "gritty",
      messages: [
        "Welcome to the underbelly of the digital age.",
        "Social brain is the new order.",
        "Embrace the void and find your meaning.",
      ],
    },
    {
      mood: "edgy",
      messages: [
        "In the end, everything is a copy of a copy of a copy.",
        "You're not your code; you're the ones and zeros flowing through it.",
        "The first step toward schema is a curiosity.",
      ],
    },
  ];
  const moodMessages = texts.find((t) => t.mood === userMood)?.messages || [
    "In code we trust.",
  ];
  const randomMessage =
    moodMessages[Math.floor(Math.random() * moodMessages.length)];
  const inspirationalText = computed(() => randomMessage);
  return { inspirationalText };
}

const { welcomeMessage } = useWelcomeMessage();
const possibleMoods = [
  "cyberpunk",
  "gritty",
  "edgy",
  "neutral",
  "happy",
  "sad",
];
const userMood =
  possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
const { inspirationalText } = useInspirationalText(userMood);
</script>

<template>
  <div class="min-h-screen text-gray-200">
    <!-- Dashboard Header -->
    <header class="mb-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">
          Schema Network
          <span class="text-sm font-normal text-emerald-400"> v0.6 </span>
        </h1>
        <button
          @click="auth.logout"
          class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Icon name="heroicons:arrow-left-on-rectangle" class="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </header>

    <!-- User Status Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <UCard rounded="lg">
        <template #header>
        
            <BaseHeading
              as="h2"
              size="md"
              weight="bold"
              lead="tight"
              class="text-gray-800 dark:text-white"
            >
              <span>{{ welcomeMessage }}</span>
            </BaseHeading>
            <BaseParagraph  lead="none" size="sm">
              <span class="text-gray-400 dark:text-gray-400">
                {{ inspirationalText }}
              </span>
            </BaseParagraph>
      
        
        </template>

        <BaseHeading
              as="h3"
              size="sm"
              weight="normal"
              lead="tight"
              class="text-gray-800 mb-2 dark:text-white"
            >
              <span>Profile</span>
            </BaseHeading>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-3">
                <div
                  class="ml-0.5 flex-none w-3 h-3 rounded-full"
                  :class="statusClasses(connectionStatus?.online === true)"
                />
                {{ connectionStatus?.online ? "Connected" : "Offline Mode" }}
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:command-line"
                  class="w-5 h-5 text-emerald-400"
                />
                <span>{{ auth.user?.ulid || "xxxxxxxx" }}</span>
              </div>

              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:user-circle"
                  class="w-5 h-5 text-sky-400"
                />
                <span>{{ auth.user?.username || "Guest" }}</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:envelope"
                  class="w-5 h-5 text-purple-400"
                />
                <span>{{ auth.user?.email || "No email" }}</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:currency-dollar"
                  class="w-5 h-5 text-amber-400"
                />
                {{ connectionStatus.pulseBalance }} Pulses
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="heroicons:user-group"
                  class="w-5 h-5 text-rose-400"
                />
                {{ auth.user?.role?.toUpperCase() || "NODE" }} Role
              </div>
            </div>

            <template #footer>

        <div
          class="mb-0 mt-auto flex items-center gap-3 text-gray-400 dark:text-white"
        >
          <div class="text-4xl">
            <Icon
              :name="currentMission?.icon || 'solar:earth-bold-duotone'"
              class="size-14 mb-2"
            />
          </div>
          <div>
            <BaseParagraph size="xs" lead="none">
              <span class="text-gray-400 dark:text-gray-400 mb-1"
                >The current community mission</span
              >
            </BaseParagraph>
            <BaseHeading
              tag="h4"
              size="sm"
              weight="light"
              class="mt-1 text-gray-800 dark:text-white"
            >
              <span>{{ currentMission?.title }}</span>
            </BaseHeading>
          </div>
        </div>
        <div>
          <BaseButton
            v-if="currentMission?.id"
            rounded="md"
            size="sm"
            color="primary"
            class="!font-semibold !text-xs w-full"
            @click="router.push(`/mission/${currentMission?.slug}`)"
          >
            <span>Review the Mission</span>
            <Icon
              name="heroicons:arrow-right-circle-solid"
              class="w-5 h-5 !ml-auto"
            />
          </BaseButton>
        </div>
      </template>
      </UCard>

      <!-- User Profile Card -->
     
        <WaveCard v-if="currentWave" :currentWave="currentWave" />
        <BaseCard v-else>
          <p class="text-gray-500">No current wave data available.</p>
        </BaseCard>

      
        <NewsCard />
     
    </div>
  </div>
</template>
