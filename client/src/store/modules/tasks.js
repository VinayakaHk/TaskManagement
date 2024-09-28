import axios from 'axios';

// Initial state
const state = {
    tasks: [{
        _id: 1,
        title: 'Task 1',
        description: 'Description 1',
        status: 'Pending',
        date: '2022-01-01',
    },
    {
        _id: 1,
        title: 'Task 1',
        description: 'Description 1',
        status: 'Pending',
        date: '2022-01-01',
    }],
    loading: false,
    error: null,
};

// Getters
const getters = {
    allTasks: (state) => state.tasks,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
};

// Actions
const actions = {
    async getTasks({ commit }, { filter, sort, searchTerm }) {
        commit('setLoading', true);
        try {
            const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
            const response = await axios.post('https://server-task-manager-application.fly.dev/api/v1/tasks/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { filter, sort, search: searchTerm },
            });
            commit('setTasks', response.data);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },

    async createTask({ commit }, task) {
        commit('setLoading', true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://server-task-manager-application.fly.dev/api/v1/tasks', task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            commit('addTask', response.data);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },

    async updateTask({ commit }, task) {
        commit('setLoading', true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://server-task-manager-application.fly.dev/api/v1/tasks/task/${task._id}`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            commit('updateTask', response.data);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },

    async deleteTask({ commit }, taskId) {
        commit('setLoading', true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://server-task-manager-application.fly.dev/api/v1/tasks/task/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            commit('deleteTask', taskId);
        } catch (error) {
            commit('setError', error);
        } finally {
            commit('setLoading', false);
        }
    },
};

// Mutations
const mutations = {
    setTasks: (state, tasks) => (state.tasks = tasks),
    addTask: (state, task) => state.tasks.unshift(task),
    updateTask: (state, updatedTask) => {
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }
    },
    deleteTask: (state, taskId) => {
        state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },
    setLoading: (state, isLoading) => (state.loading = isLoading),
    setError: (state, error) => (state.error = error),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
