<script setup>
import { getColorClasses } from '~/utils/colorClasses'
import { marked } from 'marked';
definePageMeta({
  title: 'Mission Details',
  layout: "dashboard",
  requiresAuth: true,
  middleware: "auth",
  preview: [
    {
      title: 'Mission Overview',
      description: 'Displays detailed information about a specific mission',
      categories: ['layouts', 'missions'],
      src: '/assets/screens/layouts-projects-details.png',
      srcDark: '/assets/screens/layouts-projects-details-dark.png',
      order: 72,
      params: {
        slug: 'health-and-fitness-dashboard',
      },
    },
  ],
})
function getStatusButtonColor(status) {
  switch (status) {
    case 'not_started':
      return 'success';
    case 'pending':
      return 'warning';a
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


const auth = useAuthStore();
//const { open } = usePanels()
const mission = useMissionStore();

// Routing
const route = useRoute();
const router = useRouter();

// Notifications
const toast = useToast()

const fetchMissionProfile = mission.fetchMissionProfile;
const fetchMissionRoles = mission.fetchMissionRoles;
const fetchMissionThreads = mission.fetchMissionThreads;
const fetchMissionProofs = mission.fetchMissionProofs;
const fetchMissionMessages = mission.fetchMissionMessages;

const isLoadingMission = computed(() => mission.isLoadingMission);
const isLoadingRoles = computed(() => mission.isLoadingRoles);
const isLoadingThreads = computed(() => mission.isLoadingThreads);
const isLoadingProofs = computed(() => mission.isLoadingProofs);
const isLoadingMessages = computed(() => mission.isLoadingMessages);
const isLoadingAcceptMission = computed(() => mission.isLoadingAcceptMission);
const isLoadingCompleteMission = computed(() => mission.isLoadingCompleteMission);

const isLoadingProofSubmission = ref(false);
const Error = computed(() => mission.error);

async function safeFetch(callFunction, params, onErrorMessage) {
  try {
    await callFunction(params);
  } catch (error) {
    console.error(error);
    toast.add({
      title: "Error",
      message: onErrorMessage || "An error occurred while fetching data.",
      color: "danger",
      icon: "ph:x-circle-duotone",
    });
  }
}

// Fetching mission profile based on the slug from the route parameters
onMounted(async () => {
  const slug = route.params.slug;
  fetchMissionProfile(slug);
  //fetchMissionMissions(slug, { page: missionsPage.value, perPage: missionsPerPage.value });
  fetchMissionRoles(slug, { page: rolesPage.value, perPage: rolesPerPage.value });
  fetchMissionThreads(slug, { page: threadsPage.value, perPage: threadsPerPage.value });
  fetchMissionProofs(slug, { page: threadsPage.value, perPage: threadsPerPage.value });
  //fetchMissionMessages(slug, { page: threadsPage.value, perPage: threadsPerPage.value });

  // Automatically set the first thread as active

});

//const missionList = computed(() => mission.useMission.missions);
//const missionList = computed(() => mission.useMission.missions);


// roles
const rolesList = computed(() => mission.roles || { data: [], lastPage: 1, total: 0 });
const rolesListData = computed(() => mission.roles?.data || []);

const rolesPage = computed(() => parseInt(route.query.rolesPage, 10) || 1);
const rolesPerPage = computed(() => parseInt(route.query.rolesPerPage, 10) || 10);

const rolesLastPage = computed(() => rolesList.value.lastPage);
const rolesTotal = computed(() => rolesList.value.total);

// proofs
const proofsList = computed(() => mission.proofs || { data: [], lastPage: 1, total: 0 });
const proofsListData = computed(() => mission.proofs?.data || []);

const proofsPage = computed(() => parseInt(route.query.proofsPage, 10) || 1);
const proofsPerPage = computed(() => parseInt(route.query.proofsPerPage, 10) || 10);

const proofsLastPage = computed(() => proofsList.value.lastPage);
const proofsTotal = computed(() => proofsList.value.total);


console.log('proofsLastPage:', proofsLastPage.value);
// board threads
const threadsList = computed(() => mission.threads || { data: [], lastPage: 1, total: 0 });
const threadsListData = computed(() => mission.threads?.data || []);

const threadsPage = computed(() => parseInt(route.query.threadsPage, 10) || 1);
const threadsPerPage = computed(() => parseInt(route.query.threadsPerPage, 10) || 10);

const threadsLastPage = computed(() => threadsList.value.lastPage);
const threadsTotal = computed(() => threadsList.value.total);

// board threads messages
const messagesList = computed(() => mission.messages || { data: [], lastPage: 1, total: 0 });
const messagesListData = computed(() => mission.messages?.data || []);

const messagesPage = computed(() => parseInt(route.query.messagesPage, 10) || 1);
const messagesPerPage = computed(() => parseInt(route.query.messagesPerPage, 10) || 10);

const messagesLastPage = computed(() => messagesList.value.lastPage);
const messagesTotal = computed(() => messagesList.value.total);


const activeThread = ref(null);
const activeMessages = ref([]);

// Computed property to check if proof section should be shown
const showProofSection = computed(() => {
  return mission.useMission.user_mission_status === 'pending';
});

// Function to handle proof submission
/* const handleSubmitValidation = () => {
  isLoadingProofSubmission.value = true;
  setTimeout(() => {
    isLoadingProofSubmission.value = false;
    alert('Proof submitted successfully! Our moderators will review it.');
  }, 1500); // Simulate a delay for proof submission
};

 */
// Check if the user has the required roles
const hasRequiredRoles = computed(() => {
  return mission.useMission.user_has_required_roles;
});

// Determine the mission status and update button states accordingly
const canAcceptMission = computed(() => {
  return (
    mission.useMission.user_mission_status === 'not_started' &&
    hasRequiredRoles.value
  );
});

const canCompleteMission = computed(() => {
  return mission.useMission.user_mission_status === 'pending';
});

// Define the action methods
const acceptMission = async (slug) => {
  try {
    await mission.acceptMission(slug);
  } catch (error) {
    console.error('Error accepting mission:', error);
  }
};

const completeMission = async (slug) => {
  try {
    await mission.completeMission(slug);

    toast.add({
      title: 'Mission Completed',
      message: 'You have completed the mission!',
      color: 'success',
      icon: 'ph:check-circle',
    });
    await mission.fetchMissionProfile(slug);
  } catch (error) {
    console.error('Error completing mission:', error);
  }
};

const handleAcceptMission = async () => {
  try {
    const slug = mission.useMission.slug;
    await mission.acceptMission(slug);

    // Re-fetch mission data after accepting
    await fetchMissionProfile(slug);
    await fetchMissionThreads(slug, { page: threadsPage.value, perPage: threadsPerPage.value });

    toast.add({
      title: 'Mission Accepted',
      message: 'You have successfully started the mission!',
      color: 'success',
      icon: 'ph:check-circle',
    });
  } catch (error) {
    console.error('Failed to accept mission:', error);
    toast.add({
      title: 'Mission Acceptance Failed',
      message: 'Unable to start the mission. Please try again.',
      color: 'danger',
      icon: 'ph:x-circle',
    });
  }
};

/* const missionsFilter = computed({
  get: () => route.query.missionsFilter || '',
  set: (newValue) => {
    router.push({ query: { ...route.query, missionsFilter: newValue } });
  }
});
watch([missionsPage, missionsPerPage, missionsFilter], () => {
  fetchMissionMissions(route.params.slug, {
    page: missionsPage.value,
    perPage: missionsPerPage.value,
    filter: missionsFilter.value
  });
}, { immediate: true }); */


// Roles Filter
const rolesFilter = computed({
  get: () => route.query.rolesFilter || '',
  set: (newValue) => {
    router.push({ query: { ...route.query, rolesFilter: newValue } });
  }
});
watch([rolesPage, rolesPerPage, rolesFilter], () => {
  fetchMissionRoles(route.params.slug, {
    page: rolesPage.value,
    perPage: rolesPerPage.value,
    filter: rolesFilter.value
  });
}, { immediate: true });

const proofsFilter = computed({
  get: () => route.query.proofsFilter || '',
  set: (newValue) => {
    router.push({ query: { ...route.query, proofsFilter: newValue } });
  }
});
watch([proofsPage, proofsPerPage, proofsFilter], () => {
  fetchMissionProofs(route.params.slug, {
    page: proofsPage.value,
    perPage: proofsPerPage.value,
    filter: proofsFilter.value
  });
}, { immediate: true });


// Threads Filter
const threadsFilter = computed({
  get: () => route.query.threadsFilter || '',
  set: (newValue) => {
    router.push({ query: { ...route.query, threadsFilter: newValue } });
  }
});
watch([threadsPage, threadsPerPage, threadsFilter], () => {
  fetchMissionThreads(route.params.slug, {
    page: threadsPage.value,
    perPage: threadsPerPage.value,
    filter: threadsFilter.value
  });
}, { immediate: true });

// Messages Filter
const messagesFilter = computed({
  get: () => route.query.messagesFilter || '',
  set: (newValue) => {
    router.push({ query: { ...route.query, messagesFilter: newValue } });
  }
});
watch([messagesPage, messagesPerPage, messagesFilter], () => {
  if (activeThread.value) {
    fetchMissionMessages(route.params.slug, activeThread.value.slug, {
      page: messagesPage.value,
      perPage: messagesPerPage.value,
      filter: messagesFilter.value,
    });
  } else {
    console.warn("activeThread is not initialized");
  }
}, { immediate: true });




/*     onMounted(() => {

      console.log('Last Page:', lastPage.value);
      console.log('Total Missions:', missionsTotal.value);
    }); */
// ... Other reactive references ...

/* onMounted(() => {
  const route = useRoute(); // Make sure this is inside onMounted or setup()
  const missionId = computed(() => route.params.id);
  const missionSlug = computed(() => route.params.slug);

  console.log('slug', missionSlug.value); // Ensure this logs correctly

  watch([missionId, filter, perPage, page], () => {
    if (missionId.value) { // Ensure slug exists before fetching
      missions.fetchMissionMissions(missionId.value, {
        filter: filter.value,
        perPage: perPage.value,
        page: page.value
      });
    }
  }, { immediate: true });
}); */

/* console.log('missions isLoadingMission', mission.useMission.missions.isLoadingMission)
console.log('missions2 isLoadingMission', mission.useMission.missions.isLoadingMission)
console.log('missions3', missions.missionsData) */
/* console.log('missions', missions)
console.log('isLoadingMission', isLoadingMission)
console.log('error', error)
 {{ missions.useMissions.data }}
*/

/* const allComponents = computed(() => {
  // Merge entities, zones, and items into one array
  return [
    ...mission.useMission.components.entities.map((e: any) => ({ ...e, type: 'entity' })),
    ...mission.useMission.components.zones.map((z: any) => ({ ...z, type: 'zone' })),
    ...mission.useMission.components.items.map((i: any) => ({ ...i, type: 'item' })),
  ]; // Return the merged array
}); */


function difficultyLabel(itemDifficulty) {
  switch (itemDifficulty) {
    case 1:
      return {
        label: 'Very Easy',
        description: 'Quick and effortless tasks for onboarding or first-timers.',
      };
    case 2:
      return {
        label: 'Easy',
        description: 'Simple objectives designed for steady participation.',
      };
    case 3:
      return {
        label: 'Normal',
        description: 'Balanced missions requiring creativity and focus.',
      };
    case 4:
      return {
        label: 'Hard',
        description: 'Challenging endeavors for dedicated contributors.',
      };
    case 5:
      return {
        label: 'Expert',
        description: 'Complex missions demanding exceptional skill and commitment.',
      };
    default:
      return {
        label: 'Unknown',
        description: 'This mission’s difficulty is currently undefined.',
      };
  }
}


const isDataLoaded = computed(() => !isLoadingMission.value);

const missionsTabLabel = computed(() => {
  return isDataLoaded.value ? `[ ${missionsTotal.value} ] Missions` : "Missions [Loading...]";
});

const rolesTabLabel = computed(() => {
  return isDataLoaded.value ? `[ ${rolesTotal.value} ] Roles` : "Roles [Loading...]";
});


const proof = ref('');

// Functions

function getBoardMessagesColor(messages) {
  if (messages > 6) {
    return 'success'; // Green for a high number of slots
  } else if (messages > 3) {
    return 'info'; // Blue for a medium number of slots
  } else if (messages > 0) {
    return 'warning'; // Yellow for a low number of slots
  } else {
    return 'danger'; // Red for no slots
  }
}

const goBack = () => {
  window.history.back();
};

const handleThreadClick = async (thread) => {
  activeThread.value = thread; // Set the clicked thread as active
  selectedThreadId.value = thread.id; // Store the selected thread ID

  try {
    const response = await fetchMissionMessages(
      mission.useMission?.slug,
      thread.slug,
      { page: 1, perPage: 10 }
    );

    // Load messages for the selected thread
    if (response?.data) {
      activeMessages.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch messages:', error.message || error);
  }
};
const showForm = ref(false); // Toggle for the form
const newThreadTitle = ref('');
const newThreadSubtitle = ref('');
const newThreadDescription = ref('');
const selectedThreadId = ref(null); // Store the selected thread ID

const toggleForm = () => {
  showForm.value = !showForm.value; // Toggle the form visibility
};

const submitNewThread = async () => {
  if (newThreadTitle.value && newThreadSubtitle.value && newThreadDescription.value) {
    try {
      await mission.submitNewThread(route.params.slug, {
        title: newThreadTitle.value,
        subtitle: newThreadSubtitle.value,
        description: newThreadDescription.value,
      });

      // Handle success
      console.log('Thread created successfully!');

      // Reset the form
      newThreadTitle.value = '';
      newThreadSubtitle.value = '';
      newThreadDescription.value = '';

      // Reload threads
      await mission.fetchMissionThreads(route.params.slug, {
        page: mission.threads.currentPage,
        perPage: 10,
      });

      // Hide the form
      showForm.value = false;
    } catch (err) {
      console.error('Failed to create thread:', mission.error || err.message);
      // alert('Failed to create thread. Please try again.');
    }
  }
};
const newReplyContent = ref(''); // Store the content of the new reply


// Function to submit a reply
const submitThreadReply = async () => {
  if (!newReplyContent.value.trim()) return;

  try {
    const response = await mission.submitThreadReply(route.params.slug, activeThread.value.slug, {
      content: newReplyContent.value,
    });

    newReplyContent.value = '';

    if (response?.data) {
      const newReply = {
        ...response.data,
        user: response.data.user || { ulid: auth.user.ulid, ...auth.user }, // Add user info if missing
      };

      // Add the new reply to the messages list
      messages.value.data.push(newReply);

      // Scroll to the bottom of the messages container
      nextTick(() => {
        const messagesContainer = document.querySelector('[ref="messagesContainer"]');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      });

      console.log('Reply posted and added successfully!');
    }
  } catch (error) {
    console.error('Failed to post reply:', error);
  }
};

//import { Field } from 'vee-validate';
const uploadedFiles = ref([]);
const proofText = ref(''); // For storing text input
const isLoadingProof = ref(false);

// Handle form submission
async function submitProof() {
  const filesArray = Array.from(uploadedFiles.value || []);

  if (!filesArray.length && !proofText.value.trim()) {
    toast.add({
      title: 'Error',
      message: 'Please provide a file or text for the proof.',
      color: 'danger',
      icon: 'ph:x-circle-duotone',
    });
    return;
  }

  const formData = new FormData();
  filesArray.forEach((file) => formData.append('file[]', file));
  if (proofText.value.trim()) {
    formData.append('text', proofText.value.trim());
  }
  formData.append('type', filesArray.length ? 'image' : 'text');

  isLoadingProof.value = true;

  // Submit the proof and fetch updated proofs without a catch block
  await mission.submitProof(route.params.slug, formData);

    await mission.fetchMissionProofs(route.params.slug, {
      page: mission.proofs.currentPage,
      perPage: 10,
    });

    uploadedFiles.value = [];
    proofText.value = '';

    isLoadingProof.value = false;
}

function getFileTypeIcon(fileType) {
  switch (fileType) {
    case 'image':
      return 'ph:image-duotone'; // image icon
    case 'video':
      return 'ph:video-camera-duotone'; // video icon
    case 'audio':
      return 'ph:music-note-duotone'; // audio icon
    case 'text':
      return 'ph:file-text-duotone'; // text icon
    default:
      return 'ph:question-duotone'; // Fallback icon
  }
}

// State for modal and selected proof
const isModalOpen = ref(false);
const selectedProof = ref(null);

// Handle row click
// Open modal and set selected proof
function handleRowClick(proof) {
  selectedProof.value = proof;
  isModalOpen.value = true;
  console.log('Selected proof:', proof);
  console.log('Modal open:', isModalOpen.value);
}

// Close modal
function closeModal() {
  isModalOpen.value = false;
}


const activeTab = ref(null);

// Set activeTab once `mission.useMission` is available
watch(
  () => mission.useMission,
  (newMission) => {
    if (newMission) {
      activeTab.value = newMission.user_mission_status === 'pending' ? 'board' : 'missionRoles';
    }
  },
  { immediate: true }
);

// Define tabs conditionally
const tabs = computed(() => {
  if (!mission.useMission) {
    return [];
  }

  const baseTabs = [
    {
      label: rolesTabLabel.value,
      value: 'missionRoles',
    },
  ];

  if (mission.useMission.user_mission_status === 'pending') {
    baseTabs.unshift({
      label: '[ 12 ] Threads',
      value: 'board',
    });
  }

  return baseTabs;
});

const mainTabsActiveTab = ref(null);

// Watch mission.useMission and set the default active tab
watch(
  () => mission.useMission,
  (newMission) => {
    if (newMission) {
      mainTabsActiveTab.value = newMission.user_mission_status === 'pending' ? 'proof' : 'overview';
    }
  },
  { immediate: true }
);

// Define the main tabs conditionally
const mainTabs = computed(() => {
  if (!mission.useMission) {
    return [];
  }

  const baseTabs = [
    {
      label: mission.useMission.title,
      value: 'overview',
      icon: mission.useMission.icon,
    },
    {
      label: 'Legal Disclaimer',
      value: 'legal',
    },
  ];

  if (mission.useMission.user_mission_status === 'pending') {
    baseTabs.splice(1, 0, {
      label: 'Validation',
      value: 'proof',
      icon: 'i-ph:check-circle-duotone',
    });
  }

  return baseTabs;
});
</script>
<template>
  <div class="relative pb-10">


    <!-- Placeholder when mission is loading -->
    <div v-if="isLoadingMission">
      <BasePlaceholderPage title="Loading mission" subtitle="Please wait while we load the mission data for you.">
        <!-- Placeholder Image (Light and Dark Mode) -->
        <template #image>
          <img class="block dark:hidden" src="/assets/components/loader.svg" alt="Placeholder image">
          <img class="hidden dark:block" src="/assets/components/loader.svg" alt="Placeholder image">
        </template>
      </BasePlaceholderPage>
    </div>

    <!-- Error message when mission loading fails -->
    <div v-else-if="Error">
      <BasePlaceholderPage title="Error loading mission" subtitle="Looks like we couldn't load the mission data: [ {{ error }} ]">
      </BasePlaceholderPage>
    </div>

    <!-- Placeholder when no mission data is found -->
    <div v-else-if="!mission.useMission">
      <BasePlaceholderPage title="Nothing is found" subtitle="We couldn't find anything matching this mission.">
      </BasePlaceholderPage>
    </div>

    <!-- When mission data is not active -->
    <div v-else-if="mission.useMission.active !== true && mission.useMission.active != null && !auth.user.roles.includes('51')">
      <BasePlaceholderPage title="Mission Unavailable" subtitle="This mission is currently inactive. Please check back later or explore other exciting missions.">
        <!-- Placeholder Image (Light and Dark Mode) -->
        <!--    <template #image>
      <img class="block dark:hidden" src="/assets/illustrations/components/mission-not-active-light.svg" alt="Mission Inactive">
      <img class="hidden dark:block" src="/assets/illustrations/components/mission-not-active-dark.svg" alt="Mission Inactive">
    </template>
 -->
        <!-- Suggestion Button -->

        <div class="mt-5 flex justify-center gap-2">
          <!-- Explore Other Missions Button -->
          <BaseButton color="primary" size="md" rounded="lg" @click="router.push('/missions')">
            <span>Explore Other Missions</span>
          </BaseButton>

          <!-- Contact Support Button -->
          <!--   <BaseButton color="secondary" size="md" rounded="lg" outline @click="router.push('/support')">
          <span>Contact Support</span>
        </BaseButton> -->
        </div>
      </BasePlaceholderPage>
    </div>



    <div v-else class="h-full">
      <BaseTabs class="!text-sm" :class="mission.useMission.user_mission_status === 'completed' ? 'completed' : ''"   v-model="mainTabsActiveTab"
      :tabs="mainTabs">
        <template #tab="{ activeValue }">
          <div class="grid grid-cols-12 gap-3">
            <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
              <!-- Overview -->
              <div v-if="activeValue === 'overview'">

                <UCard class="space-y-6 p-10 bg-gray-800 text-white relative">
                  <!-- Dropdown for mission actions such as board view, edit, permissions, files, and delete -->
                  <div v-if="auth.user?.roles?.includes('master')" class="absolute end-4 top-4 z-20">
                    <BaseDropdown variant="context" label="Dropdown" orientation="end" r size="md" class="z-20" rounded="lg">
                      <!-- Board View Option -->
                      <BaseDropdownItem :to="`/mission/${slug}`" title="Board view" text="Switch to board view" class="sm:hidden">
                        <!-- Icon for Board View -->
                        <template #start>
                          <Icon name="ph:kanban-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <BaseDropdownDivider />

                      <!-- Edit Option -->
                      <BaseDropdownItem to="#" title="Edit" text="Edit this project">
                        <!-- Icon for Edit -->
                        <template #start>
                          <Icon name="ph:pencil-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <BaseDropdownDivider />

                      <!-- Permissions Option -->
                      <BaseDropdownItem to="#" title="Permissions" text="Manage permissions">
                        <!-- Icon for Permissions -->
                        <template #start>
                          <Icon name="ph:lock-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <!-- Files Option -->
                      <BaseDropdownItem to="#" title="Files" text="Manage files">
                        <!-- Icon for Files -->
                        <template #start>
                          <Icon name="ph:file-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <BaseDropdownDivider />

                      <!-- Delete Option -->
                      <BaseDropdownItem to="#" title="Delete" text="Delete this project">
                        <!-- Icon for Delete -->
                        <template #start>
                          <Icon name="ph:trash-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>
                    </BaseDropdown>
                  </div>

                  <!-- Content -->
                  <div class="flex flex-col items-center space-y-6">
                    <BaseIconBox size="2xl" rounded="md" color="none" style="margin-top: -30px;" class="border-solid border-4" :class="getColorClasses(mission?.useMission?.color)">
                      <Icon class="size-14" :name="mission.useMission.icon" />
                    </BaseIconBox>
                    <BaseHeading tag="h1" size="2xl" weight="semibold" class="text-center mt-[30px] text-gray-700 dark:text-white">
                      {{ mission.useMission.title }}
                    </BaseHeading>
                    <BaseParagraph size="md" class="text-center text-gray-400 !mt-0">
                      {{ mission.useMission.subtitle }}
                    </BaseParagraph>
                    <div class="flex items-center space-x-2">

                      <!--
                      <BaseButtonGroup class="hidden">
                        <BaseButton color="default">
                          <Icon name="lucide:edit-3" class="-ms-1 size-3" />

                          <span>Edit</span>
                        </BaseButton>

                        <BaseButton color="default">
                          <Icon name="lucide:eye" class="-ms-1 size-3" />

                          <span>View</span>
                        </BaseButton>

                        <BaseButton color="primary">
                          <Icon name="lucide:box" class="-ms-1 size-3" />

                          <span>Stash</span>
                        </BaseButton>

                        <BaseButton color="default">
                          <Icon name="lucide:share-2" class="-ms-1 size-3" />

                          <span>Share</span>
                        </BaseButton>
                      </BaseButtonGroup> -->

                      <BaseButtonGroup>

                        <BaseButtonIcon size="md" style="width:auto" rounded="lg" class="flex items-center space-x-2 bg-muted-700 rounded-lg p-1">
                          <div class="shrink-0">
                            <Icon name="ph:users" class="size-4 mt-1 mr-1  text-gray-400" />
                          </div>
                          <div class="flex flex-col items-start justify-center text-xs">
                            <span class="font-semibold text-gray-600 dark:text-white">
                              {{ mission.useMission.stats?.participants || 0 }}
                              <span class="hidden sm:inline text-gray-500 dark:text-gray-300">Participants</span>
                            </span>
                          </div>
                        </BaseButtonIcon>

                        <BaseButtonIcon size="md" style="width:auto" rounded="lg" class="flex items-center space-x-2 bg-gray-900 rounded-lg p-1">
                          <div class="shrink-0">
                            <Icon name="ph:check-circle" class="size-4 mt-1  mr-1 text-success-500 " />
                          </div>
                          <div class="flex flex-col items-start justify-center text-xs">
                            <span class="font-semibold text-gray-600 dark:text-white">
                              {{ mission.useMission.stats?.completed || 0 }}
                              <span class="hidden sm:inline text-gray-500 dark:text-gray-300">Completed</span>
                            </span>
                          </div>
                        </BaseButtonIcon>

                        <BaseButtonIcon size="md" style="width:auto" rounded="lg" class="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
                          <div class="shrink-0">
                            <Icon name="ph:play-circle" class="size-4 mt-1  mr-1 text-info-500" />
                          </div>
                          <div class="flex flex-col items-start justify-center text-xs">
                            <span class="font-semibold text-gray-600 dark:text-white">
                              {{ mission.useMission.stats?.evidences || 0 }}
                              <span class="hidden sm:inline text-gray-500 dark:text-gray-300">Evidences</span>
                            </span>
                          </div>
                        </BaseButtonIcon>

                        <BaseButtonIcon size="md" style="width:auto" rounded="lg" class="flex items-center space-x-2 bg-black rounded-lg p-1">
                          <div class="shrink-0">
                            <Icon name="ph:clock" class="size-4 mt-1 mr-1 text-warning-500" />
                          </div>
                          <div class="flex flex-col items-start justify-center text-xs">
                            <span class="font-semibold text-gray-600 dark:text-white">
                              {{ mission.useMission.stats?.pending || 0 }}
                              <span class="hidden sm:inline text-gray-500 dark:text-gray-300">Pending</span>
                            </span>
                          </div>
                        </BaseButtonIcon>
                      </BaseButtonGroup>



                    </div>

                    <BaseParagraph size="md" class="markdown about-section text-gray-500 dark:text-gray-400 text-justify">
                    <!--   <div v-html="marked.parse(mission.useMission.about)"></div> -->
                    <div v-html="marked.parse(mission.useMission.about)"></div>
                    </BaseParagraph>
                  </div>
                  <!-- Title -->
                   <hr>
                  <BaseHeading size="md" weight="bold" class="uppercase mt-4 text-left text-gray-800 dark:text-gray-100">
                    Key Details
                  </BaseHeading>
                  <!-- Content -->
                  <ul class="space-y-3 text-gray-600 dark:text-gray-300">
                    <!-- Goal -->
                    <li class="flex items-start">
                      <Icon name="ph:target" class="text-success-500 mr-3 text-xl" />
                      <span>
                        <strong>Goal: </strong>
                        <span size="sm" class="text-muted-500 dark:text-gray-500">{{ mission.useMission.goal }}.
                        </span>
                      </span>
                    </li>

                    <!-- Time Period -->
                    <li class="flex items-start">
                      <Icon name="ph:hourglass" class="text-warning-500 mr-3 text-xl" />
                      <span>
                        <strong>Time Period:</strong> <!-- Conditional rendering for different repeat types -->
                        <span v-if="mission.useMission.repeat_type === 'once'" size="sm" class="text-muted-500 dark:text-gray-500">
                          This mission is a <strong>one-time mission</strong>.
                        </span>
                        <span v-else-if="mission.useMission.repeat_type === 'fixed_interval'" size="sm" class="text-muted-500 dark:text-gray-500">
                          This mission is repeatable every <strong>{{ mission.useMission.repeat_interval }}</strong> days.
                        </span>
                        <span v-else-if="mission.useMission.repeat_type === 'until_date'" size="sm" class="text-muted-500 dark:text-gray-500">
                          This mission can be repeated <strong>until {{ formatDate(mission.useMission.repeat_until) }}</strong>.
                        </span>
                        <span v-else-if="mission.useMission.repeat_type === 'fixed_count_until_date'" size="sm" class="text-muted-500 dark:text-gray-500">
                          This mission can be repeated up to <strong>{{ mission.useMission.repeat_max }}</strong> times
                          <strong>until {{ formatDate(mission.useMission.repeat_until) }}</strong>.
                        </span>
                        <span v-else size="sm" class="text-muted-500 dark:text-gray-500">
                          This mission's repeatability settings are <strong>unlimited</strong>.
                        </span>
                      </span>
                    </li>

                    <!-- Difficulty Level -->
                    <li class="flex items-start">
                      <Icon name="ph:chart-bar" class="text-info-500 mr-3 text-xl" />
                      <span>
                        <strong>Difficulty Level:</strong> <span size="sm" class="text-muted-500 dark:text-gray-500">{{ difficultyLabel(Number(mission.useMission.difficulty)).label }} ( {{ difficultyLabel(Number(mission.useMission.difficulty)).description }} ) </span>
                      </span>
                    </li>
                  </ul>
<hr>
                  <!-- Title -->
                  <BaseHeading size="md"  weight="bold" class="uppercase mt-4 text-left text-gray-800 dark:text-gray-100">
                    Steps to Complete
                  </BaseHeading>

                  <!-- Disclaimer Points -->
                  <ol class="space-y-3 text-gray-600 dark:text-gray-300 mb-4 list-decimal list-inside">
                    <li>
                      <span>
                        <strong>Prepare Bills:</strong> <span size="sm" class="text-muted-500 dark:text-gray-500">Select 10 currency bills and neatly write Schema slogans on them.</span>
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Distribute:</strong> <span size="sm" class="text-muted-500 dark:text-gray-500">Share the bills in your local community, ensuring maximum visibility.</span>
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Proof of Completion:</strong> <span size="sm" class="text-muted-500 dark:text-gray-500">Upload photos of your marked bills as proof of participation.</span>
                      </span>
                    </li>
                  </ol>
<hr>
                  <!-- Title -->
                  <BaseHeading size="md" weight="bold" class="uppercase mt-4 text-left text-gray-800 dark:text-gray-100">
                    Parameters
                  </BaseHeading>

                  <!-- Disclaimer Points -->
                  <ul class="space-y-3 text-gray-600 dark:text-gray-300 mb-4">
                    <!-- Max Participants -->
                    <li v-if="mission.useMission.max_participants" class="flex items-start">
                      <Icon name="ph:users-three" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        The <i>maximum number</i> of participants for this mission is <strong>
                          {{ mission.useMission.max_participants || 'unlimited' }}</strong>.
                      </BaseParagraph>
                    </li>

                    <!-- Mission Type -->
                    <li v-if="mission.useMission.type" class="flex items-start">
                      <Icon name="ph:tag" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        This is a <strong>{{ mission.useMission.type === 'solo' ? 'Solo Mission' : 'Group Mission' }}</strong> type, designed for <i>{{ mission.useMission.type === 'solo' ? 'individual participants' : 'teams' }}</i>.
                      </BaseParagraph>
                    </li>

                    <!-- Creation Date -->
                    <li v-if="mission.useMission.created_at" class="flex items-start">
                      <Icon name="ph:calendar" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        The mission was created on <strong>{{ mission.useMission.created_at }}</strong>.
                      </BaseParagraph>
                    </li>

                    <!-- Last Updated -->
                    <li v-if="mission.useMission.updated_at" class="flex items-start">
                      <Icon name="ph:clock-counter-clockwise" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        The mission was last updated on <strong>{{ mission.useMission.updated_at }}</strong>.
                      </BaseParagraph>
                    </li>

                    <!-- Category -->
                    <li v-if="mission.useMission.category" class="flex items-start">
                      <Icon name="ph:folder" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        This mission falls under the <strong>{{ mission.useMission.category }}</strong> category.
                      </BaseParagraph>
                    </li>

                    <!-- Mission Status -->
                    <li v-if="mission.useMission.active !== null" class="flex items-start">
                      <Icon name="flowbite:bell-active-alt-outline" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        This mission status is <strong>{{ mission.useMission.active ? 'active' : 'inactive' }}</strong> and currently {{ mission.useMission.active ? 'open' : 'closed' }} for participation.
                      </BaseParagraph>
                    </li>

                    <!-- Repeatability -->
                    <li v-if="mission.useMission.is_repeatable" class="flex items-start">
                      <Icon name="ph:repeat" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        This mission is <strong>{{ mission.useMission.is_repeatable ? 'repeatable' : 'non-repeatable' }}</strong>.
                        {{ mission.useMission.is_repeatable && mission.useMission.repeat_interval ? `Repeats every ${mission.useMission.repeat_interval} days.` : '' }}
                      </BaseParagraph>
                    </li>

                    <!-- Interaction Type -->
                    <li v-if="mission.useMission.interaction_type" class="flex items-start">
                      <Icon name="ph:handshake" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        This mission requires <strong>
                          {{
                            mission.useMission.interaction_type === 'physical' ? 'physical interaction' :
                              mission.useMission.interaction_type === 'digital' ? 'digital interaction' :
                                'both physical and digital interaction'
                          }}
                        </strong>.
                      </BaseParagraph>
                    </li>

                    <!-- Difficulty -->
                    <li v-if="mission.useMission.difficulty" class="flex items-start">
                      <Icon name="ph:star" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        The difficulty level of this mission is <strong>{{ mission.useMission.difficulty }}</strong>.
                      </BaseParagraph>
                    </li>

                    <!-- Goal -->
                    <li v-if="mission.useMission.goal" class="flex items-start">
                      <Icon name="ph:target" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        The mission goal is to <strong>{{ mission.useMission.goal }}</strong>.
                      </BaseParagraph>
                    </li>

                    <!-- Rewards -->
                    <li v-if="mission.useMission.reward" class="flex items-start">
                      <Icon name="ph:gift" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        Completing this mission rewards you with <strong>{{ mission.useMission.reward }}</strong> points.
                      </BaseParagraph>
                    </li>

                    <!-- Proof Required -->
                    <li v-if="mission.useMission.proof_total_required" class="flex items-start">
                      <Icon name="ph:check-circle" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        Participants are required to provide <strong>{{ mission.useMission.proof_total_required }}</strong> pieces of evidence to complete this mission.
                      </BaseParagraph>
                    </li>

                    <!-- Proof Accepted -->
                    <li v-if="mission.useMission.proof_percentage >= 100" class="flex items-start">
                      <Icon name="ph:thumbs-up" class="text-gray-300 mr-3 text-xl" />
                      <BaseParagraph size="sm" class="text-gray-400 dark:text-gray-400">
                        All required evidence for this mission has been <strong>accepted</strong>.
                      </BaseParagraph>
                    </li>
                  </ul>





                  <!-- roles -->
                  <div class="w-full flex justify-center items-center">

                    <!-- roles right side panel -->
                    <div v-if="rolesListData.length === 0">

                      <BasePlaceholderPage style="min-height: 150px;" title="Empty Missions Channels" subtitle="Nothing but echoes and shadows here, the roles you seek do not exist in our archives.">

                      </BasePlaceholderPage>
                    </div>
                    <div v-else class="grid grid-cols-4 gap-4 sm:grid-cols-12 md:grid-cols-12 justify-center items-center">
                      <TransitionGroup enter-active-class="transform-gpu" enter-from-class="opacity-0 -translate-x-full" enter-to-class="opacity-100 translate-x-0" leave-active-class="absolute transform-gpu" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">
                        <!-- Render the existing roles -->
                        <div v-for="role in rolesListData" :key="role.id">
                          <NuxtLink :to="`/role/${role.slug}`">
                            <BaseIconBox size="sm" rounded="lg" color="none" :data-nui-tooltip="role?.title" :class="getColorClasses(role?.color)">
                              <Icon :name="role.icon ?? ''" class="size-6" />
                            </BaseIconBox>
                          </NuxtLink>
                        </div>

                        <!-- Calculate and render the dashed placeholders -->
                        <div v-for="n in (12 - rolesListData.length)" :key="`dashed-${n}`">
                          <BaseIconBox style="height: 2.9rem; width: 2.9rem;" size="sm" rounded="lg" color="none" class="relative border-4 border-transparent text-gray-500">
                            <!-- Dashed background using repeating-linear-gradient -->
                            <div class="absolute inset-0 rounded-lg pointer-events-none bg-[repeating-linear-gradient(45deg,rgba(31,41,55,0.2)_0px,rgba(31,41,55,0.2)_2px,transparent_2px,transparent_9px)] border border-muted-300">
                            </div>
                            <Icon name="ic:baseline-plus" class="relative z-10 size-6" />
                          </BaseIconBox>
                        </div>

                      </TransitionGroup>
                    </div>

                  </div>
                  <!-- Loop through tags -->
                  <div class="flex flex-wrap gap-2 mt-6">
                    <BaseTag
  v-for="(tag, index) in mission.useMission.tags || []"
  :key="index"
  rounded="sm"
  variant="outline"
  color="primary"
  size="sm"
>
  <span>{{ tag }}</span>
</BaseTag>
                  </div>
                </UCard>
                <div class="ltablet:col-span-8 col-span-12 lg:col-span-8 pt-3">

                  <UCard class="space-y-2">

                    <BaseTabs
    class="missionTabs"
    v-model="activeTab"
    :tabs="tabs"
  >
                      <template #tab="{ activeValue }">

                        <div class="relative" style="top: -0.8rem;" v-if="activeValue === 'board' && mission.useMission.user_mission_status === 'pending'">
                          <div class="flex z-1 py-2 px-4 relative top-2">
                            <!-- Button to toggle the form -->
                            <div class="flex justify-end mb-4">
                              <BaseButton color="primary" size="sm" class="font-semibold !text-xs mb-2 mr-2" @click="toggleForm" :class="showForm ? '!bg-red-700 !text-white' : '!bg-gray-700 !text-white'">
                                {{ showForm ? 'Cancel' : 'New Thread' }}
                              </BaseButton>
                              <BaseButton color="primary" size="sm" v-if="selectedThreadId" class="font-semibold !text-xs mb-2 mr-2 !bg-gray-800" @click="async () => await mission.deleteThread(route.params.slug, selectedThreadId)">
                                <Icon name="ic:twotone-delete" class="size-5 !text-white" />

                              </BaseButton>
                            </div>
                            <!-- Threads Filter -->
                            <BaseInput v-model="threadsFilter" icon="lucide:search" rounded="md" class="!h-8 !mb-1 !text-xs" placeholder="Filter threads..." :classes="{
                              wrapper: 'w-full sm:w-auto mr-2',
                            }" />

                            <!-- Messages Filter -->
                            <BaseInput v-model="messagesFilter" icon="lucide:search" rounded="md" class="!h-8 !mb-1 !text-xs" placeholder="Filter messages..." :classes="{
                              wrapper: 'w-full sm:w-auto',
                            }" />
                          </div>

                          <!-- Threads Loading State -->
                          <div v-if="isLoadingThreads">
                            <BasePlaceholderPage title="Loading threads" subtitle="Please wait while we load the threads for you.">
                              <template #image>
                                <img class="block dark:hidden" src="/assets/components/loader.svg" alt="Placeholder image">
                                <img class="hidden dark:block" src="/assets/components/loader.svg" alt="Placeholder image">
                              </template>
                            </BasePlaceholderPage>
                          </div>

                          <!-- No Threads State -->
                          <div v-else-if="threadsListData && threadsListData.length === 0">
                            <BasePlaceholderPage title="No threads available" subtitle="Looks like you don't have any threads yet.">
                            </BasePlaceholderPage>
                          </div>

                          <!-- Threads List   :link="`/mission/${mission.useMission?.slug}/board/thread/${thread.slug}`" -->
                          <div ref="threadsContainer" v-else style="border-bottom: 4px dashed rgb(9 11 13);" class="space-y-2 pt-2 p-4">
                            <TransitionGroup enter-active-class="transform-gpu" enter-from-class="opacity-0 -translate-x-full" enter-to-class="opacity-100 translate-x-0" leave-active-class="absolute transform-gpu" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">

                              <DemoFlexListTableRow v-for="(thread, index) in threadsListData" :key="thread.id" rounded="sm" style=" transition: background-color 0.3s ease;" :class="{ 'dark:!bg-gray-900': activeThread?.id === thread.id }" @click="handleThreadClick(thread)">
                                <template #start>
                                  <DemoFlexTableStart :title="thread.title" :subtitle="thread.subtitle" :icon="thread.icon" />
                                </template>
                                <template #end>
                                  <!--         <DemoFlexTableCell label="Cost" :hide-label="index > 0" :use-label-append="true"
            class="w-full sm:w-32">
            <span class="text-muted-500 dark:text-gray-400 font-sans text-sm">
              {{ thread.pulses_cost }}
              <Icon name="ph:lightning-duotone" class="text-green-500 size-5 translate-y-1" />
            </span>
          </DemoFlexTableCell> -->
                                  <DemoFlexTableCell label="Replies" :hide-label="index > 0" :use-label-append="true" class="w-full sm:w-36">
                                    <BaseTag variant="pastel" :color="getBoardMessagesColor(thread.messages_count)" size="sm">
                                      {{ thread.messages_count }}
                                    </BaseTag>
                                  </DemoFlexTableCell>
                                </template>
                              </DemoFlexListTableRow>

                            </TransitionGroup>

                            <!-- Threads Pagination -->
                            <div style="margin-left: 8px;margin-right: 31px;" v-if="threadsListData.length !== 0 && threadsLastPage > 1" class="pt-2">
                              <BasePagination :total-items="threadsTotal ?? 0" :item-per-page="threadsPerPage" :current-page="threadsPage" :router-query-key="'threadsPage'" rounded="full" />
                            </div>
                          </div>



                          <!-- Messages Loading State -->
                          <div v-if="isLoadingMessages">
                            <BasePlaceholderPage title="Loading messages" subtitle="Please wait while we load the messages for you.">
                              <template #image>
                                <img class="block dark:hidden" src="/assets/components/loader.svg" alt="Placeholder image">
                                <img class="hidden dark:block" src="/assets/components/loader.svg" alt="Placeholder image">
                              </template>
                            </BasePlaceholderPage>
                          </div>

                          <!-- No Messages State -->
                          <!--   <div v-else-if="messagesListData.length === 0">
    <BasePlaceholderPage title="No messages available"
      subtitle="Looks like you don't have any messages yet.">
    </BasePlaceholderPage>
  </div> -->

                          <!-- Messages List
   :link="`/mission/${mission.useMission?.slug}/board/message/${message.slug}`"
    :title="message.title"  -->
                          <div ref="messagesContainer" v-else class="space-y-2 p-4">

                            <!-- Thread Form -->
                            <div v-if="showForm" class="mt-2">
                              <UCard rounded="md" shadow="md" class="p-3 bg-white border-none">
                                <form @submit.prevent="submitNewThread">
                                  <!-- Thread Title -->
                                  <BaseInput v-model="newThreadTitle" placeholder="Enter a title for your thread" rounded="md" required style="font-size: 0.775rem;" class="mb-4" />
                                  <BaseInput v-model="newThreadSubtitle" placeholder="Enter a subtitle for your thread" rounded="md" required style="font-size: 0.775rem;" class="mb-4" />

                                  <!-- Thread Description -->
                                  <BaseTextarea v-model="newThreadDescription" placeholder="Write the details of your thread" rows="4" rounded="md" style="font-size: 0.775rem;" required class="mb-4" />

                                  <!-- Submit Button -->
                                  <BaseButton type="submit" color="primary" size="md" class="w-full">
                                    Post Thread
                                  </BaseButton>
                                </form>
                              </UCard>
                            </div>



                            <div v-else>
                              <TransitionGroup enter-active-class="transform-gpu" enter-from-class="opacity-0 -translate-x-full" enter-to-class="opacity-100 translate-x-0" leave-active-class="absolute transform-gpu" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">

                                <BoardFlexListTableRow v-for="(message, index) in messagesListData" :key="message.id" rounded="sm" @click="handleMessageClick(message)">
                                  <template #start>
                                    <BoardFlexTableStart :subtitle="marked.parse(message.description)" picture="https://api.schema.cx/storage/avatars/default.png" />
                                  </template>
                                  <template #end>
                                    <DemoFlexTableCell :hide-label="index > 0" :use-label-append="true" class="w-full sm:w-36">

                                      <BaseDropdown variant="context" label="Dropdown" orientation="end" r size="md" class="z-20" rounded="lg">
                                        <!-- Board View Option -->
                                        <BaseDropdownItem :to="`/mission/${slug}`" title="Board view" text="Switch to board view" class="sm:hidden">
                                          <!-- Icon for Board View -->
                                          <template #start>
                                            <Icon name="ph:kanban-duotone" class="me-2 block size-5" />
                                          </template>
                                        </BaseDropdownItem>

                                        <BaseDropdownDivider />

                                        <!-- Edit Option -->
                                        <BaseDropdownItem to="#" title="Edit" text="Edit this project">
                                          <!-- Icon for Edit -->
                                          <template #start>
                                            <Icon name="ph:pencil-duotone" class="me-2 block size-5" />
                                          </template>
                                        </BaseDropdownItem>

                                        <BaseDropdownDivider />

                                        <!-- Delete Option -->
                                        <BaseDropdownItem v-if="message.user_id === auth.user.id" @click="async () => {
                                          if (!route.params.slug || !activeThread.slug) {
                                            console.error('Slug is undefined');
                                            return;
                                          }
                                          console.log('Deleting message', message.id);

                                          await mission.deleteMessage(route.params.slug, activeThread.slug, message.id);
                                        }" title="Delete" text="Delete this message">
                                          <template #start>
                                            <Icon name="ph:trash-duotone" class="me-2 block size-5" />
                                          </template>
                                        </BaseDropdownItem>
                                      </BaseDropdown>

                                    </DemoFlexTableCell>
                                  </template>
                                </BoardFlexListTableRow>
                              </TransitionGroup>
                              <!-- Messages Pagination -->
                              <div v-if="messagesListData.length !== 0 && messagesLastPage > 1" style="margin-left: 8px;margin-right: 31px;" class="pt-2">
                                <BasePagination :total-items="messagesTotal ?? 0" :item-per-page="messagesPerPage" :current-page="messagesPage" :router-query-key="'messagesPage'" rounded="full" />
                              </div>
                            </div>


                            <div v-if="activeThread" class="mt-6">
                              <!-- Reply Form -->
                              <UCard class="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
                                <form @submit.prevent="submitThreadReply">
                                  <BaseTextarea v-model="newReplyContent" placeholder="Write your reply..." rows="4" rounded="md" required class="mb-4" />
                                  <BaseButton type="submit" color="primary" size="md" class="w-full">
                                    Post Reply
                                  </BaseButton>
                                </form>
                              </UCard>
                            </div>
                          </div>
                        </div>

                        <div class="relative" style="top: -0.8rem;" v-else-if="activeValue === 'missionRoles'">
                          <div class="flex justify-between items-center z-1 py-2 px-4 relative top-2">
                            <BaseInput v-model="rolesFilter" icon="lucide:search" rounded="md" class="!h-8 !mb-1 !text-xs" placeholder="Filter roles..." :classes="{
                              wrapper: 'w-full sm:w-auto',
                            }" />
                          </div>
                          <div v-if="isLoadingRoles">
                            <BasePlaceholderPage title="Loading module roles" subtitle="Please wait while we load the roles data for you.">
                              <template #image>
                                <img class="block dark:hidden" src="/assets/components/loader.svg" alt="Placeholder image">
                                <img class="hidden dark:block" src="/assets/components/loader.svg" alt="Placeholder image">
                              </template>
                            </BasePlaceholderPage>
                          </div>
                          <!--        <div v-else-if="Error">
<BasePlaceholderPage
title="Error loading modules roles"
subtitle="Looks like we couldn't load the roles data: [ {{ error }} ]"
>
</BasePlaceholderPage>
</div> -->
                          <div v-else-if="rolesListData.length === 0">
                            <BasePlaceholderPage title="No roles available" subtitle="Looks like you don't have any roles for the moment. Come back when you have some.">
                            </BasePlaceholderPage>
                          </div>

                          <div ref="rolesContainer" v-else class="space-y-2 pt-2 p-4">
                            <TransitionGroup enter-active-class="transform-gpu" enter-from-class="opacity-0 -translate-x-full" enter-to-class="opacity-100 translate-x-0" leave-active-class="absolute transform-gpu" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">

                              <DemoFlexListTableRow v-for="(role, index) in rolesListData " :key="role.id" rounded="sm" :class="{
                                'absolute inset-0 rounded-lg pointer-events-none bg-[repeating-linear-gradient(45deg,rgba(31,41,55,0.2)_0px,rgba(31,41,55,0.2)_2px,transparent_2px,transparent_9px)] dark:bg-[repeating-linear-gradient(45deg,rgba(31,41,55,0.2)_0px,rgba(31,41,55,0.2)_2px,transparent_2px,transparent_9px)]': role.is_optional && !role.has_role,
                                '!bg-green-500 dark:!bg-green-800/10 dark:hover:!bg-green-700/20': role.has_role,
                                'bg-red-500 dark:bg-red-800/10 dark:hover:bg-red-700/20': !role.is_optional
                              }">

                                <template #start>
                                  <DemoFlexTableStart :title="role.title" :subtitle="role.title" :icon="role.icon" />
                                </template>
                                <template #end>
                                  <DemoFlexTableCell label="Cost" :hide-label="index > 0" :use-label-append="true" class="w-full sm:w-32 hidden">
                                    <template #label-append>
                                      <TairoPopover size="sm" fixed placement="left-end">
                                        <Icon name="lucide:help-circle" class="ms-1 size-4 relative top-0.5" />
                                        <template #content>
                                          <TairoPopoverContentHelp title="Role Cost" subtitle="Resource Allocation" text="The cost of this role represents the resources required to undertake responsibilities within this module. It reflects the time, effort, and materials needed to contribute effectively and ensure the smooth functioning of the module." icon="ph:currency-circle-dollar-duotone" />
                                        </template>
                                      </TairoPopover>
                                    </template>
                                    <div class="flex w-full items-center justify-end gap-1 sm:justify-center">

                                      <span class="text-muted-500 dark:text-primary-400 font-sans text-sm">
                                        {{ role.pulses_cost }}
                                        <Icon name="ph:lightning-duotone" class="text-green-500 size-5 translate-y-1" />
                                      </span>
                                    </div>
                                  </DemoFlexTableCell>
                                  <DemoFlexTableCell label="Access" :use-label-append="true" :hide-label="index > 0" class="w-full sm:w-36">
                                    <!--    <template #label-append>
                                      <TairoPopover size="sm" fixed placement="left-end">
                                        <Icon name="lucide:help-circle" class="ms-1 size-4 relative top-0.5" />
                                        <template #content>
                                          <TairoPopoverContentHelp title="Available Slots"
                                            subtitle="Position Availability"
                                            text="The available slots indicate how many participants can currently take up this role. Ensure that you apply early to secure your spot and contribute to the ongoing success of this module."
                                            icon="ph:users-duotone" />
                                        </template>
                                      </TairoPopover>
                                    </template> -->
                                    <template v-if="role.has_role">
                                      <!-- Green success icon for roles the user has -->
                                      <BaseIconBox size="sm" class="!bg-transparent" variant="pastel" color="success">
                                        <Icon name="ph:check-circle-duotone" class="size-6" />
                                      </BaseIconBox>
                                    </template>
                                    <template v-else-if="role.is_optional">
                                      <!-- Muted icon for optional roles the user doesn't have -->
                                      <BaseIconBox size="sm" class="!bg-transparent" variant="pastel" color="danger">
                                        <Icon name="ph:x-circle-duotone" class="size-6 !text-gray-500" />
                                      </BaseIconBox>
                                    </template>
                                    <template v-else>
                                      <!-- Red icon for required roles the user doesn't have -->
                                      <BaseIconBox size="sm" variant="pastel" class="!bg-transparent" color="danger">
                                        <Icon name="fluent:circle-hint-dismiss-24-regular" class="size-6" />
                                      </BaseIconBox>
                                    </template>
                                  </DemoFlexTableCell>
                                  <DemoFlexTableCell label="Slots" :use-label-append="true" :hide-label="index > 0" class="w-full sm:w-36 hidden">
                                    <template #label-append>
                                      <TairoPopover size="sm" fixed placement="left-end">
                                        <Icon name="lucide:help-circle" class="ms-1 size-4 relative top-0.5" />
                                        <template #content>
                                          <TairoPopoverContentHelp title="Available Slots" subtitle="Position Availability" text="The available slots indicate how many participants can currently take up this role. Ensure that you apply early to secure your spot and contribute to the ongoing success of this module." icon="ph:users-duotone" />
                                        </template>
                                      </TairoPopover>
                                    </template>
                                    <BaseTag variant="pastel" rounded="full" :color="role.open_slots === 0
                                      ? 'danger'
                                      : role.open_slots === 1
                                        ? 'primary'
                                        : 'success'
                                      " size="sm">
                                      {{ role.open_slots }}
                                    </BaseTag>
                                  </DemoFlexTableCell>
                                  <DemoFlexTableCell class="hidden" :hide-label="index > 0">
                                    <BaseDropdown variant="context" label="Dropdown" orientation="bottom-end" size="md" rounded="lg">
                                      <BaseDropdownItem to="#" title="Edit" text="Edit this project">
                                        <template #start>
                                          <Icon name="ph:pencil-duotone" class="me-2 block size-5" />
                                        </template>
                                      </BaseDropdownItem>
                                      <BaseDropdownDivider />
                                      <BaseDropdownItem to="#" title="Disable" text="Temporarily turn off">
                                        <template #start>
                                          <Icon name="ph:lock-duotone" class="me-2 block size-5" />
                                        </template>
                                      </BaseDropdownItem>
                                      <BaseDropdownItem to="#" title="Files" text="Manage files">
                                        <template #start>
                                          <Icon name="ph:file-duotone" class="me-2 block size-5" />
                                        </template>
                                      </BaseDropdownItem>
                                      <BaseDropdownDivider />
                                      <BaseDropdownItem to="#" title="Delete" text="Delete this project">
                                        <template #start>
                                          <Icon name="ph:trash-duotone" class="me-2 block size-5" />
                                        </template>
                                      </BaseDropdownItem>
                                    </BaseDropdown>
                                  </DemoFlexTableCell>
                                </template>
                              </DemoFlexListTableRow>
                            </TransitionGroup>
                            <div v-if="rolesListData.length !== 0 && rolesLastPage > 1" class="pt-2">
                              <BasePagination :total-items="rolesTotal ?? 0" :item-per-page="rolesPerPage" :current-page="rolesPage" :router-query-key="'rolesPage'" rounded="full" />
                            </div>
                          </div>
                        </div>
                      </template>
                    </BaseTabs>
                  </UCard>
                </div>
              </div>

              <div v-if="activeValue === 'proof'">
                <UCard class="space-y-6 p-0 bg-gray-800 text-white relative">
                  <div class="proof-form-container">
                    <div class="border-muted-200 dark:border-zinc-900 flex items-center justify-between gap-4 border-b px-10 py-5 mb-4">
                      <div>
                        <BaseHeading as="h3" size="md" weight="medium">
                          Submit Your Evidence
                        </BaseHeading>
                        <BaseText size="xs" class="text-primary-400">
                          Provide {{ mission.useMission.proof_total_required || 0 }} verified evidence files for completing your mission
                        </BaseText>
                      </div>
                    </div>
                    <!--       <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
  <UCard class="p-4">
    <Icon name="ph:files-duotone" class="text-primary-500 size-6" />
    <BaseHeading size="md" class="mt-2">Total Required Proofs</BaseHeading>
    <BaseParagraph size="sm" class="text-muted-500 dark:text-primary-500">
      {{ mission.useMission.proof_total_required || 0 }}
    </BaseParagraph>
  </UCard>
  <UCard class="p-4">
    <Icon name="ph:check-circle-duotone" class="text-success-500 size-6" />
    <BaseHeading size="md" class="mt-2">Accepted Proofs</BaseHeading>
    <BaseParagraph size="sm" class="text-muted-500 dark:text-primary-500">
      {{ mission.useMission.proof_accepted || 0 }}
    </BaseParagraph>
  </UCard>
  <UCard class="p-4">
    <Icon name="ph:x-circle-duotone" class="text-danger-500 size-6" />
    <BaseHeading size="md" class="mt-2">Rejected Proofs</BaseHeading>
    <BaseParagraph size="sm" class="text-muted-500 dark:text-primary-500">
      {{ mission.useMission.proof_rejected || 0 }}
    </BaseParagraph>
  </UCard>
  <UCard class="p-4">
    <Icon name="ph:clock-duotone" class="text-warning-500 size-6" />
    <BaseHeading size="md" class="mt-2">Pending Proofs</BaseHeading>
    <BaseParagraph size="sm" class="text-muted-500 dark:text-primary-500">
      {{ mission.useMission.proof_pending || 0 }}
    </BaseParagraph>
  </UCard>
  <UCard class="p-4">
    <Icon name="ph:plus-circle-duotone" class="text-info-500 size-6" />
    <BaseHeading size="md" class="mt-2">Remaining Slots</BaseHeading>
    <BaseParagraph size="sm" class="text-muted-500 dark:text-primary-500">
      {{ mission.useMission.proof_remaining_slots || 0 }}
    </BaseParagraph>
  </UCard>
</div> -->
                    <div v-if="mission.useMission.proof_accepted < 10" class="px-7 py-5">
                      <form @submit.prevent="submitProof">
                        <div class="grid gap-4">
                          <!-- File Upload Section -->
                          <div class="col-span-12 sm:col-span-9">
                            <BaseInputFileHeadless v-slot="{ open, remove, preview, drop, files }" v-model="uploadedFiles" multiple>
                              <!-- Controls -->
                              <div class="mb-4 flex items-center justify-between gap-2">
                                <button style="width: 5%;" type="button" class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-primary-200 hover:text-primary-600 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300" tooltip="Select files" @click="open">
                                  <Icon name="lucide:plus" class="absolute start-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2" />
                                  <span class="sr-only">Select files</span>
                                </button>
                                <BaseProgress rounded="sm" class="py-4" :title="`Validation Progress: ${mission.useMission.proof_percentage}%`" :value="mission.useMission.proof_percentage" color="success" />
                                <BaseButtonAction style="width: 15%;" type="submit" color="success" :disabled="isLoadingProof">
                                  <Icon name="lucide:arrow-up" class="size-3" />
                                  <span>Send</span>
                                </BaseButtonAction>
                              </div>

                              <div role="button" tabindex="-1" @dragenter.stop.prevent @dragover.stop.prevent @drop="drop">
                                <div v-if="!files?.length" class="nui-focus border-muted-300 dark:border-zinc-800 hover:border-muted-400 focus:border-muted-400 dark:hover:border-zinc-700 dark:focus:border-primary-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-8 transition-colors duration-300" @click="open" @keydown.enter.prevent="open">
                                  <div class="p-5 text-center">
                                    <Icon name="mdi-light:cloud-upload" class="text-muted-400 dark:text-zinc-500 group-hover:text-primary-500 group-focus:text-primary-500 mb-2 size-10 transition-colors duration-300" />
                                    <h4 class="text-muted-400 font-sans text-sm">
                                      Drop files to upload
                                    </h4>
                                    <label class="text-muted-400 dark:text-zinc-500 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-sm underline underline-offset-4 transition-colors duration-300">
                                      Select files
                                    </label>
                                  </div>
                                </div>
                                <ul v-else class="mt-6 space-y-2">
                                  <li v-for="file in files" :key="file.name">
                                    <div class="border-muted-200 dark:border-zinc-800/20 dark:bg-zinc-900 relative flex items-center justify-between gap-2 rounded-xl border bg-white p-3 max-w-full">
                                      <div class="flex items-center gap-2">
                                        <img v-if="file.type.startsWith('image')" class="size-14 rounded-xl object-cover object-center" :src="preview(file).value" alt="Image preview" />
                                        <img v-else style="    filter: invert(1);" class="size-14 rounded-xl object-cover object-center" src="/assets/avatars/placeholder-file.png" alt="File preview" />
                                        <div class="font-sans">
                                          <span class="text-muted-800 dark:text-zinc-100 line-clamp-1 block text-sm">{{ file.name }}</span>
                                          <span class="text-muted-400 dark:text-zinc-400 block text-xs">{{ formatFileSize(file.size) }}</span>
                                        </div>
                                      </div>
                                      <button class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-zinc-200 hover:text-primary-600 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:text-zinc-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300" type="button" tooltip="Remove" @click.prevent="remove(file)">
                                        <Icon name="lucide:x" class="size-4" />
                                        <span class="sr-only">Remove</span>
                                      </button>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </BaseInputFileHeadless>
                          </div>

                          <!-- Text Input Section -->
                          <div class="col-span-12 sm:col-span-9">
                            <Field name="proof.text" v-slot="{ field, errorMessage, handleChange, handleBlur }">
                              <BaseTextarea v-model="proofText" placeholder="Write some details about your evidence..." :model-value="field.value" :error="errorMessage" @update:model-value="handleChange" @blur="handleBlur" />
                            </Field>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="px-4 py-8">
                      <!--       <div class="flex justify-between items-center z-1 py-2 px-4 relative top-2">
                            <BaseInput v-model="proofsFilter" icon="lucide:search" rounded="md" class="!h-8 !mb-1 !text-xs" placeholder="Filter proofs..." :classes="{
                              wrapper: 'w-full sm:w-auto',
                            }" />
                          </div> -->
                      <div v-if="isLoadingProofs">
                        <BasePlaceholderPage title="Loading module proofs" subtitle="Please wait while we load the proofs data for you.">
                          <template #image>
                            <img class="block dark:hidden" src="/assets/components/loader.svg" alt="Placeholder image">
                            <img class="hidden dark:block" src="/assets/components/loader.svg" alt="Placeholder image">
                          </template>
                        </BasePlaceholderPage>
                      </div>
                      <!--        <div v-else-if="Error">
<BasePlaceholderPage
title="Error loading modules proofs"
subtitle="Looks like we couldn't load the proofs data: [ {{ error }} ]"
>
</BasePlaceholderPage>
</div> -->
                      <div v-else-if="proofsListData.length === 0">
                        <BasePlaceholderPage title="No proofs available" subtitle="Looks like you don't have any proofs for the moment. Come back when you have some.">
                        </BasePlaceholderPage>
                      </div>

                      <div ref="proofsContainer" v-else class="space-y-2 pt-2 p-2">
                        <TransitionGroup enter-active-class="transform-gpu" enter-from-class="opacity-0 -translate-x-full" enter-to-class="opacity-100 translate-x-0" leave-active-class="absolute transform-gpu" leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">
                          <DemoFlexListTableRow v-for="(proof, index) in proofsListData" :key="proof.id" rounded="sm" :class="{
                            'absolute inset-0 rounded-lg bg-[repeating-linear-gradient(45deg,rgba(31,41,55,0.2)_0px,rgba(31,41,55,0.2)_2px,transparent_2px,transparent_9px)] dark:bg-[repeating-linear-gradient(45deg,rgba(31,41,55,0.2)_0px,rgba(31,41,55,0.2)_2px,transparent_2px,transparent_9px)]': proof.status === 'pending',
                            '!bg-green-500 dark:!bg-green-800/10 dark:hover:!bg-green-700/20': proof.status === 'approved',
                            'bg-red-500 dark:bg-red-800/10 dark:hover:bg-red-700/20': proof.status === 'rejected'
                          }" @click="handleRowClick(proof)">
                            <template #start>
                              <DemoFlexTableStart :label="`[ ${mission.useMission.proof_files || 0} ] Evidence Files`" :hide-label="index > 0" :title="proof.type" html :subtitle="proof.text ? parseMarkdown(proof.text) : 'No description available'" :icon="getFileTypeIcon(proof.type)" />
                            </template>
                            <template #end>
                              <DemoFlexTableCell :label="`[ ${mission.useMission.proof_accepted || 0} ] Verified`" :hide-label="index > 0" class="w-full sm:w-36">
                                <template v-if="proof.status === 'approved'">
                                  <BaseIconBox :data-nui-tooltip="`Reviewed At: ${new Date(proof.created_at).toLocaleString()}`" size="sm" class="!bg-transparent" variant="pastel" color="success">
                                    <Icon name="ph:check-circle-duotone" class="size-6" />
                                  </BaseIconBox>
                                </template>
                                <template v-else-if="proof.status === 'pending'">
                                  <BaseIconBox :data-nui-tooltip="`Uploaded At: ${new Date(proof.created_at).toLocaleString()}`" size="sm" class="!bg-transparent" variant="pastel" color="warning">
                                    <Icon name="ph:clock-duotone" class="size-6" />
                                  </BaseIconBox>
                                </template>
                                <template v-else>
                                  <BaseIconBox :data-nui-tooltip="`Reviewed At: ${new Date(proof.created_at).toLocaleString()}`" size="sm" variant="pastel" class="!bg-transparent" color="danger">
                                    <Icon name="ph:x-circle-duotone" class="size-6" />
                                  </BaseIconBox>
                                </template>
                              </DemoFlexTableCell>
                            </template>
                          </DemoFlexListTableRow>
                          <TairoModal :open="isModalOpen" size="2xl" @close="closeModal">
                            <template #header>
                              <div class="flex w-full items-center justify-between p-4 md:p-6">
                                <h3 class="font-heading text-muted-900 text-lg font-medium leading-6 dark:text-white">
                                  Media Viewer
                                </h3>
                                <BaseButtonClose @click="closeModal" />
                              </div>
                            </template>

                            <div class="p-4 md:p-6">
                              <div v-if="selectedProof?.type === 'image'" class="flex justify-center">
                                <img :src="`https://api.schema.cx/storage/${selectedProof.file_path}`" alt="Proof Image" class="max-w-full h-auto rounded-lg" />
                              </div>
                              <div v-else-if="selectedProof?.type === 'video'" class="flex justify-center">
                                <video controls class="max-w-full rounded-lg">
                                  <source :src="`https://api.schema.cx/storage/${selectedProof.file_path}`" type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                              <div v-else-if="selectedProof?.type === 'audio'" class="flex justify-center">
                                <audio controls class="w-full">
                                  <source :src="`https://api.schema.cx/storage/${selectedProof.file_path}`" type="audio/mpeg" />
                                  Your browser does not support the audio tag.
                                </audio>
                              </div>
                              <div v-else-if="selectedProof?.type === 'text'" class="flex flex-col items-start">
                                <p class="whitespace-pre-wrap">{{ selectedProof.text }}</p>
                              </div>
                              <div v-else>
                                <p>Unsupported media type.</p>
                              </div>
                            </div>

                            <template #footer>
                              <div class="p-4 md:p-6">
                                <BaseButton color="primary" variant="solid" @click="closeModal">
                                  Close
                                </BaseButton>
                              </div>
                            </template>
                          </TairoModal>
                        </TransitionGroup>
                        <div v-if="proofsListData.length !== 0 && proofsLastPage > 1" class="pt-2">
                          <BasePagination :total-items="proofsTotal ?? 0" :item-per-page="proofsPerPage" :current-page="proofsPage" :router-query-key="'proofsPage'" rounded="full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </UCard>
              </div>

              <div v-if="activeValue === 'legal'">
                <UCard class="space-y-6 p-10 bg-gray-800 text-white relative">
                  <!-- Dropdown for mission actions such as board view, edit, permissions, files, and delete -->
                  <div class="absolute end-4 top-4 z-20">
                    <BaseDropdown variant="context" label="Dropdown" orientation="end" r size="md" class="z-20" rounded="lg">
                      <!-- Board View Option -->
                      <BaseDropdownItem :to="`/mission/${slug}`" title="Board view" text="Switch to board view" class="sm:hidden">
                        <!-- Icon for Board View -->
                        <template #start>
                          <Icon name="ph:kanban-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <BaseDropdownDivider />

                      <!-- Edit Option -->
                      <BaseDropdownItem to="#" title="Edit" text="Edit this project">
                        <!-- Icon for Edit -->
                        <template #start>
                          <Icon name="ph:pencil-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <BaseDropdownDivider />

                      <!-- Permissions Option -->
                      <BaseDropdownItem to="#" title="Permissions" text="Manage permissions">
                        <!-- Icon for Permissions -->
                        <template #start>
                          <Icon name="ph:lock-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <!-- Files Option -->
                      <BaseDropdownItem to="#" title="Files" text="Manage files">
                        <!-- Icon for Files -->
                        <template #start>
                          <Icon name="ph:file-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>

                      <BaseDropdownDivider />

                      <!-- Delete Option -->
                      <BaseDropdownItem to="#" title="Delete" text="Delete this project">
                        <!-- Icon for Delete -->
                        <template #start>
                          <Icon name="ph:trash-duotone" class="me-2 block size-5" />
                        </template>
                      </BaseDropdownItem>
                    </BaseDropdown>
                  </div>

                  <!-- Content -->
                  <div class="flex flex-col items-center space-y-6">
                    <!-- Title -->
                    <BaseHeading size="lg" weight="semibold" class="text-gray-800 dark:text-gray-100">
                      Legal Disclaimer
                    </BaseHeading>
                    <!-- Disclaimer Points -->
                    <ul class="space-y-3 text-gray-600 dark:text-gray-300 mb-4">
                      <li class="flex items-start">
                        <Icon name="ph:shield-check" class="text-primary-500 mr-3 text-xl" />
                        <span>
                          <strong>Personal Responsibility:</strong> You undertake this mission of your own free will.
                          Ensure that your actions comply with local, national, and international laws.
                        </span>
                      </li>
                      <li class="flex items-start">
                        <Icon name="ph:scales" class="text-primary-500 mr-3 text-xl" />
                        <span>
                          <strong>No Liability:</strong> Schema is not liable for any legal, financial, or personal repercussions resulting from your participation in this mission.
                        </span>
                      </li>
                      <li class="flex items-start">
                        <Icon name="ph:book-open" class="text-primary-500 mr-3 text-xl" />
                        <span>
                          <strong>Respect for Laws:</strong> Participants are responsible for ensuring that marking or altering physical currency is legal in their jurisdiction.
                        </span>
                      </li>
                      <li class="flex items-start">
                        <Icon name="ph:handshake" class="text-primary-500 mr-3 text-xl" />
                        <span>
                          <strong>Ethical Conduct:</strong> Promote creativity and awareness ethically. Misuse, such as promoting harmful messages or engaging in fraud, is prohibited.
                        </span>
                      </li>
                      <li class="flex items-start">
                        <Icon name="ph:upload" class="text-primary-500 mr-3 text-xl" />
                        <span>
                          <strong>Proof Submission:</strong> By uploading photos of marked bills, you confirm responsible behavior and adherence to these terms.
                        </span>
                      </li>
                    </ul>
                    <!-- Footer Note -->
                    <BaseMessage icon="ph:lightbulb" color="warning" class="text-xs text-gray-500 dark:text-gray-400 mt-6">
                      The actions you take reflect your own values and decisions. Think critically and act responsibly.
                    </BaseMessage>
                  </div>
                </UCard>
              </div>
            </div>

            <div class="ltablet:col-span-4 col-span-12 lg:col-span-4">
              <div class="relative flex flex-col gap-3">

                <!-- Pulse Vault -->
                <div class="col-span-12 sm:col-span-6 relative">
                  <div class="col-span-12 sm:col-span-6 relative">
                    <!-- Mission Stats Section -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                      <UCard>
                        <Icon name="ph:lightning-duotone" class="text-gray-500 size-6" />
                        <BaseHeading size="md" lead="tight" class="mt-2">Reward</BaseHeading>
                        <BaseParagraph size="sm" class="text-muted-500 dark:text-gray-400">{{ mission.useMission.reward }}</BaseParagraph>
                      </UCard>
                      <UCard>
                        <Icon name="ph:rocket-duotone" class="text-success-500 size-6" />
                        <BaseHeading size="md" lead="tight"  class="mt-2">Difficulty</BaseHeading>
                        <BaseParagraph size="sm" class="text-muted-500 dark:text-gray-400">{{ difficultyLabel(Number(mission.useMission.difficulty)).label }}</BaseParagraph>
                      </UCard>
                      <UCard>
                        <Icon name="ph:user-thin" class="text-warning-500 size-6" />
                        <BaseHeading size="md" lead="tight" class="mt-2">Type</BaseHeading>
                        <BaseParagraph size="sm" class="text-muted-500 dark:text-gray-400">
                          <span v-if="mission.useMission.type === 'solo'">Solo</span>
                          <span v-else-if="mission.useMission.type === 'group'">Group</span>
                          <span v-else-if="mission.useMission.type === 'community'">Community</span>
                          <span v-else>Undefined</span>
                        </BaseParagraph>
                      </UCard>
                    </div>
                  </div>
                  <UCard class="mt-3">
                    <div>
                      <BaseParagraph size="sm" class="hidden text-muted-500 dark:text-gray-400">
                        Pulse to contribute a pulse to our mission's evolution. Each pulse helps enhance and expand the
                        capabilities
                        of our community mission, driving us towards a more innovative expansion.
                      </BaseParagraph>
                    </div>
                    <!-- Additional Notes -->
                    <BaseMessage v-if="auth.user.roles.includes('51') && mission.useMission.active != null && mission.useMission.active !== true" icon="eos-icons:admin" color="danger" class="mb-6" rounded="md">

                      This mission is currently inactive for regular users. Only admin can access this mission.

                    </BaseMessage>
                    <BaseMessage color="info" icon="ic:twotone-info" class="text-sm mb-6" rounded="md">
                      Schema encourages ethical, responsible participation while respecting cultural and legal sensitivities. Activities may be discontinued if legal restrictions arise.
                    </BaseMessage>
                    <BaseMessage v-if="!hasRequiredRoles" icon="typcn:warning" color="warning" class="text-sm mb-6" rounded="md">
                      <span>
                        <strong class="font-semibold">Warning:</strong> You do not have the required roles to start this mission. Please acquire the necessary roles to proceed.
                      </span>
                    </BaseMessage>

                    <div class="relative pb-4">
                      <div v-if="!isLoadingMission">
                        <UCard class="mt-3" style="background: none;">
                          <div>
                            <BaseHeading size="md" weight="semibold" class="mb-4">Mission Actions</BaseHeading>
                          </div>
                          <!-- Accept and Complete Buttons -->
                          <div class="flex items-center gap-2">
                            <!-- Accept Mission Button -->
                            <BaseButton v-if="mission.useMission.user_mission_status !== 'completed'" :disabled="isLoadingAcceptMission || !canAcceptMission || !hasRequiredRoles" :color="getStatusButtonColor(mission.useMission.user_mission_status)" class="!font-semibold !text-sm mb-1 w-full" @click="handleAcceptMission">
                              <span v-if="mission.useMission.user_mission_status === 'not_started'">
                                Accept Mission
                              </span>
                              <span v-if="mission.useMission.user_mission_status === 'pending'">
                                In Progress
                              </span>
                              <span v-if="mission.useMission.user_mission_status === 'failed'">
                                Retry Mission
                              </span>
                            </BaseButton>

                            <!-- Disabled Completed Button -->
                            <BaseButton v-else :disabled="true" color="success" class="!font-semibold !text-sm mb-1 w-full">
                              <span>Mission Completed</span>
                            </BaseButton>

                            <!-- Complete Mission Button -->
                            <BaseButton v-if="mission.useMission.user_mission_status === 'in_progress'" :disabled="isLoadingCompleteMission || !canCompleteMission" class="!font-semibold !bg-gray-700 !text-white !text-sm mb-1 w-full" @click="completeMission(mission.useMission.slug)">
                              <span>Mark as Complete</span>
                            </BaseButton>
                          </div>
                          <!-- Mission Details -->
                          <div class="mt-4 mb-4">
                            <!-- Show Started At if it exists -->
                            <BaseParagraph v-if="mission.useMission.user_mission_started_at" size="sm" class="text-muted-500 dark:text-gray-500">
                              <strong>Started At:</strong> {{ mission.useMission.user_mission_started_at }}
                            </BaseParagraph>

                            <!-- Show Completed At if it exists -->
                            <BaseParagraph v-if="mission.useMission.user_mission_completed_at" size="sm" class="text-muted-500 dark:text-gray-500">
                              <strong>Completed At:</strong> {{ mission.useMission.user_mission_completed_at }}
                            </BaseParagraph>
                          </div>


                          <!-- Accept and Complete Buttons -->
                          <div v-if="showProofSection">
                            <div class="flex items-center gap-2">
                              <!-- Upload Proof Button -->
                              <BaseButton :disabled="isLoadingProofSubmission || mission.useMission.proof_percentage !== 100" class="!font-semibold !text-sm mb-1 w-full" @click="completeMission(mission.useMission.slug)" color="success">
                                <span v-if="mission.useMission.user_mission_status === 'pending'">
                                  Validate
                                </span>
                              </BaseButton>
                            </div>
                            <p v-if="mission.useMission.proof_percentage !== 100" class="p-2">
                              <BaseProgress rounded="md" class="py-1" :title="`Validation Progress: ${mission.useMission.proof_percentage}%`" :value="mission.useMission.proof_percentage" color="success" />
                            </p>
                            <!-- Mission Details -->
                            <div class="mt-4">
                              <!-- Show Started At if it exists -->
                              <BaseParagraph v-if="mission.useMission.user_mission_started_at" size="sm" class="text-muted-500 dark:text-gray-500">
                                <strong>Sended at:</strong> {{ mission.useMission.user_mission_started_at }}
                              </BaseParagraph>

                              <!-- Show Completed At if it exists -->
                              <BaseParagraph v-if="mission.useMission.user_mission_completed_at" size="sm" class="text-muted-500 dark:text-gray-500">
                                <strong>Reviewed At:</strong> {{ mission.useMission.user_mission_completed_at }}
                              </BaseParagraph>
                            </div>
                          </div>
                        </UCard>
                      </div>

                    </div>

                  </UCard>
                  <UCard  v-if="auth.user?.roles?.includes('master')" class="mt-3 p-4 space-y-2 text-white rounded-lg">
                    <!-- Mission Attributes -->
                    <div class="flex items-center bg-zinc-800 rounded-md py-2 px-3 hover:bg-gray-600 transition">
                      <Icon name="material-symbols:id-card-outline-rounded" class="text-white text-xl mr-3" />
                      <span class="text-white text-sm">22</span>
                    </div>
                    <div class="flex items-center bg-zinc-900 rounded-md py-2 px-3 hover:bg-gray-600 transition">
                      <Icon name="ph:target" class="text-white text-xl mr-3" />
                      <span class="text-white text-sm">Marketing</span>
                    </div>
                    <div class="flex items-center  bg-zinc-900 rounded-md py-2 px-3 hover:bg-gray-600 transition">
                      <Icon name="material-symbols:physical-therapy-outline" class="text-white text-xl mr-3" />
                      <span class="text-white text-sm">Physical</span>
                    </div>
                    <div class="flex items-center  bg-zinc-900 rounded-md py-2 px-3 hover:bg-gray-600 transition">
                      <Icon name="ph:repeat" class="text-white text-xl mr-3" />
                      <span class="text-white text-sm">Repeatable</span>
                    </div>
                    <div class="flex items-center  bg-zinc-900 rounded-md py-2 px-3 hover:bg-gray-600 transition">
                      <Icon name="ph:check-circle" class="text-white text-xl mr-3" />
                      <span class="text-white text-sm">Active</span>
                    </div>
                    <div class="flex items-center  bg-zinc-900 rounded-md py-2 px-3 hover:bg-gray-600 transition">
                      <Icon name="ph:calendar" class="text-white text-xl mr-3" />
                      <span class="text-white text-sm">2024-12-24</span>
                    </div>
                  </UCard>
                  <div class="hidden space-y-6">
                    <!-- Mission Stats Section -->
                    <UCard class="mt-3 p-6">
                      <BaseHeading size="md" weight="semibold" class="mb-4">Mission Stats</BaseHeading>
                      <div class="space-y-2">
                        <div class="grid grid-cols-2 gap-4">
                          <div class="flex items-center">
                            <Icon name="ph:users" class="text-gray-500 mr-2" />
                            <span>Total Participants</span>
                          </div>
                          <div class="text-right">30</div>

                          <div class="flex items-center">
                            <Icon name="ph:check-circle" class="text-success-500 mr-2" />
                            <span>Completed</span>
                          </div>
                          <div class="text-right">12</div>

                          <div class="flex items-center">
                            <Icon name="ph:play-circle" class="text-info-500 mr-2" />
                            <span>Active</span>
                          </div>
                          <div class="text-right">15</div>

                          <div class="flex items-center">
                            <Icon name="ph:clock" class="text-warning-500 mr-2" />
                            <span>Pending</span>
                          </div>
                          <div class="text-right">3</div>
                        </div>
                      </div>
                    </UCard>





                  </div>
                </div>
                <!-- mission manager board -->
                <div class="hidden col-span-12 sm:col-span-6">

                  <UCard rounded="md" elevated>
                    <div class="border-muted-200 dark:border-gray-900 mb-3 flex items-center gap-4 border-b pb-3">
                      <BaseAvatar src="https://api.schema.cx/storage/avatars/default.png" alt="Gitlab" size="md" rounded="none" mask="blob" class="bg-muted-100 dark:bg-muted-900" />
                      <div>
                        <BaseHeading weight="bold" size="md" lead="none" class="line-clamp-1 mb-1 text-red-400 dark:text-red-500">
                          interminable
                        </BaseHeading>
                        <BaseParagraph size="xs" class="text-gray-400 dark:text-gray-500 line-clamp-1">
                          Social Community Chief
                        </BaseParagraph>
                      </div>
                    </div>
                    <div class="mb-6 text-justify">
                      <BaseParagraph size="sm" class="text-muted-500 dark:text-gray-400">
                        Hello. This space is your go-to for the latest updates, tips, and highlights from our social
                        media
                        landscape.
                        <br><br>
                        I’ll regularly share insights and celebrate your impactful contributions as we expand the
                        horizons of what's
                        possible through our collective creativity and interactions.
                        <br><br>
                        Keep engaging, keep innovating, and let's continue to transform our digital world together.
                        <br><br>
                        <b>In code we trust</b><br>
                        <i>Social Community Chief</i>
                      </BaseParagraph>

                    </div>
                    <div>
                      <BaseButton variant="pastel" rounded="md" color="primary" class="!h-8 !font-semibold !text-xs mb-1 w-full">
                        View Profile
                      </BaseButton>
                    </div>
                  </UCard>
                </div>


                <!-- Mission Roles Squad -->
                <div class="col-span-12 sm:col-span-6">
                  <!-- Widget -->
                  <UCard v-if="mission.useMission.pending_users && mission.useMission.pending_users.length > 0" rounded="lg">
                    <!-- Title -->
                    <div class="mb-8 flex items-center justify-between">
                      <BaseHeading as="h3" size="sm" weight="bold" lead="tight" class="text-muted-800 dark:text-white mb-2">
                        <span>Pending Completion</span>
                      </BaseHeading>
                   <!--    <BaseButton color="primary" rounded="md" class="!h-6 !w-18 !font-semibold !text-xs mb-2">
                        View all
                      </BaseButton> -->
                    </div>
                    <MissionUsersListCompact :pendingUsers="mission.useMission.pending_users"  actions />
                  </UCard>

              <!-- Resources Section -->
<UCard v-if="mission.useMission.resources" class="mt-3">
    <BaseHeading size="md" weight="semibold" class="mb-4">Resources</BaseHeading>
    <ul class="space-y-2">
        <li v-for="resource in mission.useMission.resources" :key="resource.id">
            <div class="flex items-center">
                <Icon :name="resource.icon || (resource.type === 'pdf' ? 'ph:file-text' : 'ph:link')" class="text-gray-500 mr-2" />
                <BaseLink :href="resource.url" class="text-gray-500">
                    {{ resource.title }}
                </BaseLink>
            </div>
        </li>
    </ul>
</UCard>
                </div>


              </div>

            </div>
          </div>



        </template>
      </BaseTabs>
    </div>
  </div>
</template>

<style scoped>
.icon svg {
  width: 100%;
  height: 100%;
}

.icon .nui-icon-box.nui-box-md {
  height: 8rem;
  width: 8rem;
}

.dark-mode {
  background-color: #333;
  color: #fff;
}

.bg-white.dark:bg-muted-400 {
  transition: background-color 0.3s ease;
}

.missionTabs :deep(.nui-tabs-inner) {
  margin-top: 0.2rem !important;
  margin-bottom: 0.5rem !important;
  margin-left: 1rem;
}

.mission-details-page {
  max-width: 800px;
  margin: auto;
}

::v-deep(.nui-tabs.completed .nui-tabs-inner .nui-tab-item .i-ph\:check-circle-duotone) {
  color: green !important;
}
</style>
