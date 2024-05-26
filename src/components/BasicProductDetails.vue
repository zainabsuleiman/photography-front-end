<template>
  <div class="card shadow w-100 p-4">
    <h4 class="text-right">Basic info</h4>
    <div class="row">
      <div class="col-md-4">
        <div>
          <label class="form-control-label">{{ product.name }}</label> <br />
          <img
            :onerror="`this.src='${$img_placeholder}';`"
            class="img-fluid"
            style="height: 200px"
            v-if="product.primeImageUrl"
            :src="backend_url + product.primeImageUrl"
            alt=""
          />
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <label class="form-control-label">Description</label> <br />
          <span
            class="text-muted"
            v-if="product.description"
            v-html="
              product.description.length > 150
                ? product.description.substring(0, 150) + '...'
                : product.description
            "
          ></span>
        </div>
        <div class="mt-3">
          <label class="form-control-label">Price</label> <br />
          <span class="text-darker text-md">
            <em class="fas mr-1 fa-tag"></em>
            <span v-if="product.discount"
              >{{ $num_format(get_price) }} RWF</span
            >
            <span :class="product.discount ? 'text-cross ml-2 text-muted' : ''"
              >{{ $num_format(product.price) }} RWF</span
            >
            <span
              v-if="product.discount"
              class="badge-warning badge badge-pill ml-2"
              >{{ product.discount }}% off</span
            >
          </span>
        </div>
        <div class="mt-3">
          <label class="form-control-label">Published</label>
          <div class="col-md-4">
            <label class="custom-toggle text-white">
              <input
                id="change_visibility"
                type="checkbox"
                :checked="product.visibilityStatus"
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
      <button
        v-if="$route.name !== 'Product Variations'"
        @click="gotoVariation(product.uuid)"
        class="btn btn-default btn-sm float-right"
      >
        Manage variations
      </button>
      <button
        v-if="$route.name !== 'Product Gallery'"
        @click="gotoGallery(product.uuid)"
        class="btn btn-default btn-sm float-right"
      >
        Manage Gallery
      </button>
      <button
        @click="gotoUpdate(product.uuid)"
        class="btn btn-primary btn-sm float-right mr-2"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { alert } from "../utils/alertUtils";
export default {
  name: "Basic Product Details",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    get_price() {
      if (this.product.discount) {
        return (
          this.product.price -
          this.product.price * (this.product.discount / 100)
        );
      }
      return this.product.price;
    },
  },
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    gotoVariation: function (uuid) {
      this.$router.push({ name: "Product Variations", params: { uuid } });
    },
    gotoUpdate: function (uuid) {
      this.$router.push({ name: "Update Product", params: { uuid } });
    },
    gotoGallery: function (uuid) {
      this.$router.push({ name: "Product Gallery", params: { uuid } });
    },
    changeFn: function (e) {
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_URL}/api/products/${this.product.uuid}/change_visibility`,
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
              ? "this product was successfully published!"
              : "The product was successfully removed from the eyes of the public"
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

<style scoped>
.text-cross {
  text-decoration: line-through;
}
</style>