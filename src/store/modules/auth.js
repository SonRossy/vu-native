import axios from 'axios'
import Vue from 'vue-native-core'
import { Platform } from 'react-native'

let BASE_URL = ''

if (Platform.OS === 'ios') {
    BASE_URL = 'http://localhost:3001/api/v1'
} else {
    BASE_URL = 'http://10.0.2.2:3001/api/v1'
}

export default {
    namespaced: true,
    state: {
        user: {},
        isAuth: false
    },
    getters: {

    },
    actions: {
        login({ commit, state }, userData) { // we put commit or state because we will use them below
            return axios.post(`${BASE_URL}/users/login`, userData)
                .then(res => {
                    const user = res.data
                    commit('setAuthUser', user) // data has to be changed through mutation
                })
        }
    },
    mutations: {
        setAuthUser(state, user) {
            return state.user = user
        }
    }
}