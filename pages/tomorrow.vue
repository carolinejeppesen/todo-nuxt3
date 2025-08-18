<template>
  <div class="min-h-screen bg-sky-50">
    <div class="max-w-4xl mx-auto p-8">
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8"
      >
        <TaskInput
          date-type="tomorrow"
          placeholder="Add a task for tomorrow..."
          @add-task="handleAddTask"
        />
        <ActiveTasksList
          :tasks="tomorrowActiveTasks"
          title="Tomorrows Tasks"
          empty-message="No tasks for tomorrow! Time to add some or relax."
          @toggle="toggleDone"
          @edit="editTask"
          @doneEditing="doneEditing"
          @delete="deleteTask"
        />
        <CompletedTasksList
          :tasks="tomorrowFinishedTasks"
          title="Completed Early"
          empty-message="No completed tasks"
          @toggle="toggleDone"
          @edit="editTask"
          @doneEditing="doneEditing"
          @delete="deleteTask"
        />
        <RoutineList target-date="tomorrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  tomorrowActiveTasks,
  tomorrowFinishedTasks,
  addTask,
  newTask,
  toggleDone,
  editTask,
  doneEditing,
  deleteTask,
} = useTasks();

const handleAddTask = (text, dateType) => {
  const originalNewTask = newTask.value;
  newTask.value = text;
  addTask(dateType);
  newTask.value = originalNewTask;
};
</script>
