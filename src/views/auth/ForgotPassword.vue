<template>
  <div class="col-lg-5 col-md-7">
    <div class="card shadow-lg bg-gradient-secondary border-0 mb-0">
      <div class="card-body px-lg-5">
        <text-input
          value=""
          :errors="errors.email"
          placeholder="Enter Your Email"
          @type="v => (email = v)"
          :is_password="false"
        ></text-input>
        <button-cta
          label="Submit"
          @click="submit"
          class="btn btn-block btn-default"
          :isBusy="isLoading"
        >
        </button-cta>
      </div>
    </div>
  </div>
</template>

<script>
// @ alias to /src
import TextInput from "@/components/TextInput";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  name: "Forgot Password",
  components: {
    TextInput,
    ButtonCta
  },
  data() {
    return {
      email: "",
      errors: {},
      isLoading: false
    };
  },
  methods: {
    async submit() {
      if (this.email) {
        this.isLoading = true;
        await this.$store.dispatch("forgot_password", {
          email: this.email
        });
        this.isLoading = false;
      }
    }
  }
};
</script>

<style></style>
