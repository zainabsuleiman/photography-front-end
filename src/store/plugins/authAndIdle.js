export const idleAndAuthPlugin = store => {
    store.subscribe((mutation, state) => {
        if (mutation.type === "idleVue/IDLE_CHANGED" && mutation.payload === true) {
            store.dispatch('logout')
        }
        if (mutation.type === "mutateCredentials" && mutation.payload !== null) {
            var expiry = (state.auth.credentials.expires_in * 1000) - (((state.auth.credentials.expires_in * 1000) * 10) / 100);
            setTimeout(() => {
                store.dispatch('refreshToken')
            }, expiry)
        }
    })
}