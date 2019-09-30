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
import ScreenWithDrawer from './components/ScreenDrawer'
// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.component('ScreenWithDrawer', ScreenWithDrawer)
Vue.prototype.$store = store

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

