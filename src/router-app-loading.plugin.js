import store from '@/store'
import { watch } from 'vue'

const appLoadingManagementRouterPlugin = (router) => {
    const unRegisterRouterHook = router.beforeEach((to) => {
        if (to.meta.requiresAppReady && !store.ready) {
            console.debug(`App is not ready redirect to /#/loading?redirect=${to.fullPath}`)
            return { name: 'LoadingView', query: { redirect: to.fullPath }, replace: true }
        }
    })

    const unWatchStore = watch(
        () => store.ready,
        (newReadyState) => {
            if (newReadyState) {
                unRegisterRouterHook()
                unWatchStore()
                const redirect = router.currentRoute.value.query.redirect || '/help'
                console.debug('App is ready redirect to ', redirect)
                router.replace(redirect)
            }
        }
    )
}

export default appLoadingManagementRouterPlugin
