<script setup>

const taskStore = useTaskStore();
const newTask = ref("");

const handleSubmit = async () => {
  if (newTask.value.length > 0) {
    const task = {
      title: newTask.value,
      isFav: false,
    };
    await taskStore.addTask(task);
    newTask.value = "";
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
</style>
