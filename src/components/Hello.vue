<template>
  <view>
    <text class="text-color-primary">{{message}}</text>
    <view id="son" class="son">
    <button
    :title="btnMessage" 
    :on-press="handleClick"
    />
    </view>
    <text class="text-color-secondary"> {{timesClicked}} </text>
    <text>{{clickMotivation}}</text>   
  </view>
</template>

<script>
export default {
  data(){
    return{
      message: 'Welcome to my Application',
      btnMessage: 'Click Me',
      timesClicked: 0
    }
  },
  methods:{
      handleClick(){
          this.timesClicked++
      }
  },
  computed:{
      clickMotivation(){
          return this.timesClicked<5? "Please Click Me" : "Good job keep clicking"
      }
  }
}
</script>

<style>
</style>
