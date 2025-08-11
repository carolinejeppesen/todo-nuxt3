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
  </div>
</template>

<script setup>
const tasks = ref([]);
const newTask = ref("");
const taskRefs = ref({});

const uid = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

const addTask = () => {
  const text = newTask.value.trim();
  if (!text) return;
  tasks.value.push({
    id: uid(),
    text,
    done: false,
    editing: false,
    createdAt: Date.now(),
    completedAt: null,
  });
  newTask.value = "";
  saveTasks();
};

const activeTasksSorted = computed(() =>
  tasks.value.filter((t) => !t.done).sort((a, b) => b.createdAt - a.createdAt)
);

const finishedTasksSorted = computed(() =>
  tasks.value
    .filter((t) => t.done)
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
);

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  saveTasks();
};

const editTask = async (id) => {
  const t = tasks.value.find((t) => t.id === id);
  if (!t) return;
  t.editing = true;
  await nextTick();
  taskRefs.value[id]?.focus();
};

const doneEditing = (id) => {
  const t = tasks.value.find((t) => t.id === id);
  if (!t) return;
  t.text = t.text.trim() || "Untitled Task";
  t.editing = false;
  saveTasks();
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

const toggleDone = (task) => {
  task.done = !task.done;
  task.completedAt = task.done ? Date.now() : null;
};

watch(tasks, saveTasks, { deep: true });
onMounted(loadTasks);
</script>