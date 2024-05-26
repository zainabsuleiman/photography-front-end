
export const GOOGLEMIXIN = {
    mounted() {
        let _this = this
        setTimeout(() => {
            window.gapi.load('auth2', function () {
                let auth2 = window.gapi.auth2.init({
                    client_id: process.env.VUE_APP_GOOGLE_APP_ID,
                    cookiepolicy: 'single_host_origin',
                });
                _this.google_auth2 = auth2
                _this.attachClickHandler()
            });
            console.log('Google Signin was initialized as mixin')
        }, 500)
    },
    data() {
        return {
            google_auth2: {}
        }
    },
    methods: {
        g_on_success: function (googleUser) {
            this.$store.dispatch('social_login', { type: 'google-oauth2', accessToken: googleUser.getAuthResponse(true).access_token })
        },
        attachClickHandler: function () {
            const _this = this
            this.google_auth2.attachClickHandler(
                document.getElementById("google_login"),
                {},
                _this.g_on_success,
                (err) => {
                    console.log(err);
                }
            );
        }
    }
}