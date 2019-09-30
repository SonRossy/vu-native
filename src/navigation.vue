<template>
    <root>
        <AppNavigation />
    </root>
</template>

<script>
import HomeScreen from '../src/screens/HomeScreen'
import MeetupDetailsScreen from '../src/screens/MeetupDetailsScreen'
import Screen1 from '../src/screens/Screen1'
import Screen2 from '../src/screens/Screen2'
import Screen3 from '../src/screens/Screen3'
import { Root } from "native-base";

import { createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import {  createAppContainer} from 'react-navigation'
import { createDrawerNavigator} from 'react-navigation-drawer'

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen, 
    Meetup: MeetupDetailsScreen, //once register here, you can call it with props this.navigation.navigate('Meetup')
    // it seems that createStackNavigator comes with the on object call navigation that you use to navigate to other stack
    ScreenOne: Screen1,
    

  },
  {
      //you can provide additional info here, the on below says that will be the initial screen when navigates to this
    initialRouteName: 'Home'
  }
)

const SomeOtherStackNavigator1 = createStackNavigator({
    Screen2
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
})

const SomeOtherStackNavigator2 = createStackNavigator({
    Screen3
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
})

const drawerNavigator = createDrawerNavigator({
    drawerNavigator1: SomeOtherStackNavigator1,
    drawerNavigator2: SomeOtherStackNavigator2,
})

const bottomTabNavigator = createBottomTabNavigator({
    //here we will have two tabs at the bottom, one with name Meetups and Other. so each tab with their own stack
Meetups: HomeNavigator,
Side: drawerNavigator
})
const AppNavigation = createAppContainer(bottomTabNavigator) //everything goe in a container that we export bellow as a component
                                                        //that we will use as tags to diplay our component

export default {
  components:{
    AppNavigation,
    Root
  },
  data (){
    return{
    } 
  },
  methods:{
  }
}
</script>
