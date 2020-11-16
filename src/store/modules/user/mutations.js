import UserRoutes from 'src/utils/routes/UserRoutes'

export function setLoggedInUser (state, user) {
    state.loggedInUser = user
    UserRoutes(user)
}
