/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

import Vue from 'vue'
import Vuex from 'vuex'

// import example from './app'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */


// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', false, /\.js$/)
const modulesCustomFiles = require.context('./modules', true, /(index\.js$)$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
var modules = modulesCustomFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleNameFull = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const moduleName = moduleNameFull.match(/(.+)\//, '$1')
  const value = modulesCustomFiles(modulePath)

  modules[moduleName[1]] = value.default
  return modules
}, {})

// export default new Vuex.Store({
//         modules: modules,
//
//         // enable strict mode (adds overhead!)
//         // for dev mode only
//         strict: process.env.DEV
// })

const Store = new Vuex.Store({
    modules: modules,
    
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
})


export default function (/* { ssrContext } */) {

    return Store
}

export { Store }
