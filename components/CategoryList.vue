<script setup>
const props = defineProps({
  categories: { type: Array, required: true }
})

const emit = defineEmits(['add-to-today'])
</script>

<template>
  <div class="mt-6 space-y-6">
    <div v-for="cat in categories" :key="cat.id" class="border rounded p-4">
      <h3 class="text-lg font-semibold">{{ cat.name }}</h3>

      <ul class="mt-3 space-y-4">
        <li v-for="routine in cat.routines" :key="routine.id" class="border rounded p-3">
          <div class="flex items-center justify-between">
            <div class="font-medium">{{ routine.name }}</div>
            <button
              class="px-3 py-1 bg-gray-200 rounded"
              @click="$emit('add-to-today', routine)"
            >
              + Add to today’s todos
            </button>
          </div>

          <ul class="mt-2 list-disc ml-6">
            <li v-for="task in routine.tasks" :key="task.id">{{ task.text }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <p v-if="!categories || categories.length === 0" class="text-gray-500">
      No routines yet
    </p>
  </div>
</template>
