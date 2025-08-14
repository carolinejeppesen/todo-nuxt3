<template>
  <li class="group hover:bg-blue-25 transition-all duration-200 p-4">
    <div class="flex items-center gap-4">
      <label class="flex items-center cursor-pointer">
        <input
          type="checkbox"
          :checked="task.done"
          @change="$emit('toggle', task)"
          class="w-5 h-5"
        />
      </label>
      
      <div class="flex-1 min-w-0">
        <input
          v-if="task.editing"
          v-model="task.text"
          ref="inputEl"
          @blur="$emit('doneEditing', task.id)"
          @keyup.enter="$emit('doneEditing', task.id)"
          class="w-full px-4 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl transition-all duration-200 font-medium text-gray-800"
        />
        <span
          v-else
          :class="{ 
            'line-through text-gray-400 font-light': task.done,
            'text-gray-800 font-light': !task.done
          }"
          class="block cursor-pointer px-3 py-2 rounded-xl hover:bg-yellow-50 transition-all duration-200 break-words"
          @click="$emit('edit', task.id)"
        >
          {{ task.text }}
        </span>
      </div>

      <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          @click="$emit('delete', task.id)"
          class="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
    task: { type: Object, required: true },
})

const inputEl = ref(null)
watch(() => props.task.editing, async (isEditing) => {
    if (isEditing) {
        await nextTick()
        inputEl.value?.focus()
    }
})
</script>
