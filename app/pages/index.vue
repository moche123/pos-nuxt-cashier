<script setup lang="ts">
const repo = useRepository()

const { data: categories } = await useAsyncData('dash-categories', () => repo.listCategories())
const { data: products } = await useAsyncData('dash-products', () => repo.listProducts())
const { data: customers } = await useAsyncData('dash-customers', () => repo.listCustomers())
const { data: sales } = await useAsyncData('dash-sales', () => repo.listSales())

const cards = computed(() => [
  { label: 'Sales', value: sales.value?.length ?? 0, to: '/sales' },
  { label: 'Products', value: products.value?.length ?? 0, to: '/products' },
  { label: 'Customers', value: customers.value?.length ?? 0, to: '/customers' },
  { label: 'Categories', value: categories.value?.length ?? 0, to: '/categories' }
])
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Dashboard</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NuxtLink v-for="card in cards" :key="card.label" :to="card.to"
        class="bg-white border border-slate-200 rounded-lg p-5 hover:border-brand-400 transition-colors">
        <p class="text-sm text-slate-500">{{ card.label }}</p>
        <p class="text-2xl font-semibold text-slate-800 mt-1">{{ card.value }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
