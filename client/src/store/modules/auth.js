import axios from 'axios';
import sha256 from "crypto-js/sha256";

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
        const hash = sha256(password).toString();

        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.post('https://server-task-manager-application.fly.dev/api/v1/login', { email, password: hash }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.userDetails) {
                commit('setUserDetails', response.data.userDetails);
                commit('setAuthToken', response.data.token);
                commit('setAuthError', null);
                localStorage.setItem('user-details', JSON.stringify(response.data.userDetails));
                localStorage.setItem('auth-token', JSON.stringify(response.data.token));
                return { error: false, message: response.data.message };
            }
            else {
                commit('setAuthError', response.data.message);
                return { error: true, message: response.data.message };
            }
        } catch (authError) {
            if (authError.response) {
                console.log('Error Response:', authError.response);
                console.log('Error Status:', authError.response.status);
                console.log('Error Data:', authError.response.data);
            } else {
                console.log('Request Error:', authError.message);
            }

            commit('setAuthError', authError.response ? authError.response.data.message : authError.message);
            return { error: true, message: authError.response ? authError.response.data.message : authError.message };
        } finally {
            commit('setAuthLoading', false);
        }
    },
    async register({ commit }, { firstName, lastName, email, password }) {
        commit('setAuthLoading', true);
        try {
            const hash = sha256(password).toString();

            const response = await axios.post('https://server-task-manager-application.fly.dev/api/v1/login/register', { firstName, lastName, email, password: hash });
            console.log('response.data : ', response.data);
            if (response.data.userDetails) {
                commit('setUserDetails', response.data.userDetails);
                commit('setAuthToken', response.data.token);
                commit('setAuthError', null);
                localStorage.setItem('user-details', JSON.stringify(response.data.userDetails));
                localStorage.setItem('auth-token', JSON.stringify(response.data.token));
                return { error: false, message: response.data.message };
            }
            else {
                commit('setAuthError', response.data.message);
                return { error: true, message: response.data.message };

            }
        } catch (authError) {
            if (authError.response) {
                console.log('Error Response:', authError.response);
                console.log('Error Status:', authError.response.status);
                console.log('Error Data:', authError.response.data);
            } else {
                console.log('Request Error:', authError.message);
            }

            commit('setAuthError', authError.response ? authError.response.data.message : authError.message);
            return { error: true, message: authError.response ? authError.response.data.message : authError.message };
        } finally {
            commit('setAuthLoading', false);
        }
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
                    return { error: false, message: response.data.message };
                })
                .catch((error) => {
                    console.error('Authentication error:', error);
                    return { error: false, message: error.message };

                });

        } catch (authError) {
            if (authError.response) {
                console.log('Error Response:', authError.response);
                console.log('Error Status:', authError.response.status);
                console.log('Error Data:', authError.response.data);
            } else {
                console.log('Request Error:', authError.message);
            }

            commit('setAuthError', authError.response ? authError.response.data.message : authError.message);
            return { error: true, message: authError.response ? authError.response.data.message : authError.message };
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
