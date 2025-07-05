<script setup lang="ts">
//import { useAuthStore } from '@/base/stores/auth';
//import { authFormSuite } from '@/base/validation/authForm'; // Import the validation suite
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
  requiresAuth: false
})

useSeoMeta({
  title: 'Login - Schema Network',
  description: 'Access your Schema Network account to join the decentralized collaboration platform.',
  ogImage: '/images/auth-og.jpg'
})

const config = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();
const api = useApiService();
const { t } = useI18n();
const toast = useToast();

const form = ref(null);
const providers = ref<Provider[]>(config.public.providers as Provider[]);

// Form fields
const fields = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    autocomplete: 'email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    autocomplete: 'current-password',
  },
];

//https://vestjs.dev/


/* const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
} */
/* const isBlockchainVerified = ref(false)

watchEffect(async () => {
  if (authStore.user?.walletAddress) {
    isBlockchainVerified.value = await verifyBlockchainIdentity(
      authStore.user.walletAddress
    )
  }
}) */

type Provider = {
  key: string; // Unique identifier for the provider
  name: string;
  icon: string;
  color: string;
  click: () => void; // Function for handling login
  loading?: boolean; // Optional loading state
};



// Validation function
/* const validate = async (state: Record<string, any>) => {
  const result = authFormSuite(state);
  if (result.hasErrors()) {
    return Object.entries(result.getErrors()).flatMap(([fieldName, errors]) =>
      errors.map((message) => ({ path: fieldName, message }))
    );
  }
  return [];
};
 */

// Update onSubmit to use emitted form data
const onSubmit = async (formData: { email: string; password: string }): Promise<void> => {
  // Clear previous errors
 /*  form.value?.setErrors({}); */

  // Manual client-side validations
  if (!formData.email) {
    toast.add({
      title: 'Email is required',
      description: 'Please enter your email address.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
    });
    return;
  }

  // Simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.add({
      title: 'Invalid email format',
      description: 'The email field must be a valid email address.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
    });
    return;
  }

  if (!formData.password) {
    toast.add({
      title: 'Password is required',
      description: 'Please enter your password.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
    });
    return;
  }

  // Proceed to API call
 // Proceed to API call
 try {
    const response = await authStore.login(formData.email, formData.password);

    // Check for response errors
    if (response.ok) {
      toast.add({
        title: 'Login successful',
        description: 'You are now logged in.',
        color: 'green',
        icon: 'i-heroicons-check-circle',
      });
      await router.push('/dash');
    } else {
      // Map API response errors to form fields
      response.errors.forEach((err: { path: string; message: string }) => {
        form.value?.setErrors({
          [err.path]: err.message,
        });
      });

      // Display a toaster for the general message
      toast.add({
        title: 'Login failed',
        description: response.message,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle',
      });
    }
  } catch (error: any) {
    toast.add({
      title: 'Login Failed',
      description: 'These credentials do not match our records.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
    });
    console.error('Login error:', error.message);
  }
};

async function handleMessage(event: { data: any }): Promise<void> {
  const provider = event.data.provider as string;

  if (Object.keys(providers.value).includes(provider) && event.data.token) {
    providers.value[provider].loading = false;
    authStore.token = event.data.token;

    //await authStore.fetchUser();
    await router.push('/dash');
  } else if (event.data.message) {
/*     toast.add({
      title: 'An unexpected error occurred',
      description: event.data.message,
      color: 'red',
    }); */
    throw new Error(event.data.message ?? 'An unexpected error occurred');
  }
}

function loginVia(providerId: string): void {
  const provider = providers.value.find((p) => p.key === providerId);
  if (!provider) return;

  provider.loading = true;

  const popup = window.open(
    `${config.public.apiBaseUrl}${config.public.apiPrefix}/login/${providerId}/redirect`,
    'SchemaNetworkAuth',
    'width=500,height=600'
  );

  const interval = setInterval(() => {
    if (!popup || popup.closed) {
      clearInterval(interval);
      provider.loading = false;
    }
  }, 500);
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
  //console.log('Loaded providers:', config.public.providers);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});

const handleProviderLogin = (provider: string): void => {
  loginVia(provider);
};

</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
    <div class="h-screen flex items-center justify-center overlay">
      <div class="gradient" />
<!--    dark:bg-sblack-600 -->
<UCard 
  class="max-w-sm w-full bg-white/75 dark:bg-slate-400/5 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 isolate aspect-video shadow-lg dark:!ring-gray-800/70
         max-md:h-[100dvh] max-md:w-full max-md:rounded-none max-md:shadow-none max-md:aspect-auto">
    <AuthForm
      title="Schema Network"
      align="top"
      ref="form"
      @provider="handleProviderLogin"
      :fields="fields"
      :providers="providers"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{
        trailingIcon: 'i-heroicons-arrow-right-20-solid',
        label: 'Sign in',
      }"
      @submit="onSubmit"
    >
      <template #description>
        <div class="space-y-2">
          <p>Login with social media or credentials</p>
 <!--          <UAlert
            v-if="error"
            :title="error"
            icon="i-heroicons-exclamation-triangle"
            color="red"
            variant="soft"
          /> -->
        </div>
      </template>

      <template #footer>
        <div class="mt-6 space-y-4">
          <UDivider label="Need help?" />
          <div class="flex justify-between text-xs">
            <NuxtLink
              to="/auth/recover"
              class="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              {{ t('auth.forgot_password') }}
            </NuxtLink>
            <NuxtLink
              to="/auth/signup"
              class="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              {{ t('auth.signup') }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </AuthForm>
  </UCard>
</div>
</template>
<style scoped>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgb(var(--color-primary-500) / 0.25) 0, #FFF 100%);
}

.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%, rgb(255 255 255 / 5%) 0, rgb(var(--color-gray-950)) 100%)
  }
}

.overlay {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px);
}
.dark {
  .overlay {
    background-image:
      linear-gradient(to right, rgb(var(--color-sblack-700)) 0.5px, transparent 0.5px),
      linear-gradient(to bottom, rgb(var(--color-sblack-700)) 0.5px, transparent 0.5px);
  }
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
