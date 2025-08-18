<template>
  <div class="mb-8">
    <div class="flex items-center gap-2">
      <button
        class="bg-pink-300 text-white rounded-xl px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        @click="collapsed = !collapsed"
      >
        {{ collapsed ? "Routines" : "Hide Routines" }}
      </button>
    </div>

    <div v-if="!collapsed">
      <h2 class="text-2xl mt-8 mb-4 font-medium text-gray-800 flex-1">
        Routine Templates
      </h2>
      <button
        class="bg-pink-300 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        @click="showRoutineForm = !showRoutineForm"
      >
        {{ showRoutineForm ? "Close form" : "Create" }}
      </button>

      <Teleport to="body">
        <div
          v-if="showRoutineForm"
          class="fixed inset-0 z-[999] flex items-center justify-center"
        >
          <!-- Blurred overlay -->
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-sm"
            @click="showRoutineForm = false"
          ></div>
          <!-- Modal content -->
          <div
            class="relative z-10 w-full max-w-lg mx-auto bg-white/90 rounded-2xl p-6 border border-blue-100 shadow-2xl max-h-[80%] overflow-y-auto"
          >
            <RoutineForm
              :editing-routine="editingRoutine"
              :editing-category-name="editingCategoryName"
              :should-show-modal="true"
              @save="handleRoutineSave"
              @cancel="
                showRoutineForm = false;
                editingRoutine = null;
                editingCategoryName = '';
              "
            />
          </div>
        </div>
      </Teleport>

      <CategoryList
        :categories="categories"
        @add-routine="addRoutineToTarget"
        @delete-category="deleteCategory"
        @delete-routine="deleteRoutine"
        @delete-task="deleteRoutineTask"
        @edit-routine="startEditingRoutine"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  targetDate: {
    type: String,
    default: "today",
    validator: (value) => ["today", "tomorrow"].includes(value),
  },
});

const { addTask, newTask } = useTasks();
const collapsed = ref(true);

const {
  categories,
  showRoutineForm,
  editingRoutine,
  editingCategoryName,
  handleRoutineSave,
  startEditingRoutine,
  deleteCategory,
  deleteRoutine,
  deleteRoutineTask,
} = useRoutines();

const addRoutineToTarget = (routine) => {
  routine.tasks.forEach((t) => {
    newTask.value = t.text;
    addTask(props.targetDate); // "today" or "tomorrow"
  });
};
</script>
