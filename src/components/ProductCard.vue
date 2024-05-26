<template>
  <div>
    <div
      class="product-top hover-cursor"
      @click="$router.push(`/product/${product.uuid}/details`)"
    >
      <img
        :src="backend_url + product.primeImageUrl"
        :onerror="`this.src='${$img_placeholder}';`"
        class="shadow--hover img-center"
        alt=""
        id="item-image"
      />
      <div class v-if="product.discount > 0">
        <span class="badge-danger badge-md discount-badge px-2 py-0"
          >{{ product.discount }}% off</span
        >
      </div>
      <div class="overlay">
        <button type="button" class="btn btn-secondary" title="Buy Now">
          <i class="fa fa-money-bill-alt"></i>
        </button>
        <button type="button" class="btn btn-secondary" title="add to cart">
          <i class="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <div class="product-bottom mb-5">
      <h3>{{ product.name }}</h3>
      <div class="d-flex justify-content-start">
        <div class>
          <span
            class="mr-3"
            :style="[product.discount > 0 ? discount_style : no_discound_style]"
            >{{ $num_format(product.price) }} RWF</span
          >
        </div>
        <div class v-if="product.discount > 0">
          <span style="font-weight: 500"
            >{{
              $num_format(
                product.price - (product.price * product.discount) / 100
              )
            }}rwf</span
          >
        </div>
      </div>
      <star-rating
        v-if="product.ratings <= 5 && product.ratings > 0"
        :rating="product.ratings"
      ></star-rating>
    </div>
  </div>
</template>
<script>
import StarRating from "../components/StarRating";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    "star-rating": StarRating
  },
  data() {
    return {
      discount_style: {
        color: "grey",
        textDecorationLine: "line-through",
      },
      no_discound_style: {
        fontWeight: "500",
      },
      backend_url: process.env.VUE_APP_BACKEND_URL,
    };
  },
};
</script>
<style lang="css" scoped>
.discount-badge {
  position: absolute;
  top: 0%;
  right: 15px;
  font-size: 1.1vmax;
  font-weight: 500;
}
img {
  width: 100%;
  height: auto;
}
img:hover {
  filter: brightness(90%);
}
#item-image {
  max-height: 255px;
}

.product-bottom h3 {
  font: 20px;
  font-weight: 100;
}

.product-bottom h5 {
  font-size: 15px;
  padding-bottom: 10px;
}

.overlay {
  display: block;
  opacity: 0;
  position: absolute;
  top: 3%;
  margin-left: 0;
  width: 60px;
  transition: 1s ease-in-out;
}

.product-top:hover .overlay {
  opacity: 1;
  margin-left: 5%;
  transition: 0.9s;
}

.overlay .fa {
  cursor: pointer;
  background-color: #fff;
  color: #000;
  height: 25px;
  width: 25px;
  font-size: 14px;
  padding: 3px;
  margin: 2%;
  margin-bottom: 2%;
}

.overlay .btn-secondary {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.product-bottom .fa {
  color: gold;
}
</style>
