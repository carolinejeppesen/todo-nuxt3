<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
});

const emit = defineEmits(["add-to-today", "edit-routine", "delete-category", "delete-routine", "delete-task"]);
</script>

<template>
  <div class="mt-6 space-y-6">
    <div v-for="cat in categories" :key="cat.id" class="border rounded p-4">
      <h3 class="text-lg font-semibold">{{ cat.name }}</h3>
      <button
        @click="$emit('delete-category', cat.id)"
        class="text-red-500 hover:text-red-700 ml-2"
        title="Delete category"
      >
        Delete Category
      </button>
      <ul class="mt-3 space-y-4">
        <li
          v-for="routine in cat.routines"
          :key="routine.id"
          class="border rounded p-3"
        >
          <button
            @click="$emit('delete-routine', cat.id, routine.id)"
            class="text-red-500 hover:text-red-700 ml-2"
            title="Delete routine"
          >
            Delete routine
          </button>
          <button
            @click="$emit('edit-routine', cat.id, routine.id)"
            class="ml-2 px-3 py-1 bg-gray-200 rounded"
            title="Edit routine">
            Edit routine
          </button>
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
            <li v-for="task in routine.tasks" :key="task.id">
              {{ task.text }}
              <button
                @click="$emit('delete-task', cat.id, routine.id, task.id)"
                class="text-red-500 hover:text-red-700 ml-2"
                title="Delete task"
              >
                Delete task
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <p v-if="!categories || categories.length === 0" class="text-gray-500">
      No routines yet
    </p>
  </div>
</template>
