import axios from "axios";
import Vue from "vue-native-core";
import { Platform, AsyncStorage } from "react-native";
import jwtDecode from 'jwt-decode'
import axiosInstance from '../../services/axios'

let BASE_URL = "";

if (Platform.OS === "ios") {
    BASE_URL = "http://localhost:3001/api/v1";
} else {
    BASE_URL = "http://10.0.2.2:3001/api/v1";
}

const isTokenValid = (token) => {
    if (token) {
        const decodedToken = jwtDecode(token)
        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }
    return false
}
export default {
    namespaced: true,
    state: {
        user: null,
        isAuthResolved: false,
    },
    getters: {
        isAuth(state) {
            return !!state.user //!! means return true if not null or false if null
        }
    },
    actions: {
        login({ commit, state }, userData) {
            // we put commit or state because we will use them below
            return axios.post(`${BASE_URL}/users/login`, userData).then(res => {
                const user = res.data;
                AsyncStorage.setItem("meetuper-jwt", user.token);
                commit("setAuthUser", user); // data has to be changed through mutation
                return state.user
            });
        },
        fetchCurrentUser({ commit, state }) {
            return axiosInstance.get(`${BASE_URL}/users/me`)
                .then(res => {
                    const user = res.data
                    AsyncStorage.setItem("meetuper-jwt", user.token);
                    commit("setAuthUser", user);
                    return state.user
                }).catch(() => undefined)
        },
        async verifyUser({ dispatch, commit }) {
            const jwt = await AsyncStorage.getItem("meetuper-jwt");
            if (jwt && isTokenValid(jwt)) {
                const user = await dispatch('fetchCurrentUser')
                commit('resolveAuth')
                return user ? Promise.resolve(jwt) : Promise.reject('Cant not fetch User')
            }
            commit('resolveAuth')
            return Promise.reject('Token is not valid')
        },
        register(context, userData) {
            return axios.post(`${BASE_URL}/users/register`, userData)
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                AsyncStorage.removeItem('meetuper-jwt')
                commit('setAuthUser', null)
                resolve(true)

            })
        },
    },
    mutations: {
        setAuthUser(state, user) {
            return (state.user = user);
        },
        resolveAuth(state) {
            state.isAuthResolved = true
        }
    }
};