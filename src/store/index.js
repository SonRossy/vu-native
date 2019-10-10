import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { Platform } from 'react-native'
// you are able to use your module stor by just importing them and place them in module object 
import meetups from './modules/meetups'
import threads from './modules/threads'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        meetups, //this is a store
        threads, //this is another store
        auth
    },
    state: {},
    //like computed properties
    getters: {

    },
    //like methods
    actions: {

    },
    mutations: {
        setItems(state, { items, resource }) {
            Vue.set(state[resource], 'items', items)
        }
    }
})