<script setup>
import { getColorClasses } from '../utils/colorClasses';

definePageMeta({
  title: 'Missions',
  layout: "dashboard",
  requiresAuth: true,
  middleware: "auth",
  preview: {
    title: 'Missions',
    description: 'For item grids and collections',
    categories: ['layouts'],
    src: '/img/screens/layouts-card-grid-2.png',
    srcDark: '/img/screens/layouts-card-grid-2-dark.png',
    order: 58,
  },
})

// Page and filtering settings from the route
const route = useRoute();
const router = useRouter();
const missions = useMissionsStore();
const missionsList = computed(() => missions.missionsData || { data: [], lastPage: 1, total: 0 });
const missionsListData = computed(() => missions.missionsData?.data || []);
// No need to wrap these in refs, you can directly use computed properties
const filter = computed({
  get: () => route.query.filter || '',
  set: (newValue) => {
    router.push({ query: { ...route.query, filter: newValue } });
  }
});
const perPage = computed(() => parseInt(route.query.perPage, 10) || 24);
const page = computed(() => parseInt(route.query.page, 10) || 1);
const lastPage = computed(() => missionsList.value.lastPage);
const total = computed(() => missionsList.value.total);


// ... Other reactive references ...

onMounted(() => {
  watch([filter, perPage, page], () => {
    missions.fetchMissions({ filter: filter.value, perPage: perPage.value, page: page.value });
  }, { immediate: true });
});

/* console.log('missions', missions)
console.log('isLoading', isLoading)
console.log('error', error)
 {{ missions.useMissions.data }}
*/


function getStatusIcon(status) {
  switch (status) {
    case 'not_started':
      return 'ic:baseline-play-circle'; // Icon for not started
    case 'pending':
      return 'ph:hourglass-duotone'; // Icon for pending
    case 'proof':
      return 'ph:document-duotone'; // Icon for proof
    case 'completed':
      return 'ph:check-circle-duotone'; // Icon for completed
    case 'failed':
      return 'ph:x-circle-duotone'; // Icon for failed
    default:
      return 'ph:info-duotone'; // Default icon
  }
}
function getStatusButtonColor(status) {
  switch (status) {
    case 'not_started':
      return 'success';
    case 'pending':
      return 'warning';
    case 'proof':
      return 'info';
    case 'completed':
      return 'success';
    case 'failed':
      return 'danger';
    default:
      return 'primary';
  }
}

const dashMenu = [
  {
    id: 1,
    title: 'Schema',
    link: '/',
    customIcon: '/img/logos/logo-icon.svg',
    color: 'schema',
  },
/*   {
    id: 2,
    title: 'Language',
    customComponent: 'LanguageMenuItem', // Use the name of the registered component
  }, */
/*   {
    id: 2,
    title: 'Subdose',
    link: '#', // We'll handle sub-items toggle
    icon: 'i-ph:user-circle-duotone',
    bgImage: 'https://api.schema.cx/storage/avatars/default.png',
    color: 'white',
    bgOpacity: 0.8,
    toggleMenu: true,
    subItems: [
      {
        id: 3,
        title: 'FR',
        link: '/settings',
        color: 'amber',
        fontSize: '1rem',
        icon: 'i-mingcute:earth-latitude-fill',
      },
      {
        id: 4,
        title: 'MTP',
        link: '/settings',
        color: 'indigo',
        fontSize: '1rem',
        icon: 'i-solar:city-bold-duotone',
      },
    ],
  }, */
  /* {
    id: 6,
    title: 'Framework',
    link: '#',
    icon: 'ph:cube-transparent-fill',
    toggleMenu: true,
    subItems: [
      {
        id: 7,
        title: 'Missions',
        link: '/missions',
        icon: 'icon-park-outline:grid-four',
      },
      {
        id: 8,
        title: 'Blocks',
        link: '/blocks',
        icon: 'icon-park-outline:grid-nine',
      },
      {
        id: 9,
        title: 'Seeds',
        link: '/seeds',
        icon: 'icon-park-outline:grid-sixteen',
      },
    ],
  }, */
  {
        id: 7,
        title: 'Missions',
        link: '/missions',
        icon: 'icon-park-outline:grid-four',
      },
      {
        id: 7,
        title: 'Add mission',
        link: '/add',
        icon: 'material-symbols:add-circle',
      },
      {
        id: 8,
        title: 'Blocks',
        link: '/blocks',
        icon: 'icon-park-outline:grid-nine',
      },
      {
        id: 9,
        title: 'Seeds',
        link: '/seeds',
        icon: 'icon-park-outline:grid-sixteen',
      },
  /* {
    id: 10,
    title: 'Layers',
    link: '#',
    icon: 'icon-park-twotone:layers',
    toggleMenu: true,
    subItems: [
      {
        id: 11,
        title: 'Grids',
        link: '/grids',
        icon: 'material-symbols:grid-4x4',
      },
      {
        id: 12,
        title: 'Clusters',
        link: '/clusters',
        icon: 'f7:grid',
      },
      {
        id: 13,
        title: 'Zones',
        link: '/zones',
        icon: 'material-symbols:grid-goldenratio',
      },
    ],
  }, */
];

</script>

<template>

  <div>
    <!-- Displaying Missions -->
    <TairoContentWrapper>
    <!--   <Nav :menuItems="dashMenu" /> -->
     <template v-if="false" #left>
        <BaseInput v-model="filter" icon="lucide:search" rounded="md" class="!h-8 !mb-1 !text-xs w-full"
          placeholder="Filter missions..." :classes="{
            wrapper: 'w-full sm:w-auto',
          }" />
      </template>
      <template  v-if="false" #right>
        <BaseButton variant="pastel" rounded="md" color="primary" class="!h-8 !font-semibold !text-xs mb-1 w-full">
          Settings
        </BaseButton>
        <BaseButton variant="pastel" rounded="md" color="success" class="!h-8 !font-semibold !text-xs mb-1 w-full">
          <Icon name="lucide:plus" class="size-4" />
          <span>Create</span>
        </BaseButton>
      </template>
      <div>
        <div v-if="missionsListData.length === 0">
          <BasePlaceholderPage title="No Missions Channels Found"
            subtitle="Nothing but echoes and shadows here, the missions you seek do not exist in our archives.">
          </BasePlaceholderPage>
        </div>
        <div v-else>
          <div class="ltablet:grid-cols-3 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <TransitionGroup enter-active-class="transform-gpu" enter-from-class="opacity-0 -translate-x-full"
              enter-to-class="opacity-100 translate-x-0" leave-active-class="absolute transform-gpu"
              leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">
              <NuxtLink v-for="mission in missionsListData" :key="mission.id" class="group block" :to="`/mission/${mission.slug}`">
                 <BaseCard rounded="lg">
                <div class="flex items-center gap-4">
                  <BaseIconBox size="md" rounded="lg" color="none" :class="getColorClasses(mission?.color)">
                    <Icon :name="mission.icon ?? ''" class="size-11" />
                  </BaseIconBox>
                  <div class="leading-none mb-0.5">
                    <h4 class="text-gray-800 dark:text-gray-200 font-sans text-sm font-medium">
                       {{ mission.title }}
                    </h4>
                    <p class="text-muted-400 dark:text-gray-400 font-sans text-xs">
                      {{ mission.subtitle }}
                    </p>
                  </div>
                  <div class="ms-auto flex items-center">
    <BaseButtonIcon
      :color="`${getStatusButtonColor(mission.user_mission_status)}`"
      rounded="lg"
      muted
      class="scale-75"
    >
        <!-- Dynamically set icon -->
        <Icon :name="getStatusIcon(mission.user_mission_status)" class="size-8" />
    </BaseButtonIcon>
  </div>
                </div>

                <!--
                <div class="my-4 flex items-center justify-between">
                  <div>
                    <h4
                      class="text-muted-800 dark:text-muted-100 font-sans text-base font-medium"
                    >
                      {{ item.name }}
                    </h4>
                    <div class="text-muted-400 flex items-center gap-1">
                      <Icon name="ph:calendar-blank-duotone" class="size-4" />
                      <p class="font-sans text-sm">
                        {{ item.category }}
                      </p>
                    </div>
                  </div>
                  <div>
                    <BaseAvatarGroup
                      size="xs"
                      :limit="2"
                      :avatars="item.team"
                    />
                  </div>
                </div> -->
                <div class=" items-center gap-2">
                  <!--  <BaseButton rounded="lg" size="sm" class="w-full">
                    Tasks
                  </BaseButton> -->
                  <!--  activated -->
                  <!--    <BaseButton rounded="lg" size="sm" class="w-full" color="success">
                    Activated
                  </BaseButton> -->

                  <!--     <BaseButton rounded="lg" size="sm" class="w-full" color="success">
                    Activated
                  </BaseButton> -->
                  <!--                   <BaseButtonGroup class="w-full">
    <BaseButtonAction  class="w-2/3 !bg-slate-100" rounded="md">
      55.00φ
    </BaseButtonAction>

    <BaseButtonAction color="success" class="w-1/3" rounded="md">
      <Icon name="ph:basket-duotone" class="size-4" />
    </BaseButtonAction>
  </BaseButtonGroup> -->

                  <!--     <div v-if="item.status === 'activated'" class="relative flex w-full items-center gap-2">

<BaseInput style="cursor:default;" disabled v-model="search" :shape="props.shape" :classes="{
  wrapper: 'w-full',
  input:
    'pe-24 focus:!bg-white dark:focus:!bg-muted-900',
}" />
<button type="button"
  class="w-[97%] !border-inherit bg-success-500 text-white absolute end-1 top-1 inline-flex h-8 items-center justify-center px-4 font-sans text-sm text-white"
  :class="[
    props.shape === 'rounded' ? 'rounded' : '',
    props.shape === 'curved' ? 'rounded-lg' : '',
  ]">
  <span>
   Activated
  </span>
</button>
</div>



  <div v-if="item.status === 'core'" class=" relative flex w-full items-center gap-2">

<BaseInput style="cursor:default;" disabled v-model="search" :shape="props.shape" :classes="{
  wrapper: 'w-full',
  input:
    'pe-24 focus:!bg-white dark:focus:!bg-muted-900',
}" />
<button type="button"
  class="w-[96%] !border-inherit bg-primary-500 text-white absolute end-1 top-1 inline-flex h-8 items-center justify-center px-4 font-sans text-sm text-white"
  :class="[
    props.shape === 'rounded' ? 'rounded' : '',
    props.shape === 'curved' ? 'rounded-lg' : '',
  ]">
  <span>
   Core
  </span>
</button>
</div>



      <div v-if="item.status === 'buy'" class="relative flex w-full items-center gap-2">

<BaseInput style="cursor:default;" disabled v-model="search" icon="ep:price-tag" placeholder="55.00φ" :shape="props.shape" :classes="{
  wrapper: 'w-full',
  input:
    'pe-24 focus:!bg-white dark:focus:!bg-muted-900',
}" />
<button type="button"
  class="!border-inherit bg-success-500 text-white absolute end-1 top-1 inline-flex h-8 items-center justify-center px-4 font-sans text-sm text-white"
  :class="[
    props.shape === 'rounded' ? 'rounded' : '',
    props.shape === 'curved' ? 'rounded-lg' : '',
  ]">
  <span>
    <Icon size="17" name="ph:basket-duotone" class="text-white" />
  </span>
</button>
</div>



    <div v-if="item.status === 'progress'" class="mt-6 w-full">
      <BaseProgress
      title="Activation Progress"
      size="xl"
      :value="78"
      color="info"
    />
    </div> -->

                </div>
              </BaseCard> </NuxtLink>
            </TransitionGroup>
          </div>
          <div v-if="missionsListData.length !== 0 && lastPage > 1" class="mt-6 pt-2">
            <BasePagination :total-items="total ?? 0" :item-per-page="perPage" :current-page="page"
              :router-query-key="'page'" rounded="full" />
          </div>
        </div>
      </div>
    </TairoContentWrapper>
  </div>
</template>
