<template>
    <div>
        <v-app-bar>
            <v-app-bar-title>Task Management Application</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <img
                    class="fit-picture"
                    src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                    alt="Grapefruit slice atop a pile of other slices"
                    width="40"
                    height="40"
                    style="border-radius: 50px"
                />
            </v-btn>
            <v-btn icon>
                <v-icon @click="logout">mdi-location-exit</v-icon>
            </v-btn>
        </v-app-bar>
        <v-container>
            <v-btn color="primary" class="mb-4" @click="addTask"
                >Add Task</v-btn
            >

            <v-row>
                <v-col
                    cols="12"
                    class="d-flex justify-space-between align-center mb-4"
                >
                    <v-col cols="9" class="">
                        <v-text-field
                            v-model="search"
                            label="Search"
                            append-icon="mdi-magnify"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="">
                        <v-select
                            v-model="sortBy"
                            :items="['Recent', 'Oldest']"
                            label="Sort By"
                            hide-details
                        ></v-select>
                    </v-col>
                </v-col>
                <v-col cols="4" class="">
                    <h3>TO DO</h3>
                    <draggable
                        class="list-group"
                        :list="filteredList1"
                        group="people"
                        @change="log1"
                        itemKey="list1"
                    >
                        <template #item="{ element }">
                            <v-card :key="element._id" class="mb-2" outlined>
                                <v-card-title>{{ element.name }}</v-card-title>
                                <v-card-subtitle>{{
                                    element.description
                                }}</v-card-subtitle>
                                <v-card-subtitle>
                                    Created at: {{ element.createdAt }}
                                </v-card-subtitle>
                                <v-card-actions>
                                    <v-btn icon @click="editTask(element)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="deleteTask(element)">
                                        <v-icon color="red">mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="viewTask(element)">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </draggable>
                </v-col>

                <v-col cols="4" class="">
                    <h3>In Progress</h3>
                    <draggable
                        class="list-group"
                        :list="filteredList2"
                        group="people"
                        @change="log2"
                        itemKey="list2"
                    >
                        <template #item="{ element }">
                            <v-card :key="element._id" class="mb-2" outlined>
                                <v-card-title>{{ element.name }}</v-card-title>
                                <v-card-subtitle>{{
                                    element.description
                                }}</v-card-subtitle>
                                <v-card-subtitle>
                                    Created at: {{ element.createdAt }}
                                </v-card-subtitle>
                                <v-card-actions>
                                    <v-btn icon @click="editTask(element)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="deleteTask(element)">
                                        <v-icon color="red">mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="viewTask(element)">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </draggable>
                </v-col>
                <v-col cols="4" class="">
                    <h3>Done</h3>
                    <draggable
                        class="list-group"
                        :list="filteredList3"
                        group="people"
                        @change="log3"
                        itemKey="list3"
                    >
                        <template #item="{ element }">
                            <v-card :key="element._id" class="mb-2" outlined>
                                <v-card-title>{{ element.name }}</v-card-title>
                                <v-card-subtitle>{{
                                    element.description
                                }}</v-card-subtitle>
                                <v-card-subtitle>
                                    Created at: {{ element.createdAt }}
                                </v-card-subtitle>
                                <v-card-actions>
                                    <v-btn icon @click="editTask(element)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="deleteTask(element)">
                                        <v-icon color="red">mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="viewTask(element)">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </draggable>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="addTaskDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Add Task</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="addNewTask.name"
                                    label="Name*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="addNewTask.description"
                                    label="Description*"
                                    required
                                ></v-textarea>
                            </v-col>
                            <v-select
                                v-model="addNewTask.status"
                                label="status*"
                                :items="['toDo', 'inProgress', 'completed']"
                            ></v-select>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="addTaskDialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="
                            addNewTask._id ? updateTaskAPI() : createTaskAPI()
                        "
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
    name: 'two-lists',
    display: 'Two Lists',
    order: 1,
    components: {
        draggable,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    data() {
        return {
            search: '',
            sortBy: 'Recent',
            globalList: [],
            addTaskDialog: false,
            list1: [],
            list2: [],
            list3: [],
            addNewTask: {
                _id: '',
                name: '',
                description: '',
                status: '',
            },
        };
    },
    async mounted() {
        await this.listTasks();
    },
    computed: {
        filteredList1() {
            return this.sortAndFilter(this.list1);
        },
        filteredList2() {
            return this.sortAndFilter(this.list2);
        },
        filteredList3() {
            return this.sortAndFilter(this.list3);
        },
    },
    methods: {
        add: function () {
            this.list.push({ name: 'Juan' });
        },
        replace: function () {
            this.list = [{ name: 'Edgard' }];
        },
        clone: function (el) {
            return {
                name: el.name + ' cloned',
            };
        },
        log1(evt) {
            if (evt.added) {
                // Task added to "To Do"
                console.log('log1 : added', evt.added.element);
                this.updateTaskAPI(
                    evt.added.element._id,
                    'toDo',
                    evt.added.element.name,
                    evt.added.element.description
                );
            }
            if (evt.removed) {
                console.log('log1 : removed', evt.removed.element._id);
            }
            console.log(evt);
        },
        log2(evt) {
            if (evt.added) {
                // Task added to "In Progress"
                console.log('log2 : added', evt.added.element);
                this.updateTaskAPI(
                    evt.added.element._id,
                    'inProgress',
                    evt.added.element.name,
                    evt.added.element.description
                );
            }
            if (evt.removed) {
                console.log('log2 : removed', evt.removed.element._id);
            }
            console.log(evt);
        },
        log3(evt) {
            if (evt.added) {
                // Task added to "Completed"
                console.log('log3 : added', evt.added.element);
                this.updateTaskAPI(
                    evt.added.element._id,
                    'completed',
                    evt.added.element.name,
                    evt.added.element.description
                );
            }
            if (evt.removed) {
                console.log('log3 : removed', evt.removed.element._id);
            }
            console.log(evt);
        },
        async listTasks() {
            try {
                await axios
                    .get(
                        'https://server-task-manager-application.fly.dev/api/v1/tasks/auth/list',
                        {
                            headers: {
                                Authorization:
                                    'Bearer ' +
                                    JSON.parse(
                                        localStorage.getItem('auth-token')
                                    ),
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                        this.globalList = response.data.tasks;
                        this.list1 = this.globalList.filter((task) => {
                            return task.status === 'toDo';
                        });
                        this.list2 = this.globalList.filter(
                            (task) => task.status === 'inProgress'
                        );
                        this.list3 = this.globalList.filter(
                            (task) => task.status === 'completed'
                        );
                    })
                    .catch((error) => {
                        this.$toast.error(error.message);

                        console.error('Error:', error);
                    });
            } catch (error) {
                this.$toast.error(error.message);

                console.error('Error:', error);
            }
        },
        addTask() {
            console.log('addTask');
            this.addNewTask._id = '';
            this.addNewTask.name = '';
            this.addNewTask.description = '';
            this.addNewTask.status = '';
            this.addTaskDialog = true;
        },
        viewTask(element) {
            console.log('viewTask');
            this.addNewTask = element;

            this.addTaskDialog = true;
        },
        async createTaskAPI() {
            await axios
                .post(
                    'https://server-task-manager-application.fly.dev/api/v1/tasks/auth/create',
                    {
                        name: this.addNewTask.name,
                        description: this.addNewTask.description,
                        status: this.addNewTask.status,
                    },
                    {
                        headers: {
                            Authorization:
                                'Bearer ' +
                                JSON.parse(localStorage.getItem('auth-token')),
                        },
                    }
                )
                .then((response) => {
                    if (!response.data.error) {
                        this.addTaskDialog = false;
                        this.$toast.success('Task created successfully!');
                        this.listTasks();
                        this.addNewTask = {
                            _id: '',
                            name: '',
                            description: '',
                            status: '',
                        };
                    } else {
                        this.$toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    this.$toast.error(error.message);

                    console.error('Error creating task:', error);
                });
        },
        editTask(element) {
            this.addNewTask = { ...element };
            this.addTaskDialog = true;
        },
        async updateTaskAPI(taskId, newStatus, name, description) {
            try {
                if (taskId) {
                    this.addNewTask._id = taskId;
                    this.addNewTask.status = newStatus;
                    this.addNewTask.name = name;
                    this.addNewTask.description = description;
                }
                await axios
                    .post(
                        `https://server-task-manager-application.fly.dev/api/v1/tasks/auth/update`,
                        {
                            _id: this.addNewTask._id,
                            name: this.addNewTask.name,
                            description: this.addNewTask.description,
                            status: this.addNewTask.status,
                        },
                        {
                            headers: {
                                Authorization:
                                    'Bearer ' +
                                    JSON.parse(
                                        localStorage.getItem('auth-token')
                                    ),
                            },
                        }
                    )
                    .then((response) => {
                        console.log(
                            'Task updated successfully:',
                            response.data
                        );
                        this.addTaskDialog = false;
                        this.$toast.success('Task updated successfully!');
                        this.listTasks();
                    })
                    .catch((error) => {
                        this.$toast.error(error.message);

                        console.error('Error updating task:', error);
                    });
            } catch (error) {
                this.$toast.error(error.message);
            }
        },
        async deleteTask(element) {
            if (confirm('Are you sure you want to delete this task?')) {
                await axios
                    .post(
                        `https://server-task-manager-application.fly.dev/api/v1/tasks/auth/delete`,
                        {
                            _id: element._id,
                        },
                        {
                            headers: {
                                Authorization:
                                    'Bearer ' +
                                    JSON.parse(
                                        localStorage.getItem('auth-token')
                                    ),
                            },
                        }
                    )
                    .then((response) => {
                        if (!response.data.error) {
                            console.log(
                                'Task deleted successfully:',
                                response.data
                            );
                            this.$toast.success('Task deleted successfully!');
                            this.listTasks();
                        } else {
                            this.$toast.error(response.data.message);
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(error.message);

                        console.error('Error deleting task:', error);
                    });
            }
        },
        logout() {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-details');
            this.$toast.success('Logged out successfully!');
            this.$router.push('/');
            window.location.reload();
        },
        sortAndFilter(list) {
            let filtered = list.filter((task) =>
                task.name.toLowerCase().includes(this.search.toLowerCase())
            );

            if (this.sortBy === 'Recent') {
                filtered = filtered.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            } else {
                filtered = filtered.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
            }

            return filtered;
        },
    },
};
</script>
