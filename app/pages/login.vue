<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    await navigateTo('/')
  } catch {
    error.value = 'Wrong email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="w-full max-w-sm bg-white p-8 rounded-lg shadow-sm border border-slate-200" @submit.prevent="onSubmit">
    <h1 class="text-xl font-semibold text-slate-800 mb-1">POS</h1>
    <p class="text-sm text-slate-500 mb-6">Sign in to your account.</p>

    <p v-if="config.public.dataMode === 'local'" class="text-xs bg-brand-50 text-brand-700 rounded px-3 py-2 mb-4">
      Demo mode (no backend): use <strong>demo@example.com</strong> / <strong>demo1234</strong>
    </p>

    <label class="block text-sm font-medium text-slate-600 mb-1" for="email">Email</label>
    <input id="email" v-model="email" type="email" required
      class="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500" />

    <label class="block text-sm font-medium text-slate-600 mb-1" for="password">Password</label>
    <input id="password" v-model="password" type="password" required
      class="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500" />

    <p v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</p>

    <button type="submit" :disabled="loading"
      class="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded font-medium disabled:opacity-60">
      {{ loading ? 'Signing in…' : 'Sign in' }}
    </button>

    <p class="text-sm text-slate-500 mt-4 text-center">
      Don't have an account?
      <NuxtLink to="/register" class="text-brand-600 hover:underline">Register</NuxtLink>
    </p>
  </form>
</template>
