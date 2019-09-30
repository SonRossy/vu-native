<template>
  <view class="container">
    <text class="text-color-primary">{{title}}</text>
    <text>{{meetup.title}}</text>
    <text>{{meetup.description}}</text>
    <button
    title="Go To Screen 2"
    :on-press="gotToScreen2"
    />
  </view>
</template>

<script>
export default {
  props:{
    navigation:{
      type: Object
    }
  },
  data(){
    return{
      title: 'I AM Detail SCreen',
    }
  },
  methods:{
    gotToScreen2(){
      this.navigation.navigate('Screen2') //Screen2 is the name of the screen to go to
    }
  },
  computed:{
      meetup(){
                return this.$store.state.meetups.item;
      }
  },
  created() {
    const meetupId = this.navigation.getParam('meetupId', 'none')// so you get a param like this from navigation object
      // which is sent by the component that you is navigating to this one
      this.$store.dispatch('meetups/fetchMeetupsById', meetupId)
  }
}
</script>

<style>
</style>

