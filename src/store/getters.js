const getters = {
    getUsername: state => {
        return state.auth.userProfile.username
    },
    getUserPermissions: state => {
        return state.auth.userProfile.allperms
    },
    getToken: state => {
        return state.auth.credentials.access_token
    },
    getPhotographer_id: state=> {
        return state.auth.userProfile.ref_nbr
    },
    getNames: state => {
        return `${state.auth.userProfile.first_name} ${state.auth.userProfile.last_name}`
    },
    getFirstName: state => {
        return state.auth.userProfile.firstName
    },
    getUserProfile: state => {
        return state.auth.userProfile
    },
    isLoggedIn: state => {
        return state.auth.userProfile ? true : false
    },
    get_cart_count: state => {
        return state.cart_count
    },
}

export { getters }