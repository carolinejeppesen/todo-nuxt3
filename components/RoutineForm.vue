<script setup>
const emit = defineEmits(['save', 'cancel'])

const categoryName = ref()
const routineName = ref('')
const taskTexts = ref([''])

const addTaskField = () => taskTexts.value.push('')
const removeTaskField = (i) => {
  taskTexts.value.splice(i, 1)
  if (taskTexts.value.length === 0) taskTexts.value.push('')
}

const onSave = () => {
  emit('save', {
    categoryName: categoryName.value,
    routineName: routineName.value,
    taskTexts: taskTexts.value
  })
  categoryName.value = ''
  routineName.value = ''
  taskTexts.value = ['']
}
</script>

<template>
  <div class="mt-4 p-4 border rounded space-y-3">
    <div class="grid gap-2">
      <input
        v-model="categoryName"
        class="border rounded px-3 py-2"
        placeholder="Category (e.g. Gym)"
      />
      <input
        v-model="routineName"
        class="border rounded px-3 py-2"
        placeholder="Routine name (e.g. Leg Day)"
      />
    </div>

    <div class="space-y-2">
      <div
        v-for="(t, i) in taskTexts"
        :key="i"
        class="flex items-center gap-2"
      >
        <input
          v-model="taskTexts[i]"
          class="flex-1 border rounded px-3 py-2"
          placeholder="Task (e.g. Squats)"
        />
        <button
          class="px-2 py-1 border rounded"
          @click="removeTaskField(i)"
          :disabled="taskTexts.length === 1"
          title="Remove this task"
        >−</button>
      </div>

      <button class="mt-1 px-3 py-1 border rounded" @click="addTaskField">
        + Add task
      </button>
    </div>

    <div class="flex gap-2">
      <button class="bg-green-300 px-3 py-1 rounded" @click="onSave">Save routine</button>
      <button class="px-3 py-1 border rounded" @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>
