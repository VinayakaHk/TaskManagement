<template>
    <div>
        <div
            id="g_id_onload"
            :data-client_id="clientId"
            data-callback="handleCredentialResponse"
            data-auto_select="true"
        ></div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            clientId:
                '171535966853-vakh5bl391qnnitijgqmcs02v8q4lqd2.apps.googleusercontent.com',
        };
    },
    methods: {
        ...mapActions(['googleLogin']),
        handleCredentialResponse(response) {
            const token = response.credential;
            console.log('ID Token:', token);

            this.verifyTokenWithBackend(token);
        },
        verifyTokenWithBackend(token) {
            axios
                .post(
                    'https://server-task-manager-application.fly.dev/api/v1/login/google',
                    { token }
                )
                .then((response) => {
                    console.log('User is authenticated:', response.data);
                    localStorage.setItem('auth-token', response.data.token);
                    localStorage.setItem(
                        'user-details',
                        response.data.userDetails
                    );
                    this.$router.push('/');
                    this.$toast.success('Google login successful!');
                })
                .catch((error) => {
                    console.error('Authentication error:', error);
                    this.$toast.error('Google login failed. Try again!');
                });
        },
        async googleLogin() {
            try {
                await this.googleLogin();
                this.$router.push('/');
            } catch (error) {
                this.$toast.error('Google login failed. Try again!');
            }
        },
    },
    mounted() {
        // The callback must be available in the global scope
        window.handleCredentialResponse = this.handleCredentialResponse;
    },
};
</script>

<style>
/* Add any custom styling here if needed */
</style>
