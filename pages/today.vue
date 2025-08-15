<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
    <div class="max-w-4xl mx-auto p-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8">
        <TaskInput 
          date-type="today" 
          placeholder="Add a task for today..."
          @add-task="handleAddTask" 
        />
        <ActiveTasksList 
          :tasks="todayActiveTasks" 
          title="Current Tasks"
          empty-message="No tasks for today! Time to add some or relax."
          @toggle="toggleDone"
          @edit="editTask"
          @doneEditing="doneEditing"
          @delete="deleteTask"
        />
        <CompletedTasksList :tasks="todayFinishedTasks" title="Completed Today" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { 
  todayActiveTasks, 
  todayFinishedTasks, 
  addTask, 
  newTask,
  toggleDone,
  editTask,
  doneEditing,
  deleteTask
} = useTasks()

const handleAddTask = (text, dateType) => {
  const originalNewTask = newTask.value
  newTask.value = text
  addTask(dateType)
  newTask.value = originalNewTask
}
</script>