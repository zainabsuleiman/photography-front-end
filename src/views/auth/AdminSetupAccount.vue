<template>
  <div class="col-lg-8 col-md-10">
    <div class="card shadow-lg bg-gradient-secondary border-0 mb-0">
      <div class="card-body px-lg-5 py-lg-3 row">
        <div class="col-md-12">
          <h2 class>Setup Your Account</h2>
          <hr class="my-0 mb-3" />
          <div class="ml-3 row">
            <div class="form-group col-md-6">
              <label class="form-control-label">First Name</label>
              <input
                class="form-control form-control-alternative"
                placeholder="Enter your First Name"
                name="first_name"
                v-model="post_data.first_name"
              />
              <label
                v-for="error in errors.first_name"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">Last Name</label>
              <input
                class="form-control form-control-alternative"
                placeholder="Enter your Last Name"
                name="last_name"
                v-model="post_data.last_name"
              />
              <label
                v-for="error in errors.last_name"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">Email</label>
              <input
                class="form-control form-control-alternative"
                placeholder="email"
                v-model="post_data.email"
                type="email"
              />
              <label
                v-for="error in errors.email"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
            <div class="col-md-6"></div>
            <div class="form-group col-md-6">
              <label class="form-control-label">Password</label>
              <input
                class="form-control form-control-alternative"
                placeholder="Password"
                v-model="post_data.password"
                name="password"
                type="password"
              />
              <label
                v-for="error in errors.password"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
            <div class="col-md-6">
              <text-input
                :value="confirm_password"
                :errors="errors.confirm_password"
                label="Confirm Password"
                placeholder="Confirm"
                @type="validate_password"
                :is_password="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        :disabled="!valid"
        type="button"
        @click="create_admin_user"
        class="btn btn-lg btn-default px-8 my-4"
        :style="valid?'':styleObject"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TextInput from "../../components/TextInput";
import { alert } from "../../utils/alertUtils";
export default {
  components: {
    "text-input": TextInput,
  },
  data() {
    return {
      entity: {},
      post_data: {},
      confirm_password: "",
      valid: false,
      errors: {
        description: [],
      },
        styleObject: {
    cursor: 'not-allowed',
  }
    };
  },
  methods: {
    validate_password: function (confirm_p) {
      this.confirm_password = confirm_p;
      if (this.confirm_password != this.post_data.password) {
        this.errors.confirm_password = ["passwords do not match"];
        this.valid = false;
      } else {
        this.errors.confirm_password = [];
        this.valid = true;
      }
    },
    get_entity: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/entities/public/${this.$route.query.tkn}`
        )
        .then((res) => {
          console.log(res);
          this.entity = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    create_admin_user: function () {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/entities/${this.entity.uuid}/admin/account_setup/`;
      axios
        .post(url, this.post_data)
        .then((res) => {
          console.log(res);
          alert.success("account successfully created");
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err.response);
          if (err.status === 400) {
            alert.error(
              "Form error occured please check all fields and try again"
            );
            this.errors = err.response.data;
          } else {
            alert.error(
              "An error occured please try again,if the error persist kindly contact the owner of this site!"
            );
          }
        });
    },
  },
  created() {
    this.get_entity();
  },
};
</script>
<style lang="">
</style>