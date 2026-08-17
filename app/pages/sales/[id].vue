<script setup lang="ts">
const route = useRoute()
const saleId = Number(route.params.id)
const repo = useRepository()

const { data: sales, refresh: refreshSales } = await useAsyncData('sale-detail-sales', () => repo.listSales())
const { data: products } = await useAsyncData('sale-detail-products', () => repo.listProducts())
const { data: customers } = await useAsyncData('sale-detail-customers', () => repo.listCustomers())
const { data: receipts, refresh: refreshReceipts } = await useAsyncData('sale-detail-receipts', () => repo.listReceipts())

const sale = computed(() => sales.value?.find(s => s.id === saleId))
const customer = computed(() => customers.value?.find(c => c.id === sale.value?.customerId))
const items = computed(() => receipts.value?.filter(r => r.saleId === saleId) ?? [])

function productName(id: number) {
  return products.value?.find(p => p.id === id)?.name ?? '—'
}
function productPrice(id: number) {
  return products.value?.find(p => p.id === id)?.price ?? 0
}

const productId = ref('')
const quantity = ref(1)
const saving = ref(false)

async function addItem() {
  if (!productId.value || quantity.value < 1) return
  saving.value = true
  try {
    await repo.createReceipt({ productId: Number(productId.value), quantity: quantity.value, saleId })
    productId.value = ''
    quantity.value = 1
    await refreshReceipts()
  } finally {
    saving.value = false
  }
}

async function removeItem(id: number) {
  await repo.deleteReceipt(id)
  await refreshReceipts()
}

const computedTotal = computed(() =>
  items.value.reduce((sum, item) => sum + item.quantity * productPrice(item.productId), 0)
)

async function saveTotal() {
  await repo.updateSaleTotal(saleId, computedTotal.value)
  await refreshSales()
}
</script>

<template>
  <div>
    <NuxtLink to="/sales" class="text-sm text-brand-600 hover:underline">← Sales</NuxtLink>

    <div v-if="sale" class="mt-3">
      <h1 class="text-xl font-semibold text-slate-800">Sale #{{ sale.id }}</h1>
      <p class="text-sm text-slate-500 mb-6">Customer: {{ customer?.name ?? '—' }} · Recorded total: $ {{ Number(sale.total).toFixed(2) }}</p>

      <form class="flex flex-wrap gap-2 mb-6 bg-white border border-slate-200 rounded-lg p-4" @submit.prevent="addItem">
        <select v-model="productId" required class="flex-1 min-w-[200px] px-3 py-2 border border-slate-300 rounded">
          <option value="" disabled>Product</option>
          <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} — $ {{ p.price.toFixed(2) }}</option>
        </select>
        <input v-model.number="quantity" type="number" min="1" class="w-24 px-3 py-2 border border-slate-300 rounded" />
        <button type="submit" :disabled="saving" class="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 disabled:opacity-60">
          Add item
        </button>
      </form>

      <div class="bg-white border border-slate-200 rounded-lg overflow-x-auto mb-4">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th class="px-4 py-2 font-medium">Product</th>
              <th class="px-4 py-2 font-medium">Quantity</th>
              <th class="px-4 py-2 font-medium">Subtotal</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="item in items" :key="item.id">
              <td class="px-4 py-2">{{ productName(item.productId) }}</td>
              <td class="px-4 py-2">{{ item.quantity }}</td>
              <td class="px-4 py-2">$ {{ (item.quantity * productPrice(item.productId)).toFixed(2) }}</td>
              <td class="px-4 py-2 text-right">
                <button class="text-sm text-red-600 hover:underline" @click="removeItem(item.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!items.length" class="px-4 py-6 text-sm text-slate-500">No items yet.</p>
      </div>

      <div class="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4">
        <p class="text-slate-700">Computed total: <span class="font-semibold">$ {{ computedTotal.toFixed(2) }}</span></p>
        <button class="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700" @click="saveTotal">
          Save total on sale
        </button>
      </div>
    </div>

    <p v-else class="mt-6 text-sm text-slate-500">Sale not found.</p>
  </div>
</template>
