<script setup>
const props = defineProps({
  editingRoutine: { type: Object, default: null },
  editingCategoryName: { type: String, default: "" },
});

const emit = defineEmits(["save", "cancel"]);

const categoryName = ref(props.editingCategoryName || '');
const routineName = ref(props.editingRoutine?.name || '');
const taskTexts = ref(props.editingRoutine ? props.editingRoutine.tasks.map(t => t.text) : ['']);

// Watch for prop changes to update the form when editing
watch(() => props.editingRoutine, (newRoutine) => {
  if (newRoutine) {
    categoryName.value = props.editingCategoryName || '';
    routineName.value = newRoutine.name || '';
    taskTexts.value = newRoutine.tasks.map(t => t.text);
  } else {
    categoryName.value = '';
    routineName.value = '';
    taskTexts.value = [''];
  }
}, { immediate: true });

watch(() => props.editingCategoryName, (newCategoryName) => {
  if (newCategoryName) {
    categoryName.value = newCategoryName;
  }
});

const addTaskField = () => taskTexts.value.push("");
const removeTaskField = (i) => {
  taskTexts.value.splice(i, 1);
  if (taskTexts.value.length === 0) taskTexts.value.push("");
};

const onSave = () => {
  emit("save", {
    categoryName: categoryName.value,
    routineName: routineName.value,
    taskTexts: taskTexts.value,
    isEditing: !!props.editingRoutine,
    routineId: props.editingRoutine?.id,
  });
  if (!props.editingRoutine) {
    categoryName.value = "";
    routineName.value = "";
    taskTexts.value = [""];
  }
};

</script>

<template>
  <div class="mt-4 p-4 border rounded space-y-3">
    <h3 v-if="editingRoutine" class="text-lg font-semibold">Edit Routine</h3>
    <h3 v-else class="text-lg font-semibold">Add Routine Template</h3>
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
      <div v-for="(t, i) in taskTexts" :key="i" class="flex items-center gap-2">
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
        >
          −
        </button>
      </div>

      <button class="mt-1 px-3 py-1 border rounded" @click="addTaskField">
        + Add task
      </button>
    </div>

    <div class="flex gap-2">
      <button class="bg-green-300 px-3 py-1 rounded" @click="onSave">
        {{ editingRoutine ? 'Update routine' : 'Save routine' }}
      </button>
      <button class="px-3 py-1 border rounded" @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </div>
</template>
