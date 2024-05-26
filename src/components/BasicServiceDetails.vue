<template>
  <div class="card shadow w-100 p-4">
    <h4 class="text-right">Basic info</h4>
    <div class="row">
      <div class="col-md-4">
        <div>
          <label class="form-control-label">{{ service.name }}</label> <br />
          <img
            :onerror="`this.src='${$img_placeholder}';`"
            class="img-fluid"
            style="height: 200px"
            v-if="service.primeImageUrl"
            :src="backend_url + service.primeImageUrl"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <label class="form-control-label">Description</label> <br />
          <span
            class="text-muted"
            v-if="service.description"
            v-html="
              service.description.length > 150
                ? service.description.substring(0, 150) + '...'
                : service.description
            "
          ></span>
        </div>
        <div class="mt-3">
          <label class="form-control-label">Price</label> <br />
          <span class="text-muted">{{ service.price }} RWF</span>
        </div>
        <div class="mt-3">
          <label class="form-control-label">Published</label>
          <div class="col-md-4">
            <label class="custom-toggle text-white">
              <input
                id="change_visibility"
                type="checkbox"
                :checked="service.visibilityStatus"
                @change="changeFn"
              />
              <span
                class="custom-toggle-slider rounded-circle bg-default"
                data-label-off="No"
                data-label-on="Yes"
              ></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="gotoUpdate(service.uuid)" class="btn btn-primary btn-sm float-right mr-2">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { alert } from "../utils/alertUtils";
export default {
  name: "Basic Service Details",
  props: {
    service: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    gotoUpdate: function (uuid) {
      this.$router.push({ name: "Update Service", params: { uuid } });
    },
    changeFn: function (e) {
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_URL}/api/services/${this.service.uuid}/change_visibility`,
          {
            status: e.target.checked,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
            },
          }
        )
        .then(() => {
          this.$emit("change");
          alert.success_center(
            e.target.checked
              ? "service successfully published!"
              : "service successfully removed from the eyes of the public"
          );
        })
        .catch((err) => {
          console.error(err);
          alert.error("Something went wrong! try again.");
          this.$emit("change");
        });
    },
  },
};
</script>

<style>
</style>