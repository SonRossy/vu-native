<template>
<view class="container" :class="{'container-android': Platform.OS === 'ios' }">
  <navigation v-if="isAuthResolved"/>
  <nb-container v-else class="spinner-container">
    <nb-spinner color="blue" />
  </nb-container>
</view>
</template>

<script>
import store from './store'
import navigation from '../src/navigation'
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";
import AppMessage from '../src/components/AppMessage'
import ScreenWithDrawer from './components/ScreenDrawer'
import AppHeader from './components/AppHeader'
import InputWithError from './components/InputWithError'
import AppNavigationEvents from './react-components/AppNavigationEvents'
import moment from 'moment'
import Vuelidate from 'vuelidate'
import { Platform } from "react-native";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.component('ScreenWithDrawer', ScreenWithDrawer)
Vue.prototype.$store = store
Vue.use(Vuelidate)
Vue.component('AppMessage', AppMessage)
Vue.component('InputWithError', InputWithError)
Vue.component('AppNavigationEvents', AppNavigationEvents)
Vue.component('AppHeader', AppHeader)

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
  data (){
    return {
      Platform
    }
  },
  computed: {
    isAuthResolved (){
      return store.state.auth.isAuthResolved
    }
  },
  created () {
    store.dispatch("auth/verifyUser")
    .catch(()=>{})
  },

}
</script>

<style scoped>
.container {
  margin-top: 16px;
  flex: 1;
}
.container-android {
   padding-top: 25px
}
.spinner-container {
  display: flex;
  justify-content: center;
}
</style>
