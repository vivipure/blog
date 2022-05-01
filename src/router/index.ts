import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'


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
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
]

export default createRouter({
    history: createWebHistory(),
    routes: routes,
})