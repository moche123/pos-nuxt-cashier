<script setup lang="ts">
import type { Category } from '~/types'

const repo = useRepository()
const { data: categories, refresh } = await useAsyncData('categories', () => repo.listCategories())

const newName = ref('')
const editId = ref<number | null>(null)
const editValue = ref('')
const saving = ref(false)

async function create() {
  if (!newName.value.trim()) return
  saving.value = true
  try {
    await repo.createCategory(newName.value)
    newName.value = ''
    await refresh()
  } finally {
    saving.value = false
  }
}

function edit(cat: Category) {
  editId.value = cat.id
  editValue.value = cat.name
}

async function save(id: number) {
  await repo.updateCategory(id, editValue.value)
  editId.value = null
  await refresh()
}

async function remove(id: number) {
  if (!confirm('Delete this category?')) return
  await repo.deleteCategory(id)
  await refresh()
}
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Categories</h1>

    <form class="flex gap-2 mb-6" @submit.prevent="create">
      <input v-model="newName" type="text" placeholder="New category"
        class="flex-1 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500" />
      <button type="submit" :disabled="saving" class="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 disabled:opacity-60">
        Add
      </button>
    </form>

    <div class="bg-white border border-slate-200 rounded-lg divide-y">
      <div v-for="cat in categories" :key="cat.id" class="flex items-center gap-2 px-4 py-3">
        <template v-if="editId === cat.id">
          <input v-model="editValue" type="text" class="flex-1 px-2 py-1 border border-slate-300 rounded" />
          <button class="text-sm text-brand-600 hover:underline" @click="save(cat.id)">Save</button>
          <button class="text-sm text-slate-500 hover:underline" @click="editId = null">Cancel</button>
        </template>
        <template v-else>
          <span class="flex-1 text-slate-700">{{ cat.name }}</span>
          <button class="text-sm text-brand-600 hover:underline" @click="edit(cat)">Edit</button>
          <button class="text-sm text-red-600 hover:underline" @click="remove(cat.id)">Delete</button>
        </template>
      </div>
      <p v-if="!categories?.length" class="px-4 py-6 text-sm text-slate-500">No categories yet.</p>
    </div>
  </div>
</template>
