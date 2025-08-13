interface Task {
  id: string;
  text: string;
}

interface Routine {
  id: string;
  name: string;
  tasks: Task[];
}

interface Category {
  id: string;
  name: string;
  routines: Routine[];
}

export const useRoutines = () => {
  const categories = ref<Category[]>([]);
  const showRoutineForm = ref(false);

  const uid = (): string =>
    Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  const saveCategories = () => {
    localStorage.setItem("categories", JSON.stringify(categories.value));
  };
  const loadCategories = () => {
    const saved = localStorage.getItem("categories");
    if (!saved) return;
    categories.value = JSON.parse(saved);
  };

  const findOrCreateCategory = (name: string) => {
    const clean = name.trim();
    let cat = categories.value.find(
      (c) => c.name.trim().toLowerCase() === clean.toLowerCase()
    );
    if (!cat) {
      cat = { id: uid(), name: clean, routines: [] };
      categories.value.push(cat);
    }
    return cat;
  };

  const handleRoutineSave = (payload: any) => {
    const catName = (payload.categoryName || "").trim();
    const routineName = (payload.routineName || "").trim();
    const items = (payload.taskTexts || [])
      .map((t:string) => (t || "").trim())
      .filter(Boolean);

    if (!catName || !routineName || items.length === 0) return;

    const cat = findOrCreateCategory(catName);
    cat.routines.push({
      id: uid(),
      name: routineName,
      tasks: items.map((text:string) => ({ id: uid(), text })),
    });
    showRoutineForm.value = false;
    saveCategories();
  };

  // Deleting 
  const deleteCategory = (categoryId: string) => {
    categories.value = categories.value.filter(cat => cat.id !== categoryId)
    saveCategories()
  };

  const deleteRoutine = (categoryId: string, routineId: string) => {
    const category = categories.value.find(cat => cat.id === categoryId);
    if (!category) return;
    category.routines = category.routines.filter(r => r.id !== routineId);
    saveCategories();
  };

const deleteRoutineTask = (categoryId: string, routineId: string, taskId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (!category) return
  const routine = category.routines.find(r => r.id === routineId)
  if (!routine) return
  routine.tasks = routine.tasks.filter(task => task.id !== taskId)
  saveCategories()
}


  watch(categories, saveCategories, { deep: true });
  onMounted(loadCategories);

  return {
    categories,
    showRoutineForm,
    handleRoutineSave,
    saveCategories,
    loadCategories,
    findOrCreateCategory,
    deleteCategory,
    deleteRoutine,
    deleteRoutineTask,
  };
};
