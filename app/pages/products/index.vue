<script setup lang="ts">
import type { Product } from '~/types'

const repo = useRepository()
const { data: products, refresh } = await useAsyncData('products', () => repo.listProducts())
const { data: categories } = await useAsyncData('products-categories', () => repo.listCategories())

const form = reactive({ name: '', price: 0, stock: 0, categoryId: '' })
const saving = ref(false)
const editId = ref<number | null>(null)
const editForm = reactive({ name: '', price: 0, stock: 0 })

function categoryName(id: number) {
  return categories.value?.find(c => c.id === id)?.name ?? '—'
}

async function create() {
  if (!form.name.trim() || !form.categoryId) return
  saving.value = true
  try {
    await repo.createProduct({ ...form, categoryId: Number(form.categoryId) })
    form.name = ''
    form.price = 0
    form.stock = 0
    form.categoryId = ''
    await refresh()
  } finally {
    saving.value = false
  }
}

function edit(p: Product) {
  editId.value = p.id
  editForm.name = p.name
  editForm.price = p.price
  editForm.stock = p.stock
}

async function save(id: number) {
  await repo.updateProduct(id, { ...editForm })
  editId.value = null
  await refresh()
}

async function remove(id: number) {
  if (!confirm('Delete this product?')) return
  await repo.deleteProduct(id)
  await refresh()
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Products</h1>

    <form class="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6 bg-white border border-slate-200 rounded-lg p-4" @submit.prevent="create">
      <input v-model="form.name" type="text" placeholder="Name" required
        class="px-3 py-2 border border-slate-300 rounded md:col-span-2" />
      <input v-model.number="form.price" type="number" step="0.01" min="0" placeholder="Price" required
        class="px-3 py-2 border border-slate-300 rounded" />
      <input v-model.number="form.stock" type="number" step="1" min="0" placeholder="Stock" required
        class="px-3 py-2 border border-slate-300 rounded" />
      <select v-model="form.categoryId" required class="px-3 py-2 border border-slate-300 rounded">
        <option value="" disabled>Category</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <button type="submit" :disabled="saving"
        class="md:col-span-5 px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 disabled:opacity-60">
        Add product
      </button>
    </form>

    <div class="bg-white border border-slate-200 rounded-lg overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-500 text-left">
          <tr>
            <th class="px-4 py-2 font-medium">Name</th>
            <th class="px-4 py-2 font-medium">Category</th>
            <th class="px-4 py-2 font-medium">Price</th>
            <th class="px-4 py-2 font-medium">Stock</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="p in products" :key="p.id">
            <td class="px-4 py-2">
              <input v-if="editId === p.id" v-model="editForm.name" class="px-2 py-1 border border-slate-300 rounded w-full" />
              <span v-else>{{ p.name }}</span>
            </td>
            <td class="px-4 py-2 text-slate-500">{{ categoryName(p.categoryId) }}</td>
            <td class="px-4 py-2">
              <input v-if="editId === p.id" v-model.number="editForm.price" type="number" step="0.01" class="px-2 py-1 border border-slate-300 rounded w-24" />
              <span v-else>$ {{ p.price.toFixed(2) }}</span>
            </td>
            <td class="px-4 py-2">
              <input v-if="editId === p.id" v-model.number="editForm.stock" type="number" class="px-2 py-1 border border-slate-300 rounded w-20" />
              <span v-else>{{ p.stock }}</span>
            </td>
            <td class="px-4 py-2 text-right whitespace-nowrap">
              <template v-if="editId === p.id">
                <button class="text-sm text-brand-600 hover:underline mr-2" @click="save(p.id)">Save</button>
                <button class="text-sm text-slate-500 hover:underline" @click="editId = null">Cancel</button>
              </template>
              <template v-else>
                <button class="text-sm text-brand-600 hover:underline mr-2" @click="edit(p)">Edit</button>
                <button class="text-sm text-red-600 hover:underline" @click="remove(p.id)">Delete</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!products?.length" class="px-4 py-6 text-sm text-slate-500">No products yet.</p>
    </div>
  </div>
</template>
