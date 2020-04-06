import Vue from 'vue';
import VueRouter from "vue-router";
import App from "./App.vue";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '*', component: App
    }]
});

function hasQueryParams(route) {
    return !!Object.keys(route.query).length
}

export default router;
