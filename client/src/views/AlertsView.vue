<template>
    <main>
        <Transition name="fade">
            <div class="alert">
                <template v-for="(item, i) in alerts" :key="i">
                    <v-alert
                        :type="item.type"
                        class="mb-2 alert--box"
                        dismissible
                        @input="closeAlert(i)"
                        border="top"
                        elevation="2"
                    >
                        {{ item.message }}
                    </v-alert>
                </template>
            </div>
        </Transition>

        <v-snackbar v-if="snackType == 'info'" v-model="snackbar" right>
            {{ snackMessage }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    icon
                    color="red"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    <v-icon> mdi-close </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </main>
</template>

<script>
export default {
    data() {
        return {
            con: 0,
        };
    },
    computed: {
        alerts() {
            return this.$store.getters.getAlerts;
        },
        snackbar: {
            get: function () {
                return this.$store.getters.snackbar;
            },
            set: function (value) {
                this.$store.commit('SNACKBAR_COMPLETE', value);
            },
        },
        snackMessage() {
            return this.$store.getters.snackMessage;
        },
        snackType() {
            return this.$store.getters.snackType;
        },
    },
    methods: {
        closeAlert(index) {
            this.$store.dispatch('CLEAR_ALERT', index);
        },
    },
};
</script>

<style lang="scss" scoped>
.alert {
    position: fixed;
    width: max-content;
    width: 80%;
    max-width: 350px;
    z-index: 200000;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);

    &--box {
        transition: all 0.3s ease-out;
    }
}

.slide-y-transition-enter-active,
.slide-y-transition-leave-active {
    transition: transform 0.3s;
}

.slide-y-transition-enter-from,
.slide-y-transition-leave-to {
    transform: translateY(-100%);
}

.slide-y-transition-enter-to,
.slide-y-transition-leave-from {
    transform: translateY(0);
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
