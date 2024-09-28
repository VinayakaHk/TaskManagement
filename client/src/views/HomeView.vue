<template>
    <div class="home">
        <TasksView />
    </div>
</template>

<script>
import TasksView from '@/views/TasksView.vue';
export default {
    name: 'HomeView',
    components: {
        TasksView,
    },
};
</script>
