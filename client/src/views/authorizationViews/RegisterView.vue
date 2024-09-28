<template>
    <div style="background-color: aliceblue">
        <v-container
            class="fill-height"
            fluid
            style="background-color: aliceblue"
        >
            <v-row justify="center" align="center">
                <v-col cols="12" md="4">
                    <v-card class="pa-5">
                        <v-card-title class="justify-center">
                            Register
                        </v-card-title>
                        <v-form
                            v-model="valid"
                            ref="form"
                            @submit.prevent="registerUser"
                        >
                            <v-text-field
                                v-model="firstName"
                                label="First Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="lastName"
                                label="Last Name"
                                required
                            ></v-text-field>
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
                            <v-text-field
                                v-model="confirmPassword"
                                label="Confirm Password"
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
                                Register
                            </v-btn>
                        </v-form>

                        <v-btn
                            class="mt-4"
                            color="secondary"
                            block
                            @click="login"
                        >
                            Login
                        </v-btn>
                        <v-divider class="my-4"></v-divider>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'RegisterView',
    components: {},
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            valid: false,
            // Rules for form validation
            emailRules: [(v) => !!v || 'Email is required'],
            passwordRules: [(v) => !!v || 'Password is required'],
            clientId:
                '171535966853-vakh5bl391qnnitijgqmcs02v8q4lqd2.apps.googleusercontent.com',
        };
    },
    methods: {
        ...mapActions(['register']),

        async registerUser() {
            try {
                const result = await this.register({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                });
                console.log('result : ', result);
                if (!result.error) {
                    this.$toast.success('User registered successfully!');
                    this.$router.push('/');
                } else {
                    this.$toast.error(result.message);
                }
            } catch (error) {
                console.log(error);
                console.log(error.message);

                this.$toast.error(error.message);
            }
        },
        login() {
            this.$router.push('/auth/login');
        },
    },
};
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>
