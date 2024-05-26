import { router } from "../router";
import { store } from "../store";
const guards = {
    is_super_admin: () => {
        if (store.getters.getUserProfile.is_admin) {
            return true
        }
        return false
    },
    is_photographer:()=>{
    if (store.getters.getUserProfile.role === 2){
    return true
    }
     return false
    },
    is_client:()=>{
        if (store.getters.getUserProfile.role === 3){
        return true
        }
         return false
        },
    has_perm: (perm) => {
        if (!guards.is_super_admin()) {
            if (store.getters.getUserPermissions.find(permision => permision === perm))
                return true
            return false
        }
        return true
    },
    is_Admin: () => {
        if (store.getters.getUserProfile.groups.find(group => group.name === process.env.VUE_APP_ADMIN_GROUPNAME))
            return true
        return false
    },
    is_Agent: () => {
        if (store.getters.getUserProfile.groups.find(group => group.name === process.env.VUE_APP_AGENT_GROUPNAME))
            return true
        return false
    },
    is_logged_in: () => {
        if(store.state.auth.credentials !== null)
            if (store.getters.getUserProfile.is_email_verified)
                return true
            else
                return router.push({ name: 'Verify Email', query: { email: store.getters.getUserProfile.username } })
        return false
    }
}

export { guards }
