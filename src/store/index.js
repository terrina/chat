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
        updateMessages({ commit, state }, data) {
            // update localStorage
            let msgs = JSON.parse(localStorage.getItem('messages')) || [];
            if (data) msgs.push(data);
            localStorage.setItem('messages', JSON.stringify(msgs));

            // trimming messages for output
            const msgsReverse = msgs.slice().reverse();
            let count = 0;
            let msgsTrim = msgsReverse.filter(function(item) {
                if (item.user !== state.user) {
                    if (count < 10) {
                        count++;
                        return item;
                    }
                } else {
                    if (count < 10) return item;
                }
            });
            commit('updateMessages', msgsTrim.reverse());
        }
    },
    modules: {}
})
