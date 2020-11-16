export async function getGroup( {commit} , groupId) {
    window.TylexApp.$showLoading('Fetching Group Info...')
    
    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("groups_read", [ groupId ]))
        .then(response => {
            const group = response.data
            window.TylexApp.$hideLoading()
            
            return group;
        })
        .catch( error => {
            return error;
        })
}

export async function getAllPermissions( {commit}) {
    window.TylexApp.$showLoading('Fetching Permissions...')
    
    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("permissions_all_list"))
        .then(response => {
            window.TylexApp.$hideLoading()
            return response.data
        })
        .catch( error => {
            return error;
        })
}

export async function getAllGroups( {commit}) {
    window.TylexApp.$showLoading('Fetching Permissions...')

    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("groups_all_list"))
        .then(response => {
            window.TylexApp.$hideLoading()
            return response.data
        })
        .catch( error => {
            return error;
        })
}

