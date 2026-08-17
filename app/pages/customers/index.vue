<script setup lang="ts">
import type { Customer } from '~/types'

const repo = useRepository()
const { data: customers, refresh } = await useAsyncData('customers', () => repo.listCustomers())

const form = reactive({ name: '', documentId: '' })
const saving = ref(false)
const search = ref('')
const result = ref<Customer[] | null>(null)
const searching = ref(false)

async function create() {
  if (!form.name.trim() || !form.documentId.trim()) return
  saving.value = true
  try {
    await repo.createCustomer({ ...form })
    form.name = ''
    form.documentId = ''
    await refresh()
  } finally {
    saving.value = false
  }
}

async function runSearch() {
  if (!search.value.trim()) {
    result.value = null
    return
  }
  searching.value = true
  try {
    result.value = await repo.findCustomerByDocument(search.value)
  } finally {
    searching.value = false
  }
}

const listed = computed(() => result.value ?? customers.value ?? [])
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Customers</h1>

    <form class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 bg-white border border-slate-200 rounded-lg p-4" @submit.prevent="create">
      <input v-model="form.name" type="text" placeholder="Name" required class="px-3 py-2 border border-slate-300 rounded" />
      <input v-model="form.documentId" type="text" placeholder="Document ID" maxlength="8" required class="px-3 py-2 border border-slate-300 rounded" />
      <button type="submit" :disabled="saving" class="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 disabled:opacity-60">
        Add customer
      </button>
    </form>

    <form class="flex gap-2 mb-6" @submit.prevent="runSearch">
      <input v-model="search" type="text" placeholder="Search by document ID"
        class="flex-1 px-3 py-2 border border-slate-300 rounded" />
      <button type="submit" :disabled="searching" class="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 disabled:opacity-60">
        Search
      </button>
      <button v-if="result" type="button" class="px-3 py-2 text-sm text-slate-500 hover:underline" @click="result = null; search = ''">
        Clear
      </button>
    </form>

    <div class="bg-white border border-slate-200 rounded-lg divide-y">
      <div v-for="c in listed" :key="c.id" class="flex items-center gap-4 px-4 py-3">
        <span class="flex-1 text-slate-700">{{ c.name }}</span>
        <span class="text-sm text-slate-500">ID {{ c.documentId }}</span>
      </div>
      <p v-if="!listed.length" class="px-4 py-6 text-sm text-slate-500">No customers.</p>
    </div>
  </div>
</template>
