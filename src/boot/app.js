/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */
require('../utils/init')
import Vue from 'vue'

window.TylexApp = new window.CreateTylexApp()
Vue.prototype.$TylexApp = window.TylexApp

