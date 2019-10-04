import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { Platform } from 'react-native'

import meetups from './modules/meetups'
import threads from './modules/threads'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        meetups, //this is a store
        threads //this is another store
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