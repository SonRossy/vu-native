import axios from "axios";
import Vue from "vue-native-core";
import { Platform, AsyncStorage } from "react-native";
import axiosInstance from '../../services/axios'

let BASE_URL = "";

if (Platform.OS === "ios") {
    BASE_URL = "http://localhost:3001/api/v1";
} else {
    BASE_URL = "http://10.0.2.2:3001/api/v1";
}

export default {
    namespaced: true,
    state: {
        items: [],
        item: {}
    },
    getters: {},
    actions: {
        async fetchSecret() {
            return axiosInstance
                .get(`${BASE_URL}/meetups/secret`)
                .then(res => {
                    const data = res.data;
                })
                .catch(() => {});
        },
        fetchMeetups({ state, commit }) {
            return axios.get(`${BASE_URL}/meetups`).then(res => {
                const meetups = res.data;
                commit(
                    "setItems", { items: meetups, resource: "meetups" }, { root: true }
                );
                return state.items;
            });
        },
        fetchMeetupById({ commit, state }, meetupId) {
            commit("setMeetUp", {});
            return axios.get(`${BASE_URL}/meetups/${meetupId}`).then(res => {
                const meetup = res.data;
                commit("setMeetUp", meetup);
                return state.item;
            });
        },
        createMeetup({ rootState, commit }, meetupData) {
            meetupData.processedLocation = meetupData.location.toLowerCase().replace(/[\s,]+/g, '').trim()
            meetupData.meetupCreator = rootState.auth.user
            return axiosInstance.post(`${BASE_URL}/meetups`, meetupData).
            then(res => {
                const meetup = res.data
                commit('addMeetup', meetup)
                return meetup
            })
        }
    },
    mutations: {
        setMeetUp(state, meetup) {
            Vue.set(state, "item", meetup);
        },
        addMeetup(state, meetup) {
            state.items.unshift(meetup)
        }
    }
};