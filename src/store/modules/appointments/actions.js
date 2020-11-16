export async function getAllAppointments( {commit}) {
    window.TylexApp.$showLoading('Fetching Appointments...')

    return await window.TylexApp.request().get(window.TylexApp.$getRoutePath("appointments_all_list"))
        .then(response => {
            commit('setAppointments', response.data)

            return response.data
        })
        .catch( error => {
            return error;
        })
        .finally(() => {
            window.TylexApp.$hideLoading()
        })
}

export async function getDayAppointments ({commit}, date) {
    const filter = {
        date: date
    }
    return await window.TylexApp.request().get(
        window.TylexApp.$getRoutePath("appointments_all_list"),
        {
            params: filter
        })
        .then(response => {
            commit('setAppointments', response.data)

            return response.data
        })
        .catch( error => {
            return error;
        })
        .finally(() => {
            window.TylexApp.$hideLoading()
        })
}
export async function getAppointmentCounts ({commit}, date) {
    const filter = {}

    if (date.dateStart) {
        filter.date__gte = date.dateStart
    }

    if (date.dateEnd) {
        filter.date__lte = date.dateEnd
    }

    return await window.TylexApp.request().get(
        window.TylexApp.$getRoutePath("appointments_count_list"),
        {
            params: filter
        })
        .then(response => {
            commit('setAppointmentCounts', response.data.appointments)

            return response.data
        })
        .catch( error => {
            return error;
        })
        .finally(() => {
            window.TylexApp.$hideLoading()
        })
}

export async function fetchPatientAppointments ({commit}, patient__id) {
    window.TylexApp.$showLoading('Fetching Appointments List')
    let filters = {
        patient__id: patient__id
    }

    return await window.TylexApp.request()
        .get(window.TylexApp.$getRoutePath('appointments_all_list'), {
            params: filters
        }).then((response) => {
            return response.data
        }).catch(error => {

        }).finally(() => {
            window.TylexApp.$hideLoading()
        })
}
