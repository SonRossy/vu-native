<template>
<nb-container>
  <AppHeader screen="Home"/>
  <scroll-view>
    <nb-text :style="styles.label" class="header-1">Featured Meetups</nb-text>
    <nb-text v-if="user" :style="styles.label" class="header-1">Welcome {{user.username}}</nb-text>
    <nb-button transparent :on-press="Logout" block>
        <nb-text>Log out</nb-text>
      </nb-button>
    <MeetupCard v-for="meetup in meetups"
    :navigateToDetail="goToMeetupDetail"
    :meetup='meetup'
    :key="meetup._id"
    ></MeetupCard>
  </scroll-view>
  </nb-container>
</template>

<script>
import MeetupCard from '../components/MeetupCard'
import styles from '../styles/index'
import { AsyncStorage } from 'react-native'
export default {
  components: {
    MeetupCard
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      styles
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    meetups() {
      return this.$store.state.meetups.items;
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  created() {
    //1. dispatching fetchTodos, here you could do ...mapActions like we in do PDL
    this.$store.dispatch("meetups/fetchMeetups");
    this.$store.dispatch("meetups/fetchSecret");
  },
  methods: {
    goToScreen1() {
      this.navigation.navigate("ScreenOne");
    },
    goToMeetupDetail(meetupId) {
      this.navigation.navigate('Meetup',{meetupId: meetupId})// this is how you sent something using navigation
    },
    Logout () {
      AsyncStorage.removeItem('meetuper-jwt')
    }
  }
};
</script>

</style>
