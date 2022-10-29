import { createRouter, createWebHashHistory,  } from "vue-router";

import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'
import About from '../views/About.vue'


const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/post/:postId',
        component: PostDetail
    },
    {
        path: '/page/:page',
        component: Home
    },
    {
        path: '/til',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes: routes,
})