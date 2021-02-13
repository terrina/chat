<template lang="pug">
.chat
    .chat__container
        .chat__wrap
            .chat__info
                .chat__info-name {{ user }}
                button.chat__info-logout.btn.btn_border(
                    type="button"
                    @click.prevent="logout()"
                ) Выйти
            .chat__list
                .chat__message(v-for="(item, i) in messages" :key="i" :class="{ 'chat__message_right' : user === item.user }")
                    .chat__message-name(v-if="user != item.user") {{ item.user }}
                    .chat__message-text(v-html="formatText(item.text)")
            form.chat__control(@submit.prevent="send()")
                textarea.chat__control-field(
                    placeholder="Введите сообщение"
                    v-model="message"
                    @keyup.enter.exact.prevent="send()"
                )
                button.chat__control-submit.btn.btn_circle(
                    type="submit"
                )
                    img(src="@/assets/img/ico-send.svg" alt)
</template>

<script>
    import Vuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators'

    export default {
        name: 'Chat',
        setup () {
            return {
                validator: Vuelidate()
            }
        },
        data () {
            return {
                message: ''
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            messages() {
                return this.$store.state.messages
            }
        },
        validations () {
            return {
                message: { required },
            }
        },
        methods: {
            send() {
                this.validator.message.$touch();
                if(!this.validator.message.$invalid) {
                    const data = {
                        user: this.user,
                        text: this.message
                    }
                    this.$store.dispatch('updateMessages', data);
                    this.message = '';
                }
            },
            formatText(text) {
                return text.split('\n').join('<br>')
            }
        },
        mounted() {
            setInterval(() => {
                this.$store.dispatch('updateMessages');
            }, 1000);
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/components/chat.scss';
</style>
