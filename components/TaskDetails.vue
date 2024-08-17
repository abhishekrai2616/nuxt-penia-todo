<script setup>
import { TrashIcon, HeartIcon } from "@heroicons/vue/24/solid";

const taskStore = useTaskStore();
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const { task } = props;
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <TrashIcon @click="taskStore.deleteTask(task._id)" class="cursor-pointer" />
      <HeartIcon
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task._id)"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
