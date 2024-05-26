<template>
  <div class="col-lg-5 col-md-7">
    <div class="card shadow-lg bg-gradient-secondary border-0 mb-0">
      <div class="card-body px-lg-5 py-lg-5">
        <!-- <div class="d-flex mb-4 justify-content-center">
          <button
            @click="facebook_login_trigger"
            type="button"
            class="btn btn-facebook btn-icon"
          >
            <span class="btn-inner--icon"
              ><em class="fab fa-facebook"></em
            ></span>
            <span class="btn-inner--text">Facebook</span>
          </button>
          <button
            id="google_login"
            type="button"
            class="btn btn-google-plus btn-icon"
          >
            <span class="btn-ianner--icon"><em class="fab fa-google"></em></span>
            <span class="btn-inner--text">Google</span>
          </button>
        </div> -->
        <form role="form">
          <div class="form-group mb-3">
            <div class="input-group input-group-merge input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-single-02"></i
                ></span>
              </div>
              <input
                class="form-control"
                placeholder="username"
                v-model="username"
                type="text"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group input-group-merge input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-lock-circle-open"></i
                ></span>
              </div>
              <input
                class="form-control"
                placeholder="Password"
                type="password"
                v-model="password"
              />
            </div>
          </div>
          <div class="text-center">
            <button-cta
              label="Sign In"
              @click="login"
              class="btn btn-success mt-3"
              :isBusy="isLoading"
              :disabled="!isFormValid"
            >
            </button-cta>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <router-link to="/forgot_password" class="text-dark"
          ><small>Forgot password?</small></router-link
        >
      </div>
      <div class="col-6 text-right">
        <router-link to="/register" class="text-dark"
          ><small>Create new account</small>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ alias to /src
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  components: {
    ButtonCta
  },
  data() {
    return {
      username: "",
      password: "",
      isLoading: false
    };
  },
  computed: {
    isFormValid() {
      // const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return this.username.length > 0 && this.password.length > 4;
    }
  },
  methods: {
    async login() {
      this.isLoading = true;
      await this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
      this.isLoading = false;
    }
  },
  created() {}
};
</script>

<style></style>
