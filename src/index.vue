<template>
<view class="container">
  <navigation />
</view>
</template>

<script>
import store from './store'
import navigation from '../src/navigation'
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";
import AppMessage from '../src/components/AppMessage'
import ScreenWithDrawer from './components/ScreenDrawer'
import InputWithError from './components/InputWithError'
import moment from 'moment'
import Vuelidate from 'vuelidate'

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.component('ScreenWithDrawer', ScreenWithDrawer)
Vue.prototype.$store = store
Vue.use(Vuelidate)
Vue.component('AppMessage', AppMessage)
Vue.component('InputWithError', InputWithError)

Vue.filter('upperCase', function(value){
  if(!value) return ''
  return value.toUpperCase()
})

Vue.filter('formatDate', (value, formatType='LL')=>{
  if(!value) return ''
  return moment(value).format(formatType)
})

Vue.filter('fromNow', (value)=>{
  if(!value) return ''
  return moment(value).fromNow()
})

export default {
  components:{
    navigation
  },

}
</script>

<style scoped>
.container {
  margin-top: 16px;
  flex: 1;
}
</style>
