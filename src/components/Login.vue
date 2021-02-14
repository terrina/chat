<template lang="pug">
.modal
    .modal__overlay
    .modal__dialog
        .login
            .login__title Введите Ваше имя, чтобы продолжить
            form.form(@submit.prevent="submitLogin()")
                .form-control(:class="{'form-control_error': validator.userName.$error}")
                    .form-control__group
                        input.form-control__field(
                            type="text"
                            placeholder="Имя"
                            name="user"
                            v-model="userName"
                            @change="validator.userName.$touch()"
                        )
                        label.form-control__label Имя
                    .form-control__message(v-if="validator.userName.$error") Заполните, пожалуйста, поле
                button.btn.btn_flat(
                    type="submit"
                ) Продолжить
</template>

<script>
    import Vuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators'

    export default {
        name: 'Login',
        setup () {
            return { validator: Vuelidate() }
        },
        data () {
            return {
                userName: ''
            }
        },
        validations () {
            return {
                userName: { required },
            }
        },
        methods: {
            submitLogin() {
                this.validator.userName.$touch();
                if(!this.validator.userName.$invalid) {
                    this.$store.commit('login', this.userName);
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/components/modal.scss';
    @import '@/assets/scss/components/login.scss';
</style>
