<template>
<nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
        <nb-body>
            <nb-title>
                Login
            </nb-title>
        </nb-body>
    </nb-header>
    <nb-content padder>
        <nb-form>
            <InputWithError :error="$v.form.email.$dirty && !$v.form.email.requried" msg="Email is Reqiured">
                <nb-input v-model="form.email" placeholder="Email" auto-capitalize="none" :on-blur="() => $v.form.email.$touch()" />
            </InputWithError>

            <InputWithError :error="$v.form.password.$dirty && !$v.form.password.requried" msg="Password is Reqiured">
                <nb-input v-model="form.password" placeholder="Password" auto-capitalize="none" secure-text-entry :on-blur="() => $v.form.password.$touch()" />
            </InputWithError>

        </nb-form>
        <view :style="{marginTop:10}">
            <nb-button :on-press="login" block>
                <nb-text>Login </nb-text>
            </nb-button>
        </view>
        <nb-button transparent :on-press="goToRegister" block>
            <nb-text>Not Registered? Register Here </nb-text>
        </nb-button>
    </nb-content>
</nb-container>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
export default {
    props: {
        navigation: { //remember that navigation is passed by default when calling that screen into a satck navigator
            type: Object
        }
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
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
            if (!this.$v.form.$invalid){
                this.$store.dispatch('auth/login', this.form) // we calling the action login from auth file(store)
                .then((user)=>{
                    alert(JSON.stringify(user))
                    this.navigation.navigate('Home')
                })
            }
        },
        goToRegister() {
            this.navigation.navigate('Register')
        }
    }
}
</script>
