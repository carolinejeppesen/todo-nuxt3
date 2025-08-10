<template>
  <div>
    <h1 class="text-4xl font-bold text-blue-300">Todo List</h1>
    <input
      v-model="newTask"
      @keyup.enter="addTask"
      class="border border-gray-300 rounded px-4 py-2 mt-4 w-full"
      placeholder="Add a new todo"
    />
    <button @click="addTask" class="bg-gray-300 rounded px-4 py-2 mt-4">
      Add
    </button>
    <ul>
      <li
        v-for="task in sortedTasks"
        :key="task.id"
        class="flex items-center space-x-2 mt-2"
      >
        <input type="checkbox" v-model="task.done" />

        <input
          v-if="task.editing"
          v-model="task.text"
          :ref="
            (el) => {
              if (el) taskRefs[task.id] = el;
            }
          "
          @blur="doneEditing(task.id)"
          @keyup.enter="doneEditing(task.id)"
          class="flex-1 px-2 py-1 border border-yellow-500 bg-yellow-100 rounded focus:outline-none"
        />

        <span
          v-else
          :class="{ 'line-through text-gray-400': task.done }"
          class="flex-1 cursor-pointer"
        >
          {{ task.text }}
        </span>

        <button
          @click="editTask(task.id)"
          class="text-blue-500 hover:text-blue-700"
        >
          ✏️
        </button>
        <button @click="deleteTask(task.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const tasks = ref([]);
const newTask = ref("");
const taskRefs = ref({});

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

const addTask = () => {
  const text = newTask.value.trim();
  if (!text) return;
  tasks.value.push({
    id: uid(),
    text,
    done: false,
    editing: false,
    createdAt: Date.now(),
  });
  newTask.value = "";
  saveTasks();
};

const sortedTasks = computed(() =>
  tasks.value.slice().sort((a, b) => b.createdAt - a.createdAt)
);

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  saveTasks();
};

const editTask = async (id) => {
    const t = tasks.value.find(t => t.id === id)
    if (!t) return
    t.editing = true
    await nextTick()
    taskRefs.value[id]?.focus()
};

const doneEditing = (id) => {
    const t = tasks.value.find(t => t.id === id)
    if (!t) return
    t.text = t.text.trim() || "Untitled Task";
    t.editing = false;
    saveTasks()
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const loadTasks = () => {
  const saved = localStorage.getItem("tasks");
  if (!saved) return;
  const parsed = JSON.parse(saved);
  tasks.value = parsed;
};

watch(tasks, saveTasks, { deep: true });
onMounted(loadTasks);
</script>
