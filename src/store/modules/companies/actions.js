export async function getAllCompanyTypes( {commit}) {
    window.TylexApp.$showLoading('Fetching Company Types...')
    
    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("companies_types_all_list"))
        .then(response => {
            window.TylexApp.$hideLoading()
            commit('setCompanyTypes', response.data)
            
            return response.data
        })
        .catch( error => {
            return error;
        })
}

export async function getAllCompanies( {commit}) {
    window.TylexApp.$showLoading('Fetching Companies...')
    
    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("companies_all_list"))
        .then(response => {
            window.TylexApp.$hideLoading()
            commit('setCompanies', response.data)
            
            return response.data
        })
        .catch( error => {
            return error;
        })
}

