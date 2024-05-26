
export const FBMIXIN = {
    mounted() {
        let _this = this
        setTimeout(() => {
            window.FB.init({
                appId: process.env.VUE_APP_FACEBOOK_APP_ID,
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: 'v10.0'
            })
            window.FB.AppEvents.logPageView()
            window.FB.getLoginStatus(function (response) {
                _this.statusChangeCallback(response);
            });
            _this.FB = window.FB
            console.log('FB SDK was initialized as mixin')
        }, 500)
    },
    data() {
        return {
            FB: {}
        }
    },
    methods: {
        statusChangeCallback: function (res) {
            if (res.status === 'connected') {
                this.$store.dispatch('social_login', { type: 'facebook', accessToken: res.authResponse.accessToken })
            } else {
                console.log(res)
            }
        },
        facebook_login_trigger: function () {
            const _this = this;
            this.FB.login(_this.statusChangeCallback, {
                scope: "public_profile,email",
            });
        },
    }
}