/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

/**
 * @author Muhammad Tayyab <tayyab@tylextech.com>
 */

import apiRoutes from 'src/router/apiRoutes'
import ApiRoute from 'src/utils/routes/ApiRoute'

/**
 * Contains and provides wrapper for api routes for the application
 */
class ApiRouter {
    
    /**
     * Constructor to initialize the class
     */
    constructor () {
        this.routes = []
        
        for(let route in apiRoutes)
        {
            this.routes[apiRoutes[route].name] = new ApiRoute(apiRoutes[route])
        }
    }
    
    /**
     * To get api route by name
     *
     * @param name
     * @param args
     *
     * @returns {*}
     *
     * @todo Find a better way to perform replace functionality and support object key names.
     */
    getRoute(name, args) {
        let route = {...this.routes[name]}
        let index = 0
        
        if (!route) {
            window.TylexApp.$notifyError(
                'This specified api route ('+ name +') doesn\'t exists. '
            )
            
            return route;
        }
    
        let path = route.path.split('/')
        
        /**
         * @todo Find better way to replace arguments in path
         */
        if (args && typeof args === 'object') {
            let objectKeys = Object.keys(args)
            
            let index = 0
            path.forEach((pathValue, key) => {
                if (/:(.*)/.test(pathValue) && key !== (path.length - 1)) {
                    pathValue = pathValue.replace(/(:.*)/, args[objectKeys[index]])
                    path[key] = pathValue
                    index++;
                }
            })
            
            route.path = path.join('/')
        }
        
        if (args && Array.isArray(args)) {
            let path = route.path.split('/')

            path.forEach((pathValue, key) => {
                if (/:(.*)/.test(pathValue) && key !== (path.length - 1)) {
                    pathValue = pathValue.replace(/(:.*)/, args[index])
                    path[key] = pathValue.toString()
                    index++;
                }
            })
    
            route.path = path.join('/')
        }
        
        return route;
    }
    
    /**
     * To return api route path by name
     *
     * @param name
     * @param args
     * @returns {*}
     */
    getRoutePath(name, args) {
        const route = this.getRoute(name, args)
        return route ? route.path : false;
    }

    
}

export default ApiRouter
