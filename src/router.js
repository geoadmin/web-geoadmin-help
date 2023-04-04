import { createRouter, createWebHashHistory } from 'vue-router'
import LoadingView from '@/LoadingView.vue'
import HelpView from '@/HelpView.vue'
import appLoadingManagementRouterPlugin from "@/router-app-loading.plugin";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'HelpView' },
        },
        {
            path: '/loading',
            name: 'LoadingView',
            component: LoadingView,
        },
        {
            path: '/help',
            name: 'HelpView',
            component: HelpView,
            meta: {
                requiresAppReady: true,
            },
        },
    ],
})

appLoadingManagementRouterPlugin(router)

export default router
