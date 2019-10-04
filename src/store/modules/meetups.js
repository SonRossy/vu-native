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
        item: {}
    },
    getters: {

    },
    actions: {
        fetchMeetups({ state, commit }) {
            return axios.get(`${BASE_URL}/meetups`).then(res => {
                const meetups = res.data
                commit('setItems', { items: meetups, resource: 'meetups' }, { root: true })
                return state.items
            })
        },
        fetchMeetupById({ commit, state }, meetupId) {
            commit('setMeetUp', {})
            return axios.get(`${BASE_URL}/meetups/${meetupId}`).then(res => {
                const meetup = res.data
                commit('setMeetUp', meetup)
                return state.item
            })
        }
    },
    mutations: {
        setMeetUp(state, meetup) {
            Vue.set(state, 'item', meetup)
        }
    }
}