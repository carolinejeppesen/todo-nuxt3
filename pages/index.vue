<template>
    <div>
        <h1 class="text-4xl font-bold text-blue-300">Todo List</h1>
        <input v-model="newTask" class="border border-gray-300 rounded px-4 py-2 mt-4 w-full" placeholder="Add a new todo" />
        <button @click="addTask" class="bg-gray-300 px-4 py-2 mt-4">Add</button>
        <ul>
            <li v-for="(task, index) in tasks" :key="index">
                <input type="checkbox" v-model="task.done" />
                <span :class="{ done: task.done }">{{ task.text }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const tasks = ref([])
const newTask = ref('')

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value.trim(), done: false, editing: false })
    newTask.value = ''
  }
}
</script>

<style>
    .done {
    text-decoration: line-through;
    color: gray;
    }
</style>