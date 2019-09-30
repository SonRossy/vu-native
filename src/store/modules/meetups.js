import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { Platform } from 'react-native'

let BASE_URL = ''

if (Platform.OS === 'ios'){
    BASE_URL ='http://localhost:3001/api/v1'
}else{
    BASE_URL = 'http://10.0.2.2:3001/api/v1'
}

export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {

    },
    actions: {
        fetchMeetups({state, commit}){
            return axios.get(`${BASE_URL}/meetups`).then(res=>{
            const meetups= res.data
             commit('setMeetups', meetups)
             return state.items
            })
        }
    },
    mutations :{
        setMeetups (state, meetups) {
            // state.meetups = meetups
            Vue.set(state, 'items', meetups)
            console.log(state.meetups)
        }
    }
}