<template>
  <div class="mb-8">
    <h2 class="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
      {{ title }}
      <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
        {{ tasks.length }}
      </span>
    </h2>
    <div class="rounded-2xl border border-gray-200 overflow-hidden">
      <ul v-if="tasks.length > 0" class="divide-y divide-gray-200">
        <TaskRow
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle="$emit('toggle', $event)"
          @edit="$emit('edit', $event)"
          @doneEditing="$emit('doneEditing', $event)"
          @delete="$emit('delete', $event)"
        />
      </ul>
      <p v-else class="text-blue-400 text-center py-8 italic">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  emptyMessage: {
    type: String,
    default: 'No active tasks yet'
  }
})

const emit = defineEmits(['toggle', 'edit', 'doneEditing', 'delete'])
</script>