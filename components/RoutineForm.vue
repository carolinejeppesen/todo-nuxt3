<script setup>
const props = defineProps({
  editingRoutine: { type: Object, default: null },
  editingCategoryName: { type: String, default: "" },
});

const emit = defineEmits(["save", "cancel"]);

const categoryName = ref(props.editingCategoryName || "");
const routineName = ref(props.editingRoutine?.name || "");
const taskTexts = ref(
  props.editingRoutine ? props.editingRoutine.tasks.map((t) => t.text) : [""]
);

watch(
  () => props.editingRoutine,
  (newRoutine) => {
    if (newRoutine) {
      categoryName.value = props.editingCategoryName || "";
      routineName.value = newRoutine.name || "";
      taskTexts.value = newRoutine.tasks.map((t) => t.text);
    } else {
      categoryName.value = "";
      routineName.value = "";
      taskTexts.value = [""];
    }
  },
  { immediate: true }
);

watch(
  () => props.editingCategoryName,
  (newCategoryName) => {
    if (newCategoryName) {
      categoryName.value = newCategoryName;
    }
  }
);

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
  <div class="mt-6 bg-white/60 rounded-2xl p-6 border border-blue-100">
    <h3 class="text-xl font-medium text-gray-800 mb-6">
      {{ editingRoutine ? "Edit Routine" : "Create Routine" }}
    </h3>

    <div class="space-y-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Category</label
        >
        <input
          v-model="categoryName"
          class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-blue-400"
          placeholder="Category (e.g. Gym, Work, Personal)"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Routine Name</label
        >
        <input
          v-model="routineName"
          class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-blue-400"
          placeholder="Routine name (e.g. Morning Workout, Daily Standup)"
        />
      </div>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-3">Tasks</label>
      <div class="space-y-3">
        <div
          v-for="(t, i) in taskTexts"
          :key="i"
          class="flex items-center gap-3 group"
        >
          <div class="flex-1">
            <input
              v-model="taskTexts[i]"
              class="w-full border-2 border-blue-200 rounded-xl px-4 py-3 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-blue-400"
              :placeholder="`Task ${i + 1} (e.g. 10 push-ups, Review code)`"
            />
          </div>
          <button
            class="p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 opacity-0 group-hover:opacity-100"
            @click="removeTaskField(i)"
            :disabled="taskTexts.length === 1"
            title="Remove this task"
          >
            🗑️
          </button>
        </div>

        <button
          class="w-full bg-white hover:bg-blue-50 text-blue-700 border-2 border-dashed border-blue-300 rounded-xl px-4 py-3 font-medium transition-all duration-200"
          @click="addTaskField"
        >
          Add another task
        </button>
      </div>
    </div>

    <div class="flex gap-3 pt-4 border-t border-blue-100">
      <button
        class="flex-1 bg-green-100 text-green-600 rounded-xl px-6 py-3 font-medium transition-all duration-200 transform hover:scale-105"
        @click="onSave"
      >
        {{ editingRoutine ? "Update routine" : "Save routine" }}
      </button>
      <button
        class="px-6 py-3 bg-gre-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
