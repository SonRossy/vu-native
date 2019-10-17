<template>
  <nb-container :style="{backgroundColor: '#fff'}">
      <AppNavigationEvents :onDidFocus="checkForMessage"/>
    <nb-header>
      <nb-body>
        <nb-title>Login</nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <InputWithError
          :error="$v.form.email.$dirty && !$v.form.email.requried"
          msg="Email is Reqiured"
        >
          <nb-input
            v-model="form.email"
            placeholder="Email"
            auto-capitalize="none"
            :on-blur="() => $v.form.email.$touch()"
          />
        </InputWithError>

        <InputWithError
          :error="$v.form.password.$dirty && !$v.form.password.requried"
          msg="Password is Reqiured"
        >
          <nb-input
            v-model="form.password"
            placeholder="Password"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.password.$touch()"
          />
        </InputWithError>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button :on-press="login" block>
          <nb-text>Login</nb-text>
        </nb-button>
      </view>
      <nb-button transparent :on-press="goToRegister" block>
        <nb-text>Not Registered? Register Here</nb-text>
      </nb-button>
      <nb-button transparent :on-press="goToHome" block>
        <nb-text>Go Home</nb-text>
      </nb-button>
    </nb-content>
  </nb-container>
</template>

<script>
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    navigation: {
      //remember that navigation is passed by default when calling that screen into a satck navigator
      type: Object
    }
  },
  data() {
    return {
      isCheckingUser: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  // the below codes are posible because of vuelidate
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    login() {
      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch("auth/login", this.form) // we calling the action login from auth file(store)
          .then(user => {
            this.navigation.navigate("Home");
          })
          .catch(err => {
            Toast.show({
              text: "Wrong email or  password!",
              buttonText: "Okay",
              type: "danger",
              duration: 3000
            });
          });
      }
    },
    checkForMessage() {
      const message = this.navigation.getParam("message")
      if (message) {
        Toast.show({
          text: message,
          buttonText: "Okay",
          type: "success",
          duration: 3000
        });
      }
    },
    goToRegister() {
      this.navigation.navigate("Register");
    },
    goToHome() {
      this.navigation.navigate("Home");
    }
  },
  created() {

      const isAuth = this.$store.getters['auth/isAuth']
      if(isAuth) this.navigation.navigate("Home")

    //AsyncStorage.removeItem('meetuper-jwt')
    // this.isCheckingUser = true;
    // this.$store
    //   .dispatch("auth/verifyUser")
    //   .then(() => this.navigation.navigate("Home"))
    //   .catch(() => {(this.isCheckingUser = false)
    //   this.checkForMessage()// should not be here
    //   });
  }
};
</script>

<style scoped>

</style>