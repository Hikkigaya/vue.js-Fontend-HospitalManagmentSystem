/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Cookies, LocalStorage } from 'quasar'
import { Store } from 'src/store'

import routes from './routes'

Vue.use(VueRouter)
let RouterObject = null
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
export default function (/* { store, ssrContext } */) {
    const Router = new VueRouter({
        scrollBehavior: () => ({ x: 0, y: 0 }),
        routes,
        
        // Leave these as is and change from quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE
    })
    
    Router.beforeEach((to, from, next) => {
        // console.log(isAuthenticated())
        if (to.matched.some(record => record.meta.guest) && !isAuthenticated()) {
            next()
        } else if (to.matched.some(record => record.meta.guest) && isAuthenticated()) {
            next({ name: 'dashboard' })
        } else if (isAuthenticated()) {
            if (to.matched.some(record => record.meta.logout)) {
                let result = LocalStorage.remove('user')
                next({ name: 'login' })
            }
            
            next()
        } else {
            next({ name: 'login' })
        }
    })
    
    function isAuthenticated () {
        // returns true or false
        // console.log(Cookies.get(Store.state.app.tokenKey))
        
        let result = window.TylexApp.$getToken()
        
        return !!result;
    }
    
    RouterObject = Router
    
    return Router
}

export { RouterObject }
