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
    <button class="mt-2 bg-blue-200 px-3 py-1 rounded" @click="showRoutineForm = !showRoutineForm">
      {{ showRoutineForm ? 'Close form' : 'Add routine template' }}
    </button>

    <RoutineForm
      v-if="showRoutineForm"
      @save="handleRoutineSave"
      @cancel="showRoutineForm = false"
    />

    <CategoryList
      :categories="categories"
      @add-to-today="addRoutineToToday"
    />
  </div>
</template>

<script setup>
const tasks = ref([])
const newTask = ref('')

const uid = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

const addTask = () => {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push({
    id: uid(),
    text,
    done: false,
    editing: false,
    createdAt: Date.now(),
    completedAt: null,
  })
  newTask.value = ''
  saveTasks()
}

const activeTasksSorted = computed(() =>
  tasks.value.filter(t => !t.done).sort((a, b) => b.createdAt - a.createdAt)
)

const finishedTasksSorted = computed(() =>
  tasks.value
    .filter(t => t.done)
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
)

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
  saveTasks()
}

const editTask = (id) => {
  const t = tasks.value.find(t => t.id === id)
  if (!t) return
  t.editing = true
}

const doneEditing = (id) => {
  const t = tasks.value.find(t => t.id === id)
  if (!t) return
  t.text = t.text.trim() || 'Untitled Task'
  t.editing = false
  saveTasks()
}

const toggleDone = (task) => {
  task.done = !task.done
  task.completedAt = task.done ? Date.now() : null
  saveTasks()
}

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
const loadTasks = () => {
  const saved = localStorage.getItem('tasks')
  if (!saved) return
  tasks.value = JSON.parse(saved)
}

// --- Categories & routines ---
const categories = ref([])
const showRoutineForm = ref(false)

const saveCategories = () => {
  localStorage.setItem('categories', JSON.stringify(categories.value))
}
const loadCategories = () => {
  const saved = localStorage.getItem('categories')
  if (!saved) return
  categories.value = JSON.parse(saved)
}

const findOrCreateCategory = (name) => {
  const clean = name.trim()
  let cat = categories.value.find(
    c => c.name.trim().toLowerCase() === clean.toLowerCase()
  )
  if (!cat) {
    cat = { id: uid(), name: clean, routines: [] }
    categories.value.push(cat)
  }
  return cat
}

const handleRoutineSave = (payload) => {
  const catName = (payload.categoryName || '').trim()
  const routineName = (payload.routineName || '').trim()
  const items = (payload.taskTexts || [])
    .map(t => (t || '').trim())
    .filter(Boolean)

  if (!catName || !routineName || items.length === 0) return

  const cat = findOrCreateCategory(catName)
  cat.routines.push({
    id: uid(),
    name: routineName,
    tasks: items.map(text => ({ id: uid(), text }))
  })
  showRoutineForm.value = false
  saveCategories()
}

const addRoutineToToday = (routine) => {
  routine.tasks.forEach(t => {
    tasks.value.push({
      id: uid(),
      text: t.text,
      done: false,
      editing: false,
      createdAt: Date.now(),
      completedAt: null,
    })
  })
  saveTasks()
}

// --- Persistence wiring ---
watch(categories, saveCategories, { deep: true })
onMounted(loadCategories)

watch(tasks, saveTasks, { deep: true })
onMounted(loadTasks)
</script>
