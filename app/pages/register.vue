<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const auth = useAuthStore()
const username = ref('')
const email = ref('')
const password = ref('')
const type = ref('cashier')
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.register({ username: username.value, email: email.value, password: password.value, type: type.value })
    await navigateTo('/')
  } catch {
    error.value = 'Could not create the account, please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="w-full max-w-sm bg-white p-8 rounded-lg shadow-sm border border-slate-200" @submit.prevent="onSubmit">
    <h1 class="text-xl font-semibold text-slate-800 mb-1">Create account</h1>
    <p class="text-sm text-slate-500 mb-6">Register to use the POS.</p>

    <label class="block text-sm font-medium text-slate-600 mb-1" for="username">Username</label>
    <input id="username" v-model="username" type="text" required
      class="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500" />

    <label class="block text-sm font-medium text-slate-600 mb-1" for="email">Email</label>
    <input id="email" v-model="email" type="email" required
      class="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500" />

    <label class="block text-sm font-medium text-slate-600 mb-1" for="password">Password</label>
    <input id="password" v-model="password" type="password" required
      class="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500" />

    <label class="block text-sm font-medium text-slate-600 mb-1" for="type">Role</label>
    <select id="type" v-model="type"
      class="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500">
      <option value="cashier">Cashier</option>
      <option value="admin">Administrator</option>
    </select>

    <p v-if="error" class="text-sm text-red-600 mb-4">{{ error }}</p>

    <button type="submit" :disabled="loading"
      class="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded font-medium disabled:opacity-60">
      {{ loading ? 'Creating…' : 'Create account' }}
    </button>

    <p class="text-sm text-slate-500 mt-4 text-center">
      Already have an account?
      <NuxtLink to="/login" class="text-brand-600 hover:underline">Sign in</NuxtLink>
    </p>
  </form>
</template>
