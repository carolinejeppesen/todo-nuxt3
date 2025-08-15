interface Task {
  id: string;
  text: string;
  done: boolean;
  editing: boolean;
  createdAt: number;
  completedAt: number | null;
  taskDate: string;
}

export const useTasks = () => {
  const tasks = ref<Task[]>([]);
  const newTask = ref("");

  const uid = (): string =>
    Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  const addTask = (todayOrTomorrow: string) => {
    const text = newTask.value.trim();
    const dueDate = todayOrTomorrow === 'today' ? getTodayDate() : getTomorrowDate();
    if (!text) return;
    tasks.value.push({
      id: uid(),
      text,
      done: false,
      editing: false,
      createdAt: Date.now(),
      completedAt: null,
      taskDate: dueDate
    });
    newTask.value = "";
    saveTasks();
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-gb")
  }

  const getTomorrowDate = () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString("en-gb")
  }
// TODAY TASKS
  const todayActiveTasks = computed(() => {
    return tasks.value.filter(t => t.taskDate === getTodayDate() && !t.done)
      .sort((a, b) => b.createdAt - a.createdAt);
  });

    const todayFinishedTasks = computed(() => {
    return tasks.value.filter(t => t.taskDate === getTodayDate() && t.done)
      .sort((a, b) => b.createdAt - a.createdAt);
  });

  const todayTasksSorted = computed(() => {
    return tasks.value.filter(t => t.taskDate === getTodayDate() && !t.done)
      .sort((a, b) => b.createdAt - a.createdAt);
  });

  // TOMORROW TASKS
  const tomorrowActiveTasks = computed(() => {
  return tasks.value
    .filter(t => t.taskDate === getTomorrowDate() && !t.done)
    .sort((a, b) => b.createdAt - a.createdAt);
  });

  const tomorrowFinishedTasks = computed(() => {
    return tasks.value
      .filter(t => t.taskDate === getTomorrowDate() && t.done)
      .sort((a, b) => b.createdAt - a.createdAt);
  });

  const tomorrowTasksSorted = computed(() => {
    return tasks.value.filter(t => t.taskDate === getTomorrowDate() && !t.done)
      .sort((a, b) => b.createdAt - a.createdAt);
  });

  const activeTasksSorted = computed(() =>
    tasks.value.filter((t) => !t.done).sort((a, b) => b.createdAt - a.createdAt)
  );

  const finishedTasksSorted = computed(() =>
    tasks.value
      .filter((t) => t.done)
      .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
  );

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
    saveTasks();
  };

  const editTask = (id: string) => {
    const t = tasks.value.find((t) => t.id === id);
    if (!t) return;
    t.editing = true;
  };

  const doneEditing = (id: string) => {
    const t = tasks.value.find((t) => t.id === id);
    if (!t) return;
    t.text = t.text.trim() || "Untitled Task";
    t.editing = false;
    saveTasks();
  };

  const toggleDone = (task: Task) => {
    task.done = !task.done;
    task.completedAt = task.done ? Date.now() : null;
    saveTasks();
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };

  const loadTasks = () => {
    const saved = localStorage.getItem("tasks");
    if (!saved) return;
    tasks.value = JSON.parse(saved);
  };

  watch(tasks, saveTasks, { deep: true });
  onMounted(loadTasks);

  return {
    tasks,
    newTask,
    activeTasksSorted,
    finishedTasksSorted,
    todayActiveTasks,
    todayFinishedTasks,
    addTask,
    deleteTask,
    editTask,
    doneEditing,
    toggleDone,
    uid,
    saveTasks,
  };
};
