export async function fetchPatientPrescriptions ({commit}, patient_id) {
    window.TylexApp.$showLoading('Fetching Prescriptions List')
    let filters = {
        patient_id: patient_id
    }
    
    return await window.TylexApp.request()
        .get(window.TylexApp.$getRoutePath('prescriptions_all_list'), {
            params: filters
        }).then((response) => {
            return response.data
        }).catch(error => {
        
        }).finally(() => {
            window.TylexApp.$hideLoading()
        })
}
