import {createStore} from 'vuex'

export default createStore({
    state: {
        authorized: false,
        user: '',
        messages: []
    },
    mutations: {
        login(state, data) {
            state.user = data;
            state.authorized = true;
        },
        logout(state) {
            state.user = '';
            state.authorized = false;
        },
        updateMessages(state, data) {
            state.messages = data;
        },
    },
    actions: {
        updateMessages({ commit }, data) {
            let msgs = JSON.parse(localStorage.getItem('messages')) || [];
            if (data) msgs.push(data);
            localStorage.setItem('messages', JSON.stringify(msgs));

            commit('updateMessages', msgs);
        }
    },
    modules: {}
})
