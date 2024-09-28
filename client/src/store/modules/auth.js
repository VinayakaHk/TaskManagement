import axios from 'axios';
const state = {
    userDetails: JSON.parse(localStorage.getItem("user-details") || "{}"),
    authToken: JSON.parse(localStorage.getItem("auth-token") || "{}"),
    authError: null,
    authLoading: false
};
// Getters
const getters = {
    userDetails: (state) => state.userDetails,
    authToken: (state) => state.authToken,
    isAuthLoading: (state) => state.authLoading,
    getAuthError: (state) => state.authError,
};

const mutations = {
    setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
    setAuthToken: (state, authToken) => (state.authToken = authToken),
    setAuthLoading: (state, isLoading) => (state.authLoading = isLoading),
    setAuthError: (state, authError) => (state.authError = authError),
};

const actions = {
    async login({ commit }, { email, password }) {
        console.log('logging in');
        commit('setAuthLoading', true);

        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.post('https://server-task-manager-application.fly.dev/api/v1/login', { email, password }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.userDetails) {
                commit('setUserDetails', response.data.userDetails);
                commit('setAuthToken', response.data.token);
                commit('setAuthError', null);
                localStorage.setItem('user-details', JSON.stringify(response.data.userDetails));
                localStorage.setItem('auth-token', JSON.stringify(response.data.token));
                this.$router.push('/');
            }
            else {
                commit('setAuthError', response.data.message);
            }
        } catch (authError) {

            commit('setAuthError', authError);
        } finally {
            commit('setAuthLoading', false);
        }
    },
    verifyTokenWithBackend(token) {
        axios
            .post('https://server-task-manager-application.fly.dev/api/v1/login/google', { token })
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
    googleLogin({ commit }, { token }) {
        commit('setAuthLoading', true);
        try {
            axios
                .post('https://server-task-manager-application.fly.dev/api/v1/login/google', { token })
                .then((response) => {
                    commit('setUserDetails', response.data.token);
                    commit('setAuthToken', response.data.token);
                    commit('setAuthError', null);
                    localStorage.setItem('user-details', JSON.stringify(response.data.userDetails));
                    localStorage.setItem('auth-token', JSON.stringify(response.data.token));
                    this.$router.push('/');
                    this.$router.push('/');
                    this.$toast.success('Google login successful!');
                })
                .catch((error) => {
                    console.error('Authentication error:', error);
                    this.$toast.error('Google login failed. Try again!');
                });

        } catch (authError) {
            commit('setAuthError', authError);
        } finally {
            commit('setAuthLoading', false);
        }
    },
};



export default {
    state,
    getters,
    actions,
    mutations,
};
