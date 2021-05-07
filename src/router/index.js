import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../view/home.vue'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path:'/',
            name: 'home',
            component: () => import('@/view/home.vue'),
            meta:{
                title: "极客晨星元旦1元秒杀活动"
            }
            // children: [
            //     {
            //         path: '/index',
            //         name: 'index',
            //         component: () => import('@/view/index.vue')
            //     }
            // ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/login.vue'),
            meta:{
                title: "极客晨星元旦1元秒杀活动"
            }
        },
        {
            path: '/success',
            name: 'success',
            component: () => import('@/view/success.vue'),
            meta:{
                title: "极客晨星元旦1元秒杀活动"
            }
        },
        {
            path: '/timeout',
            name: 'timeout',
            component: () => import('@/view/timeout.vue'),
            meta:{
                title: "极客晨星元旦1元秒杀活动"
            },
            children:[
                {
                    path: '',
                    name: '',
                    component: () => import('@/view/timeout.vue')
                }
            ]
        }
    ]
})
export default router;