export async function getUser( {commit} , userId) {
    window.TylexApp.$showLoading('Fetching User Info...')

    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("users_get", [ userId ]))
        .then(response => {
            const user = response.data
            window.TylexApp.$hideLoading()

            return user;
        })
        .catch( error => {
            return error;
        })
}
