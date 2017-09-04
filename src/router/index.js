import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import CourseIndex from '../pages/CourseIndex'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: require('../pages/Home.vue')
        },
        {
            path: '/CourseIndex',
            name: 'CourseIndex',
            component: require('../pages/CourseIndex.vue')
        },
        {
            path: '/Search',
            name: 'Search',
            component: require('../pages/Search.vue')
        },
        {
            path: '/SearchResult',
            name: 'SearchResult',
            component: require('../pages/SearchResult.vue')
        },
        {
            path: '/CourseDetail',
            name: 'CourseDetail',
            component: require('../pages/CourseDetail.vue')
        },
        {
            path: '/Detail',
            name: 'Detail',
            component: require('../pages/CourseDetail.vue')
        },
    ]
})