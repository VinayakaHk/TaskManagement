<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row justify="center" align="center">
                <v-col cols="12" md="4">
                    <v-card class="pa-5">
                        <v-card-title class="justify-center"
                            >Login</v-card-title
                        >
                        <v-form
                            v-model="valid"
                            ref="form"
                            @submit.prevent="loginUser"
                        >
                            <v-text-field
                                v-model="email"
                                label="email"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                :rules="passwordRules"
                                required
                            ></v-text-field>
                            <v-btn
                                type="submit"
                                :disabled="!valid"
                                color="primary"
                                block
                            >
                                Login
                            </v-btn>
                        </v-form>

                        <v-divider class="my-4"></v-divider>
                        <!-- <google-auth /> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// Import necessary libraries
import { mapActions } from 'vuex';
// import GoogleAuth from './GoogleAuth.vue';
export default {
    name: 'LoginPage',
    components: {
        // GoogleAuth,
    },
    data() {
        return {
            email: '',
            password: '',
            valid: false,
            // Rules for form validation
            emailRules: [(v) => !!v || 'Email is required'],
            passwordRules: [(v) => !!v || 'Password is required'],
            clientId:
                '171535966853-vakh5bl391qnnitijgqmcs02v8q4lqd2.apps.googleusercontent.com',
        };
    },
    methods: {
        ...mapActions(['login']),

        // Function to handle user login
        async loginUser() {
            try {
                await this.login({
                    email: this.email,
                    password: this.password,
                });
                this.$router.push('/');
            } catch (error) {
                console.log(error);
                console.log(error.message);

                this.$toast.error('Invalid email or password!');
            }
        },
    },
};
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>
