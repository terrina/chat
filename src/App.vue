<template lang="pug">
Login(v-if="!authorized")
Chat(v-else)
</template>

<script>
    import Login from './components/Login.vue'
    import Chat from './components/Chat.vue'

    export default {
        name: 'App',
        components: {
            Login,
            Chat
        },
        computed: {
            authorized() {
                return this.$store.state.authorized
            },
        },
    }
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';
</style>