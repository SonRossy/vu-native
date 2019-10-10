<template>
<nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
        <nb-body>
            <nb-title>
                Register
            </nb-title>
        </nb-body>
    </nb-header>
    <nb-content padder>
        <nb-form>
            <InputWithError :error="$v.form.username.$dirty && !$v.form.username.minLength" msg="Minimun lenght is 8 characters">
                <nb-input v-model="form.username" placeholder="Username" auto-capitalize="none" :on-blur="() => $v.form.username.$touch()"/>
            </InputWithError>
            <nb-item>
                <nb-input v-model="form.name" placeholder="Full Name" auto-capitalize="none" />
            </nb-item>
            <InputWithError :error="$v.form.email.$dirty && !$v.form.email.validEmail" msg="email format not valid">
                <nb-input v-model="form.email" placeholder="Email" auto-capitalize="none" :on-blur="() => $v.form.email.$touch()"/>
            </InputWithError>
            <nb-item>
                <nb-input v-model="form.avatar" placeholder="Avatar Url" auto-capitalize="none" />
            </nb-item>
            <InputWithError :error="$v.form.password.$dirty && !$v.form.password.required" msg="Password is required">
                <nb-input v-model="form.password" placeholder="Password" auto-capitalize="none" secure-text-entry :on-blur="() => $v.form.password.$touch()"/>
            </InputWithError>
            <InputWithError :error="$v.form.password.$dirty && !$v.form.passwordConfirmation.sameAsPassword" msg="Password must match">
                <nb-input v-model="form.passwordConfirmation" secure-text-entry last placeholder="Password Confirmation" auto-capitalize="none" :on-blur="() => $v.form.passwordConfirmation.$touch()"/>
            </InputWithError>
        </nb-form>
        <view :style="{marginTop:10}">
            <nb-button :on-press="register" block>
                <nb-text>Register</nb-text>
            </nb-button>
        </view>
        <nb-button transparent :on-press="goToLgoin" block>
            <nb-text>Already Register? Login Here </nb-text>
        </nb-button>
    </nb-content>
</nb-container>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
export default {
    props: {
        navigation: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                avatar: '',
                username: '',
                password: '',
                passwordConfirmation: '',

            }
        }
    },
    validations: {
        form: {
            email: {
                validEmail: email
            },
            password: {
                required
            },
            passwordConfirmation: {
                sameAsPassword: sameAs('password')
            },
            username: {
                minLength: minLength(8)
            }
        }
    },
    methods: {
        goToLgoin() {
            this.navigation.navigate('Login')
        },
        register() {
            alert(this.form)
        }

    }
}
</script>
