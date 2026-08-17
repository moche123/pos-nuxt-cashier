<script setup lang="ts">
const repo = useRepository()
const { data: sales, refresh } = await useAsyncData('sales', () => repo.listSales())
const { data: customers } = await useAsyncData('sales-customers', () => repo.listCustomers())

const customerId = ref('')
const saving = ref(false)

function customerName(id: number) {
  return customers.value?.find(c => c.id === id)?.name ?? '—'
}

async function create() {
  if (!customerId.value) return
  saving.value = true
  try {
    const sale = await repo.createSale(Number(customerId.value))
    await navigateTo(`/sales/${sale.id}`)
  } finally {
    saving.value = false
  }
}

async function remove(id: number) {
  if (!confirm('Delete this sale?')) return
  await repo.deleteSale(id)
  await refresh()
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Sales</h1>

    <form class="flex gap-2 mb-6" @submit.prevent="create">
      <select v-model="customerId" required class="flex-1 px-3 py-2 border border-slate-300 rounded">
        <option value="" disabled>Select a customer</option>
        <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }} (ID {{ c.documentId }})</option>
      </select>
      <button type="submit" :disabled="saving" class="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 disabled:opacity-60">
        New sale
      </button>
    </form>

    <div class="bg-white border border-slate-200 rounded-lg overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-500 text-left">
          <tr>
            <th class="px-4 py-2 font-medium">#</th>
            <th class="px-4 py-2 font-medium">Customer</th>
            <th class="px-4 py-2 font-medium">Total</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="s in sales" :key="s.id">
            <td class="px-4 py-2">{{ s.id }}</td>
            <td class="px-4 py-2">{{ customerName(s.customerId) }}</td>
            <td class="px-4 py-2">$ {{ Number(s.total).toFixed(2) }}</td>
            <td class="px-4 py-2 text-right whitespace-nowrap">
              <NuxtLink :to="`/sales/${s.id}`" class="text-sm text-brand-600 hover:underline mr-2">View</NuxtLink>
              <button class="text-sm text-red-600 hover:underline" @click="remove(s.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!sales?.length" class="px-4 py-6 text-sm text-slate-500">No sales yet.</p>
    </div>
  </div>
</template>
