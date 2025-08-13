<template>
  <div>
    <h1 class="text-4xl font-bold text-blue-300">Todo List</h1>

    <!-- New task -->
    <input
      v-model="newTask"
      @keyup.enter="addTask"
      class="border border-gray-300 rounded px-4 py-2 mt-4 w-full"
      placeholder="Add a new todo"
    />
    <button @click="addTask" class="bg-gray-300 rounded px-4 py-2 mt-4">
      Add
    </button>

    <!-- Active -->
    <h2 class="mt-4 font-semibold">Current Todos</h2>
    <ul>
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

    <!-- Finished -->
    <h2 class="mt-8 font-semibold">Finished</h2>
    <ul>
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

    <!-- Routine templates -->
    <h2 class="mt-10 text-xl font-semibold">Routine Templates</h2>
    <button
      class="mt-2 bg-blue-200 px-3 py-1 rounded"
      @click="showRoutineForm = !showRoutineForm"
    >
      {{ showRoutineForm ? "Close form" : "Add routine template" }}
    </button>

    <RoutineForm
      v-if="showRoutineForm"
      @save="handleRoutineSave"
      @cancel="showRoutineForm = false"
    />

    <CategoryList :categories="categories" @add-to-today="addRoutineToToday" />
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
} = useTasks();

const {
  categories,
  showRoutineForm,
  saveCategories,
  loadCategories,
  findOrCreateCategory,
  handleRoutineSave,
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
