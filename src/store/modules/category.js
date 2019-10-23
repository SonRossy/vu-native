import axios from 'axios';
import Vue from 'vue-native-core';
import { Platform } from 'react-native';

let BASE_URL = '';

if (Platform.OS === 'ios') {
    BASE_URL = 'http://localhost:3001/api/v1';
} else {
    BASE_URL = 'http://10.0.2.2:3001/api/v1';
}

export default {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {},
    actions: {
        fetchCategories({ state, commit }) {
            return axios.get(`${BASE_URL}/categories`)
                .then(res => {
                    // setItems is being taken care in index.js, this is why we use root : true 
                    commit('setItems', { items: res.data, resource: 'categories' }, { root: true })
                    return state.items
                })
        },
    },
    mutations: {},
};