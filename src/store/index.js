import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { Platform } from 'react-native'

import meetups from './modules/meetups'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        meetups
    },
    state: {
        todos: [],
        
    },
    //like computed properties
    getters: {

    },
    //like methods
    actions: {
        fetchTodos({state, commit}){
            return axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            const todos= res.data
             commit('setTodos', todos)
             return state.todos
            })
        },
    },
    mutations: {
        setTodos (state, todos) {
            // state.todos = todos
            Vue.set(state, 'todos', todos)
        },
    }
})