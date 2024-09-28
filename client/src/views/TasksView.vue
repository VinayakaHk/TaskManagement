<template>
    <div>
        <v-app-bar>
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
                    <v-text-field
                        v-model="search"
                        label="Search"
                        append-icon="mdi-magnify"
                        hide-details
                    ></v-text-field>

                    <v-select
                        v-model="sortBy"
                        :items="['Recent', 'Oldest']"
                        label="Sort By"
                        hide-details
                    ></v-select>
                </v-col>
                <v-col cols="4" class="">
                    <h3>TO DO</h3>
                    <draggable
                        class="list-group"
                        :list="list1"
                        group="people"
                        @change="log"
                        itemKey="name"
                    >
                        <template #item="{ element }">
                            <v-card :key="element.id" class="mb-2" outlined>
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
                        :list="list2"
                        group="people"
                        @change="log"
                        itemKey="name"
                    >
                        <template #item="{ element }">
                            <v-card :key="element.id" class="mb-2" outlined>
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
                        :list="list3"
                        group="people"
                        @change="log"
                        itemKey="name"
                    >
                        <template #item="{ element }">
                            <v-card :key="element.id" class="mb-2" outlined>
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
        <!-- 
            <rawDisplayer class="col-3" :value="list1" title="List 1" />

            <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
    </div>
</template>
<script>
import draggable from 'vuedraggable';

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
            list1: [
                { name: 'John', id: 1, createdAt: '01/09/2021, 05:30:00' },
                { name: 'Joao', id: 2, createdAt: '01/09/2021, 05:30:00' },
                { name: 'Jean', id: 3, createdAt: '01/09/2021, 05:30:00' },
                { name: 'Gerard', id: 4, createdAt: '01/09/2021, 05:30:00' },
            ],
            list2: [
                { name: 'Juan', id: 5, createdAt: '01/09/2021, 05:30:00' },
                { name: 'sdfds', id: 6, createdAt: '01/09/2021, 05:30:00' },
                { name: 'Johnson', id: 7, createdAt: '01/09/2021, 05:30:00' },
            ],
            list3: [
                { name: 'Juan', id: 5, createdAt: '01/09/2021, 05:30:00' },
                { name: 'Edgard', id: 6, createdAt: '01/09/2021, 05:30:00' },
                { name: 'Johnson', id: 7, createdAt: '01/09/2021, 05:30:00' },
            ],
        };
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
        log: function (evt) {
            window.console.log(evt);
        },
        addTask() {
            console.log('addTask');
        },
        logout() {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-details');
            this.$toast.success('Logged out successfully!');
            this.$router.push('/');
            window.location.reload();
        },
    },
};
</script>
