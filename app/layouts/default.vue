<script setup lang="ts">
const auth = useAuthStore()

const links = [
  { to: '/', label: 'Home' },
  { to: '/sales', label: 'Sales' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/customers', label: 'Customers' },
  { to: '/receipts', label: 'Receipts' }
]

function onLogout() {
  auth.logout()
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <nav class="flex items-center gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="px-3 py-2 rounded text-sm font-medium text-slate-600 hover:bg-slate-100"
            active-class="!text-brand-700 bg-brand-50"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-3 text-sm">
          <span v-if="auth.user" class="text-slate-500">{{ auth.user.username }}</span>
          <button class="px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700" @click="onLogout">
            Log out
          </button>
        </div>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>
