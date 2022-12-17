import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        dark: false,
        user: null,
        folder: 1
    },
    mutations: {
        setDark(state, payload) {
            state.dark = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setFolder(state, payload) {
            state.folder = payload;
        },
        resetUser(state) {
            state.user = null;
            state.openedMail = null;
            state.folder = 1;
        },
        resetDark(state) {
            state.dark = null;
        },
        resetFolder(state) {
            state.folder = null;
        },
        resetPage(state) {
            state.page = null;
        },
        addFolder(state, payload) {
            state.user.folderNames.push(payload)
        },
        editFolder(state, {id, name}) {
            state.user.folderNames[id] = name;
        },
        delFolder(state, id) {
            state.user.folderNames.splice(id, 1);
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getDark(state) {
            return state.dark;
        },
        getFolder(state) {
            return state.folder;
        },
        dumpFolders(state) {
            return state.dumpFolders;
        },
    }
})

export default store
