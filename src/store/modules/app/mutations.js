/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

import {Cookies} from 'quasar'
import Vue from 'vue'

export function toggleLeftDrawer ( state ) {
    state.leftDrawerOpen = !state.leftDrawerOpen
    Cookies.set('drawerState', state.leftDrawerOpen)
}

export function setAppSettings (state, settings) {
    Vue.set(state, 'appSettings', settings)
    // state.appSettings = settings
}

export function setDoctors (state, doctors) {
    Vue.set(state, 'doctors', doctors)
    // state.doctors = doctors
}
