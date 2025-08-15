<template>
  <div class="mb-6">
    <div class="flex gap-3">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        class="flex-1 border-2 border-blue-200 rounded-xl px-6 py-3 bg-white/90 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-blue-400"
        placeholder="Add a new todo..."
      />
      <button
        @click="addTask"
        class="bg-pink-300 text-white rounded-xl px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    dateType: {
      type: String,
      required: true,
      validator: (value) => ['today', 'tomorrow'].includes(value)
    },
    placeholder: {
      type: String,
      default: 'Add a new todo...'
    }
  })

  const emit = defineEmits(['add-task'])

  const newTask = ref('')

  const addTask = () => {
    const text = newTask.value.trim()
    if (!text) return

    emit('add-task', text, props.dateType)
    newTask.value = ''
  }
</script>
