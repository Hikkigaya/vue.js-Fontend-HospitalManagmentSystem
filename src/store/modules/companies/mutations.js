/*
 * Copyright (c) 2019 @TylexTech All Rights Reserved.
 */
import Vue from 'vue'

export function setCompanyTypes (state, companyTypes) {
    Vue.set(state,'companyTypes', companyTypes)
}

export function setCompanies (state, companies) {
    Vue.set(state,'companies', companies)
}

