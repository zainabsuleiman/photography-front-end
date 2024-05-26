<template>
  <div class="card shadow p-4 text-center bg-gradient-default text-white w-75">
    <h3 v-if="$route.query.email" class="text-white pb-2">
      We've sent a verification email to
      <span class="text-lg">{{ $route.query.email }}</span> <br />
      <br />
      Kindly check your email to verify your account
    </h3>
    <h3 v-if="$route.query.tkn && !email_verified" class="text-white pb-3">
      Verifying email
    </h3>
    <h3 v-if="email_verified" class="text-white pb-3">
      Email verified successfully
    </h3>
    <loader v-if="$route.query.tkn && !email_verified"></loader>
    <em v-if="email_verified" class="fas fa-5x fa-check-circle"></em>
    <router-link v-if="email_verified" to="/login" class="btn btn-default mt-3"
      >Click here to login</router-link
    >
    <p v-if="$route.query.email" class="pt-2">
      Didn't receive an email?
      <span @click="resend_email" class="text-white text-underline hover-cursor">send again</span>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/IndepedentLoader";
import { alert } from "@/utils/alertUtils";
export default {
  name: "VerifyEmail",
  components: {
    loader: Loader,
  },
  data() {
    return {
      email_verified: false,
    };
  },
  methods: {
    verify_email: function () {
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_URL}/api/verify_email/${this.$route.query.tkn}`,
          {}
        )
        .then((res) => {
          console.log(res);
          this.email_verified = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    resend_email: function () {
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/api/resend/verify_email/`, {
          email: this.$route.query.email,
        })
        .then((res) => {
          console.log(res);
          alert.success_center('Email Sent!')
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    if (this.$route.query.tkn) {
      this.verify_email();
    }
  },
};
</script>

<style>
</style>