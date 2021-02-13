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
                template(
                    v-for="(item, i) in messages"
                    :key="i"
                )
                    .chat__message(
                        v-if="item.type === 'message'"
                        :class="{ 'chat__message_right' : user === item.user }"
                    )
                        .chat__message-name(v-if="user != item.user") {{ item.user }}
                        .chat__message-text(v-html="formatText(item.text)")
                    .chat__notification(v-else v-html="formatText(item.text)")
            form.chat__control(@submit.prevent="send")
                textarea.chat__control-field(
                    rows="1"
                    placeholder="Введите сообщение"
                    v-model.trim="message"
                    ref="textareaMessage"
                    @keyup.enter.exact.prevent="send"
                    @input="mixin_autoResize_resize"
                )
                button.chat__control-submit.btn.btn_circle(
                    type="submit"
                )
                    span: img(src="@/assets/img/ico-send.svg" alt)
                    span: img(src="@/assets/img/ico-send.svg" alt)
</template>

<script>
    import Vuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators'
    import mixinAutoResize from "@/mixins/autoResize.js"

    export default {
        name: 'Chat',
        mixins: [mixinAutoResize],
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
            send: function (event) {
                this.validator.message.$touch();
                if(!this.validator.message.$invalid) {
                    const data = {
                        user: this.user,
                        text: this.message,
                        type: 'message',
                    }
                    this.$store.dispatch('updateMessages', data);
                    this.message = '';
                    this.mixin_autoResize_reset(event);
                }
            },
            login() {
                const data = {
                    user: this.user,
                    text: `Пользователь <b>${this.user}</b> присоединился к чату`,
                    type: 'notification',
                }
                this.$store.dispatch('updateMessages', data);
            },
            logout() {
                if (this.user) {
                    const data = {
                        user: this.user,
                        text: `Пользователь <b>${this.user}</b> покинул чат`,
                        type: 'notification',
                    }
                    this.$store.dispatch('updateMessages', data);
                    this.$store.commit('logout');
                }
            },
            formatText(text) {
                return text.split('\n').join('<br>')
            }
        },
        mounted() {
            this.login();

            setInterval(() => {
                this.$store.dispatch('updateMessages');
            }, 1000);

            window.addEventListener('unload', () => {
                this.logout();
            });
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/components/chat.scss';
</style>
