<template>
  <li>
    <input
      type="checkbox"
      :checked="task.done"
      @change="$emit('toggle', task)"
    />
    <input
      v-if="task.editing"
      v-model="task.text"
      :ref="inputEl"
      @blur="$emit('doneEditing', task.id)"
      @keyup.enter="$emit('doneEditing', task.id)"
      class="flex-1 px-2 py-1 border border-yellow-500 bg-yellow-100 rounded focus:outline-none"
    />
    <span
      v-else
      :class="{ 'line-through text-gray-400': task.done }"
      class="flex-1 cursor-pointer"
    >
      {{ task.text }}
    </span>

    <button
      @click="$emit('edit', task.id)"
      class="text-blue-500 hover:text-blue-700"
    >
      ✏️
    </button>
    <button @click="$emit('delete', task.id)">X</button>
  </li>
</template>

<script setup>
const props = defineProps({
    task: { type: Object, required: true },
    finished: { type: Boolean, default: false },
})

const inputEl = ref(null)
watch(() => props.task.editing, async (isEditing) => {
    if (isEditing) {
        await nextTick()
        inputEl.value?.focus()
    }
})
</script>
