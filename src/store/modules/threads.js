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
        items: [],
    },
    getters: {

    },
    actions: {
        fetchThreads({ state, commit }, meetupId) {
            return axios.get(`${BASE_URL}/threads?meetupId=${meetupId}`).then(res => {
                const threads = res.data.threads
                commit('setItems', { items: threads, resource: 'threads' }, { root: true })
                return state.items
            })
        },

    },
    mutations: {}
}