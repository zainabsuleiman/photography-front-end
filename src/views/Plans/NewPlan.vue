<template>
  <div class="mt-4">
    <button @click="$router.go(-1)" class="btn btn-sm btn-default">Back</button>
    <div class="card mt-2 shadow p-4">
      <div class="row">
        <div class="col-md-6">
          <text-input
            :value="post_data.name || ''"
            :errors="errors.name"
            label="Name"
            placeholder="Enter the name of the industry"
            @type="(v) => (post_data.name = v)"
          />
        </div>
        <div class="col-md-6">
          <text-input
            :value="post_data.price || ''"
            :errors="errors.price"
            label="Price"
            placeholder="Enter the Price of the Plan"
            @type="(v) => (post_data.price = v)"
          />
        </div>

        <div class="col-md-6">
          <text-input
            :value="post_data.currency || ''"
            :errors="errors.currency"
            label="Currency"
            placeholder="Enter the Currency (RWF OR USD)"
            @type="(v) => (post_data.currency = v)"
          />
        </div>

        <div class="col-md-6">
          <text-input
            :value="post_data.number_of_users || ''"
            :errors="errors.number_of_users"
            label="Enter Allowed Users"
            placeholder="Enter Number of Users Allowed"
            @type="(v) => (post_data.number_of_users = v)"
          />
        </div>

        <div class="col-md-6">
          <text-input
            :value="post_data.number_of_branch || ''"
            :errors="errors.number_of_branch"
            label="Enter Allowed Branches"
            placeholder="Enter Number of Branches Allowed"
            @type="(v) => (post_data.number_of_branch = v)"
          />
        </div>

        <button @click="submit" class="btn btn-block col-md-7 mt-3 btn-default">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/TextInput";

import { alert } from "../../utils/alertUtils";
import axios from "axios";
export default {
  name: "New Industry",
  components: {
    "text-input": TextInput,
  },
  data() {
    return {
      errors: {},
      post_data: {},
    };
  },
  methods: {
    submit: function () {
        console.log(this.post_data);
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/api/plans`,
          this.post_data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert.success_center("Plan created successfully!");
          this.post_data = {};
          this.$router.push({ name: "Plans" });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.errors = err.response.data;
            alert.error(
              "An Error occured, kindly check the for for specific errors"
            );
          } else {
            alert.error("An Error occured, Please try again!");
          }
          console.error(err);
        });
    },
  },
};
</script>

<style>
</style>