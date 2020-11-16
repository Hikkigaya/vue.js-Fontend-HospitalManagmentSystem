export async function fetchPatientDiagnoses ({commit}, patient_id) {
    window.TylexApp.$showLoading('Fetching Diagnoses List')
    let filters = {
        patient_id: patient_id
    }
    
    return await window.TylexApp.request()
        .get(window.TylexApp.$getRoutePath('diagnosis_all_list'), {
            params: filters
        }).then((response) => {
            return response.data
        }).catch(error => {
        
        }).finally(() => {
            window.TylexApp.$hideLoading()
        })
}
