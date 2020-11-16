/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (window.TylexApp.$getToken()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            // config.headers['X-Token'] = Cookies.get(Store.state.app.tokenKey)
            // config.headers['Content-Type'] = 'application/json'
            config.headers.Authorization = 'Bearer ' + window.TylexApp.$getToken()['access']
        }
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */
    
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        return response
    },
    error => {
        if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
            window.TylexApp.$refreshToken().then((data) => {
                if (!window.TylexApp.$loggedInUserInfo()) {
                    window.TylexApp.$getLoggedInUser()
                }
            }).catch((error) => {
            
            })
        }
        
        return Promise.reject(error)
    }
)

window.axios = service

export default service
