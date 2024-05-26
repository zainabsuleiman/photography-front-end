const mutations = {
    mutateUserProfile: (state, payload) => {
        state.auth.userProfile = payload
    },
    mutateCredentials: (state, payload) => {
        state.auth.credentials = payload
    },
    update_cart: (state, payload) => {
        state.cart_count = payload
    },
    setCurrentTab(state, payload) {
        state.currentTab = payload
    },
    setValidation(state, payload) {
        state.v = payload;
    },
    completedProfileSetup(state, payload) {
        state.completedProfileSetup = payload;
    }
}

export {mutations}