<template>
  <nb-header>
    <nb-left>
      <nb-button :on-press="goBack" v-if="!root" transparent>
        <nb-icon name="arrow-back" />
      </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>{{screen}}</nb-title>
    </nb-body>
    <nb-right>
      <nb-button :on-press="displayActionSheet" transparent>
        <nb-icon name="menu" />
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
import { ActionSheet } from "native-base";
export default {
  props: {
    screen: {
      type: String,
      default: "Header"
    },
    root: {
      type: Boolean
    },
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      allBtnOption: [
        { text: "Login", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Register", icon: "analytics", iconColor: "#f42ced" },
        { text: "Create Meetup", icon: "aperture", iconColor: "#ea943b" },
        { text: "Logout", icon: "trash", iconColor: "#fa213b" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ]
    };
  },
  computed: {
    optionCancelIndex() {
      return this.btnOptions.length - 1;
    },
    optionDestructiveIndex() {
      return this.isAuth ? this.optionCancelIndex - 1 : -99
    },
    isAuth () {
        return this.$store.getters['auth/isAuth']
    },
    btnOptions (){
        if(this.isAuth){
            return this.allBtnOption.filter((button)=>button.text !== 'Login' && button.text !=='Register')
        }
        return this.allBtnOption.filter(button=>button.text !=='Create Meetup' && button.text !=='Logout')
    }
  },
  methods: {
    displayActionSheet() {
      ActionSheet.show(
        {
          options: this.btnOptions,
          cancelButtonIndex: this.optionCancelIndex,
          destructiveButtonIndex: this.optionDestructiveIndex,
          title: "Select An Option"
        },
        this.handleOptionsSelect
        // buttonIndex => {
        //   this.clicked = this.btnOptions[buttonIndex];
        // }
      );
    },
    goBack() {
      this.navigation.goBack();
    },
    handleOptionsSelect(buttonIndex) {
      const option = this.btnOptions[buttonIndex];
      switch (option.text) {
        case "Login":
            this.navigation.navigate('Login')
          break;
        case "Register":
            this.navigation.navigate('Register')
          break;
        case "Create Meetup":
            this.navigation.navigate('MeetupCreate')
          break;
        case "Logout":
            this.$store.dispatch('auth/logout')
            .then(()=>{
                this.navigation.navigate('Home')
            })
          break;
        default:
            return null
      }
    }
  }
};
</script>