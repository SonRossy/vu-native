<template>
  <scroll-view>
    <nb-text :style="styles.label" class="header-1">Featured Meetups</nb-text>
    <MeetupCard v-for="meetup in meetups"
    :navigateToDetail="goToMeetupDetail"
    :meetup='meetup'
    :key="meetup._id"
    ></MeetupCard>
  </scroll-view>
</template>

<script>
import MeetupCard from '../components/MeetupCard'
import styles from '../styles/index'
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
    }
  },
  created() {
    //1. dispatching fetchTodos, here you could do ...mapActions like we in do PDL
    this.$store.dispatch("meetups/fetchMeetups");
  },
  methods: {
    goToScreen1() {
      this.navigation.navigate("ScreenOne");
    },
    goToMeetupDetail(meetupId) {
      this.navigation.navigate('Meetup',{meetupId: meetupId})// this is how you sent something using navigation
    }
  }
};
</script>

</style>
