<template>
    <div>
        <h1 class="text-4xl font-bold text-blue-300">Todo List</h1>
        <input v-model="newTask" class="border border-gray-300 rounded px-4 py-2 mt-4 w-full"
            placeholder="Add a new todo" />
        <button @click="addTask" class="bg-gray-300 rounded px-4 py-2 mt-4">
            Add
        </button>
        <ul>
            <li v-for="(task, index) in tasks" :key="index" class="flex items-center space-x-2 mt-2">
                <input type="checkbox" v-model="task.done" />
                <!-- Editing Input -->
                <input v-if="task.editing" v-model="task.text" :ref="(el) => {
                        if (el) taskRefs[index] = el;
                    }
                    " @blur="doneEditing(task)" @keyup.enter="doneEditing(task)"
                    class="flex-1 px-2 py-1 border border-yellow-500 bg-yellow-100 rounded focus:outline-none" />

                <!-- Static text -->
                <span v-else :class="{ 'line-through text-gray-400': task.done }" class="flex-1 cursor-pointer">
                    {{ task.text }}
                </span>
                <button @click="editTask(task, index)" class="text-blue-500 hover:text-blue-700">
                    ✏️
                </button>
                <button @click="deleteTask(index)">X</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
const tasks = ref([]);
const newTask = ref("");
const taskRefs = ref([]);

const addTask = () => {
    if (newTask.value.trim()) {
        tasks.value.push({
            text: newTask.value.trim(),
            done: false,
            editing: false,
        });
        newTask.value = "";
    }
};

const deleteTask = (index) => {
    tasks.value.splice(index, 1);
};

const editTask = async (task, index) => {
    task.editing = true;
    await nextTick();
    if (taskRefs.value[index]) {
        taskRefs.value[index].focus();
    }
};

const doneEditing = (task) => {
    if (task.text.trim() === "") {
        task.text = "Untitled task";
    }
    task.editing = false;
};
</script>