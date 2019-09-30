<template>
  <view class="container">
    <text class="text-color-primary">{{title}}</text>
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
      title: 'I AM SCREEN ONE'
    }
  },
  methods:{
    gotToScreen2(){
      this.navigation.navigate('Screen2') //Screen2 is the name of the screen to go to
    }
  }
}
</script>

<style>
</style>

