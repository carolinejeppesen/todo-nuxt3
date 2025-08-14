<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
});

const emit = defineEmits([
  "add-to-today",
  "edit-routine",
  "delete-category",
  "delete-routine",
  "delete-task",
]);
</script>

<template>
  <div class="mt-6 space-y-6">
    <div
      v-for="cat in categories"
      :key="cat.id"
          >
      <div class="py-4 border-b border-gray-200">
        <div class="flex items-center justify-between group">
          <h3 class="text-xl font-medium text-gray-800 flex items-center gap-2">
            {{ cat.name }}
            <span
              class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ cat.routines.length }} routines
            </span>
          </h3>
          <button
            @click="$emit('delete-category', cat.id)"
            class="text-red-500 hover:text-red-700 hover:bg-red-100 px-3 py-2 rounded-lg transition-all duration-200 font-medium opacity-0 group-hover:opacity-100"
            title="Delete category"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="p-6">
        <ul class="space-y-4">
          <li
            v-for="routine in cat.routines"
            :key="routine.id"
            class="border border-gray-200 rounded-xl group"
          >
            <div class="flex items-center justify-between border-b border-gray-200 p-3">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <h4 class="font-medium text-gray-800 text-lg break-words">
                    {{ routine.name }}
                  </h4>
                  <span
                    class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ routine.tasks.length }} tasks
                  </span>
                </div>
              </div>

              <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  class="hover:bg-green-100 px-3 py-2 rounded-lg transition-all duration-200"
                  @click="$emit('add-to-today', routine)"
                >
                  ➕
                </button>
                <button
                  @click="$emit('edit-routine', cat.id, routine.id)"
                  class="hover:bg-orange-100 px-3 py-2 rounded-lg transition-all duration-200"
                  title="Edit routine"
                >
                  ✏️
                </button>
                <button
                  @click="$emit('delete-routine', cat.id, routine.id)"
                  class="hover:bg-red-100 px-3 py-2 rounded-lg transition-all duration-200"
                  title="Delete routine"
                >
                  🗑️
                </button>
              </div>
            </div>

            <ul class="divide-y divide-gray-200">
              <li
                v-for="task in routine.tasks"
                :key="task.id"
                class="flex items-center justify-between px-3 py-3 group"
              >
                <span class="text-gray-700 font-light break-words flex-1">
                  {{ task.text }}
                </span>
                <button
                  @click="$emit('delete-task', cat.id, routine.id, task.id)"
                  class="text-red-400 hover:text-red-600 hover:bg-red-100 px-2 py-1 rounded transition-all duration-200 ml-2 opacity-0 group-hover:opacity-100"
                  title="Delete task"
                >
                  🗑️
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="!categories || categories.length === 0"
      class="bg-white/60 rounded-2xl border border-blue-100 p-8 text-center"
    >
      <p class="text-gray-500 text-lg font-medium">No routine templates yet</p>
      <p class="text-gray-400 text-sm mt-2">
        Create your first routine template to get started!
      </p>
    </div>
  </div>
</template>
