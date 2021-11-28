import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        serverPath: 'http://127.0.0.1:3000/',
        MyArchives:[],
        MyDocuments:[],
        MyFolders:[],

        overlay:{
            hidden: false,
            obj: {},
        },
    },
    getters: {},
    mutations: {
        setParam(state,payload){
            state[payload.obj] = payload.param
        },
        addParam(state,payload){
            state[payload.obj].push(payload.param)
        },
        removeParam(state,payload){
            let start = state[payload.obj].findIndex((i)=>i === payload.param)
            state[payload.obj].splice(start,1)
        },
        copyMe(state,payload){
            let copy = JSON.parse(JSON.stringify(payload.param))
            copy.public = false
            state.user.training.push(copy)
        },
        showOverlay(state, payload){
            state.overlay.obj = payload.obj || {}
            state.overlay.hidden = payload.hidden
        },
    },
    actions: {
        //===================== PUBLIC (ADD, REMOVE) =====================\\
        addPublic(commit, payload){
            payload.param.public = true
            store.commit('addParam', payload)
        },
        removePublic(commit, payload){
            payload.param.public = false
            store.commit('removeParam', payload)
        },
        addMe(commit, payload){
            let copy = JSON.parse(JSON.stringify(payload.param))
            let id = new Date()
            copy.id = id.getTime()
            store.commit('copyMe', {param:copy})
        },
        //===================================================================\\


        //===================== API =====================\\
        getDocuments({state, commit}, callback){
            fetch(`${state.serverPath}allDocuments`)
                .then(response => response.json())
                .then(res => {
                    commit('setParam', {param: res, obj: 'MyDocuments'})
                    callback && callback(res)
                })
        },

        getFolders({state, commit}, callback){
            fetch(`${state.serverPath}getFolder`)
                .then(response => response.json())
                .then(res => {
                    commit('setParam', {param: res, obj: 'MyFolders'})
                    callback && callback(res)
                })
        },

        getFile({state},name){
            window.location.href = `${state.serverPath}download?fileName=${name}`
        },



        postDocuments({state, dispatch}, payload){
            let form = new FormData()
            form.append('file', payload.file)
            form.append('desc', payload.json)
            fetch(`${state.serverPath}postDocuments`, {
                method: 'POST',
                body:  form
            })
                .then(response => response.json())
                .then(res => {
                    dispatch('getDocuments')
                    payload.callback && payload.callback(res)
                })
        },



        postDocumentsF({state, dispatch}, payload){
            let form = new FormData()
            form.append('file', payload.file)
            form.append('path', payload.path)
            form.append('desc', payload.json)
            fetch(`${state.serverPath}postDocumentsF`, {
                method: 'POST',
                body:  form
            })
                .then(response => response.json())
                .then(res => {
                    dispatch('getFolders')
                    payload.callback && payload.callback(res)
                })
        },

        postFolder({state, dispatch}, payload){
            let form = new FormData()
            form.append('desc', payload.json)
            form.append('path', payload.path)

            fetch(`${state.serverPath}addFolder`, {
                method: 'POST',
                body:  form
            })
                .then(response => response.json())
                .then(res => {
                    dispatch('getFolders')
                    payload.callback && payload.callback(res)
                })
        },

        deleteDocuments({state, dispatch}, payload){
            let form = new FormData()
            form.append('desc', payload.json)
            fetch(`${state.serverPath}deleteDocuments`, {
                method: 'DELETE',
                body:  form
            })
                .then(response => response.json())
                .then(res => {
                    dispatch('getDocuments')
                    payload.callback && payload.callback(res)
                })
        }
        //================================================\\
    },
});