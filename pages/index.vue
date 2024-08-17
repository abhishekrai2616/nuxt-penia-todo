<script setup>

const taskStore = useTaskStore();

const filter = ref("all");

onMounted(async () => {
  await taskStore.initialize();
});

const tasks = ref(taskStore.tasks);
const isLoading = ref(false);

const fetchTodos = async () => {
  isLoading.value = true;
  await taskStore.loadTasks();
  tasks.value = taskStore.tasks;
  isLoading.value = false;
};

fetchTodos();
</script>

<template>
  <main>
    <header>
      <img src="@/assets/pinia-logo.svg" alt="pinia_logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task._id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs" :key="task._id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- <button @click="taskStore.$reset">reset state</button> -->
  </main>
</template>
