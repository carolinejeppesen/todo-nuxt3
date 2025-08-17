<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
    <div class="max-w-4xl mx-auto p-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8">
        <div class="flex items-center justify-between mb-6">
          <NuxtLink
            to="/today"
            class="text-blue-600 hover:text-blue-800 font-medium"
          >
            Go to Todays todos
          </NuxtLink>
        </div>
        <!-- Routine templates -->
        <div class=" p-6">
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
            @add-to-today="addRoutineToToday"
            @delete-category="deleteCategory"
            @delete-routine="deleteRoutine"
            @delete-task="deleteRoutineTask"
            @edit-routine="startEditingRoutine"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  newTask,
  addTask,
  activeTasksSorted,
  finishedTasksSorted,
  toggleDone,
  editTask,
  doneEditing,
  deleteTask,
  uid,
  tasks,
  saveTasks,
} = useTasks();

const {
  categories,
  showRoutineForm,
  editingRoutine,
  editingCategoryName,
  saveCategories,
  loadCategories,
  findOrCreateCategory,
  handleRoutineSave,
  startEditingRoutine,
  deleteCategory,
  deleteRoutine,
  deleteRoutineTask,
} = useRoutines();

const addRoutineToToday = (routine) => {
  routine.tasks.forEach((t) => {
    tasks.value.push({
      id: uid(),
      text: t.text,
      done: false,
      editing: false,
      createdAt: Date.now(),
      completedAt: null,
    });
  });
  saveTasks();
};
</script>
