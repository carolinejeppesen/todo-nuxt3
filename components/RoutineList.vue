<template>
  <div class="p-6">
    <h2 class="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
      Routine Templates
    </h2>
    <button
      class="bg-pink-300 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg mb-4"
      @click="showRoutineForm = !showRoutineForm"
    >
      {{ showRoutineForm ? "Close form" : "Add template" }}
    </button>

    <RoutineForm
      v-if="showRoutineForm"
      :editing-routine="editingRoutine"
      :editing-category-name="editingCategoryName"
      @save="handleRoutineSave"
      @cancel="
        showRoutineForm = false;
        editingRoutine = null;
        editingCategoryName = '';
      "
    />

    <CategoryList
      :categories="categories"
      @add-routine="addRoutineToTarget"
      @delete-category="deleteCategory"
      @delete-routine="deleteRoutine"
      @delete-task="deleteRoutineTask"
      @edit-routine="startEditingRoutine"
    />
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
const { uid, tasks, saveTasks, getTodayDate, getTomorrowDate } = useTasks();

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
  const taskDate =
    props.targetDate === "today" ? getTodayDate() : getTomorrowDate();

  routine.tasks.forEach((t) => {
    tasks.value.push({
      id: uid(),
      text: t.text,
      done: false,
      editing: false,
      createdAt: Date.now(),
      completedAt: null,
      taskDate: taskDate,
    });
  });
  saveTasks();
};
</script>
