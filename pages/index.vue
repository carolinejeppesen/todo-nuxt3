<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
    <div class="max-w-4xl mx-auto p-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8">
        <!-- New task -->
        <div class=" mb-6">
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

        <!-- Active -->
        <div class="mb-8">
          <h2 class="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
            Current Todos
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {{ activeTasksSorted.length }}
            </span>
          </h2>
          <div class="rounded-2xl border border-blue-100 overflow-hidden">
            <ul class="divide-y divide-blue-100">
              <TaskRow
                v-for="task in activeTasksSorted"
                :key="task.id"
                :task="task"
                @toggle="toggleDone"
                @edit="editTask"
                @doneEditing="doneEditing"
                @delete="deleteTask"
              />
            </ul>
            <p v-if="activeTasksSorted.length === 0" class="text-blue-400 text-center py-8 italic">
              No active todos! Time to add some tasks or relax.
            </p>
          </div>
        </div>

        <!-- Finished -->
        <div class="mb-10">
          <h2 class="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
            Completed
            <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
              {{ finishedTasksSorted.length }}
            </span>
          </h2>
          <div class="bg-white/40 rounded-2xl border border-blue-100 overflow-hidden">
            <ul class="divide-y divide-blue-50">
              <TaskRow
                v-for="task in finishedTasksSorted"
                :key="task.id"
                :task="task"
                @toggle="toggleDone"
                @edit="editTask"
                @doneEditing="doneEditing"
                @delete="deleteTask"
              />
            </ul>
            <p v-if="finishedTasksSorted.length === 0" class="text-blue-300 text-center py-6 italic">
              No completed tasks yet
            </p>
          </div>
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
            @cancel="showRoutineForm = false; editingRoutine = null; editingCategoryName = ''"
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
