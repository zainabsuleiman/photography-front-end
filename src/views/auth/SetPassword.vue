<template>
  <div
    class="card shadow-lg bg-gradient-secondary border-0 mb-0 w-40 justify-content-center p-5"
  >
    <text-input
      @type="val => (password = val)"
      label="Password"
      placeholder="Enter your new password"
      :is_password="true"
    ></text-input>
    <button-cta
      @click="set_password"
      label="Set password"
      :isBusy="isLoading"
    ></button-cta>
  </div>
</template>

<script>
// @ is an alias to /src
import TextInput from "@/components/TextInput";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  name: "Set Password",
  components: {
    TextInput,
    ButtonCta
  },
  data() {
    return {
      password: "",
      isLoading: false
    };
  },
  methods: {
    async set_password() {
      if (this.password) {
        this.isLoading = true;
        await this.$store.dispatch("set_password", {
          token: this.$route.query.tkn,
          password: this.password
        });
        this.isLoading = false;
      }
    }
  }
};
</script>

<style></style>
