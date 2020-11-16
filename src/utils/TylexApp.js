/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

import Vue from 'vue'
import axios from './request'
import { RouterObject } from 'src/router'
import {
    Cookies,
    Loading,
    LoadingBar,
    Notify,

    // optional!, for example below
    // with custom spinner
    QSpinnerGears
} from 'quasar'
import Form from 'src/utils/form/Form'
import {Store} from 'src/store/index'
import ApiRouter from 'src/utils/routes/ApiRouter'
import PermissionsEnum from 'src/utils/roles/PermissionsEnum'

export default class TylexApp {

    constructor() {
        this.permissionsEnum = PermissionsEnum
        this.bus = new Vue()
        this.apiRouter = new ApiRouter()
    }

    /**
     * Return an axios instance configured to make requests to Nova's API
     * and handle certain response codes.
     */
    request(options) {
        if (options !== undefined) {
            return axios(options)
        }

        return axios
    }

    /**
     * Register a listener on Nova's built-in event bus
     */
    $on(...args) {
        this.bus.$on(...args)
    }

    /**
     * Register a one-time listener on the event bus
     */
    $once(...args) {
        this.bus.$once(...args)
    }

    /**
     * Unregister an listener on the event bus
     */
    $off(...args) {
        this.bus.$off(...args)
    }

    /**
     * Emit an event on the event bus
     */
    $emit(...args) {
        this.bus.$emit(...args)
    }

    /**
     * To display loading screen
     *
     * @param message
     * @param options
     */
   $showLoading(message = null, options = {}) {
        options.message = message

        Loading.show(options)
   }

    /**
     * To hide loading screen
     */
   $hideLoading() {
        Loading.hide()
   }

    /**
     * To start AJAX loading bar
     *
     * @param speed
     * @param options
     */
   $startLoadingBar(speed = 150, options = {}) {
       LoadingBar.start()
       this.$setLoadingBarDefault(options)
   }

    /**
     * To stop AJAX loading bar
     */
    $stopLoadingBar() {
        LoadingBar.stop()
    }

    /**
     * To increment in AJAX loading bar
     *
     * @param value
     */
    $incrementLoadingBar(value) {
        LoadingBar.increment(value)
    }

    /**
     * To set configuration values for AJAX loading bar
     *
     * @param options
     */
    $setLoadingBarDefault(options = {}) {
       LoadingBar.setDefaults(options)
    }

    /**
     * To create toast notification
     *
     * @param message
     * @param options
     */
    $notify(message, options = {}) {
        options.message = message

        Notify.create(options)
    }

    /**
     * To display success
     *
     * @param message
     */
    $notifySuccess(message) {
        this.$notify(message, {
            color: 'positive',
            icon: 'check_circle'
        })
    }
    /**
     * To display message
     *
     * @param message
     */
    $notifyMessage(message) {
        this.$notify(message, {
            color: 'primary',
            icon: 'email'
        })
    }

    /**
     * To display info
     *
     * @param message
     */
    $notifyInfo(message) {
        this.$notify(message, {
            color: 'info',
            icon: 'info'
        })
    }

    /**
     * To display error
     *
     * @param message
     */
    $notifyError(message) {
        this.$notify(message, {
            color: 'negative',
            icon: 'error'
        })
    }

    /**
     * To display warning
     *
     * @param message
     */
    $notifyWarning(message) {
        this.$notify(message, {
            color: 'warning',
            icon: 'warning',
            actions: [
                { icon: 'close', color: 'white', handler: () => { /* console.log('wooow') */ } }
            ]
        })
    }

    /**
     * Sets Access Token Value
     *
     * @param token
     */
    $setToken(token) {
        return Cookies.set('tokenKey', token, {
            expires: 365
        })
    }

    /**
     * Removes access token
     */
    $removeToken() {
        return Cookies.remove('tokenKey')
    }

    /**
     * Returns token
     *
     * @returns {string}
     */
    $getToken() {
        return Cookies.get('tokenKey')
    }

    /**
     * This method refreshes the api token
     *
     * @returns {Promise<void>}
     */
    async $refreshToken() {
        let form = new Form({refresh: window.TylexApp.$getToken()['refresh']})
        window.TylexApp.$showLoading('Refreshing Token...')

        await form.post(this.$getRoutePath('refresh_jwt')).then((data) => {
            let token = window.TylexApp.$getToken()
            token['access'] = data.access

            window.TylexApp.$setToken(token)

            window.TylexApp.$hideLoading()

            return data
        }).catch((error) => {
            if (error) {
                if (error.status === 401) {
                    this.$removeToken()
                    RouterObject.go('/login')
                }
            }

            window.TylexApp.$hideLoading()
        })
    }

    /**
     * Gets the logged in user from the server
     *
     * @returns {Promise<T>}
     */
    async $getLoggedInUser() {

        if (this.$loggedInUserInfo()) {
            return new Promise((resolve) => {
                return resolve()
            })
        }

        let form = new Form()
        window.TylexApp.$showLoading('Fetching Info...')

        return await form.get(this.$getRoutePath('users_me')).then((user) => {
            this.$saveLoggedInUser(user)
            Store.commit('user/setLoggedInUser', user)
            window.TylexApp.$hideLoading()
            return user
        }).catch((error) => {
            window.TylexApp.$hideLoading()
        })
    }

    /**
     * Saves logged in user to local storage
     *
     * @param user
     */
    $saveLoggedInUser(user) {
        return Cookies.set('user', user, {
            expires: 1
        })
    }

    /**
     * Removes the logged in user from the storage
     */
    $removeLoggedInUser() {
        return Cookies.remove('user')
    }

    /**
     * Returns logged in user info from the storage
     */
    $loggedInUserInfo() {
        return Cookies.get('user')
    }

    /**
     * Return the api route
     * @param name
     * @returns {*}
     */
    $getRoute(name) {
        return this.apiRouter.getRoute(name);
    }

    /**
     * Returns api route path
     *
     * @param name
     * @param args
     * @returns {*}
     */
    $getRoutePath(name, args) {
        return this.apiRouter.getRoutePath(name, args);
    }
}
