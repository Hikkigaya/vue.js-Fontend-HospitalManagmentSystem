/*
 * Copyright (c) 2019 @TylexTech All Rights Reserved.
 */


import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
