import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls';
// import { idleAndAuthPlugin } from "./authAndIdle";

var ls = new SecureLS({ isCompression: true });

const plugins = [
    createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
        }
    }),
    // idleAndAuthPlugin
]

export { plugins }