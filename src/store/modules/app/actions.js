/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

export async function initApp( {commit} , userId) {
    window.TylexApp.$showLoading('Fetching Initial Data...')
    
    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("app_init_list", [ userId ]))
        .then(response => {
            const initialData = response.data
            
            commit('setDoctors', initialData.doctors)
            commit('setAppSettings', initialData.app_settings)
            commit('appointments/setAppointmentStatuses', initialData.appointment_statuses, {root: true})
            commit('appointments/setAppointmentTestStatuses', initialData.appointment_test_statuses, {root: true})
            commit('diagnosis/setDiagnosisStatuses', initialData.diagnosis_statuses, {root: true})

            window.TylexApp.$hideLoading()
        })
        .catch( error => {
            return error;
        })
}
