import Vue from 'vue';
import VueRouter  from 'vue-router';

import Main from "../pages/Main/Main";
import Error from "../pages/Error";
import MyDocuments from "../pages/Main/MyDocuments";
import Categories from "../pages/Main/Categories";
import WorkPlace from "../pages/Main/WorkPlace";


Vue.use(VueRouter);

const routes = [
    {
        path: '/main',
        name: 'main',
        component: Main
    },
    {
        path: '/Categories',
        name: 'Categories',
        component: Categories
    },
    {
        path: '/',
        name: 'MyDocuments',
        component: MyDocuments
    },
    {
        path: '/work',
        name: 'WorkPlace',
        component: WorkPlace
    },

    { path: '*', component: Error },
]

export const router = new VueRouter({
    routes
})




