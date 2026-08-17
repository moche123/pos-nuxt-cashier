<script setup lang="ts">
const repo = useRepository()
const { data: receipts, refresh } = await useAsyncData('receipts', () => repo.listReceipts())
const { data: products } = await useAsyncData('receipts-products', () => repo.listProducts())

function productName(id: number) {
  return products.value?.find(p => p.id === id)?.name ?? '—'
}

async function remove(id: number) {
  if (!confirm('Delete this receipt?')) return
  await repo.deleteReceipt(id)
  await refresh()
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Receipts</h1>

    <div class="bg-white border border-slate-200 rounded-lg overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-500 text-left">
          <tr>
            <th class="px-4 py-2 font-medium">Sale</th>
            <th class="px-4 py-2 font-medium">Product</th>
            <th class="px-4 py-2 font-medium">Quantity</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="r in receipts" :key="r.id">
            <td class="px-4 py-2">
              <NuxtLink :to="`/sales/${r.saleId}`" class="text-brand-600 hover:underline">#{{ r.saleId }}</NuxtLink>
            </td>
            <td class="px-4 py-2">{{ productName(r.productId) }}</td>
            <td class="px-4 py-2">{{ r.quantity }}</td>
            <td class="px-4 py-2 text-right">
              <button class="text-sm text-red-600 hover:underline" @click="remove(r.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!receipts?.length" class="px-4 py-6 text-sm text-slate-500">No receipts yet.</p>
    </div>
  </div>
</template>
