<template>
  <div>
    <div
      class="service-top hover-cursor"
      @click="
        $router.push({
          name: 'Service Details',
          params: { uuid: service.uuid },
        })
      "
    >
      <img
        :src="backend_url + service.primeImageUrl"
        class="shadow--hover img-center img-fluid"
        alt
        srcset
        id="item-image"
      />
      <div class="overlay">
        <button type="button" class="btn btn-secondary" title="View detail">
          <i class="fa fa-eye"></i>
        </button>
      </div>
    </div>
    <div class="service-bottom mb-5">
      <h3 class="mb-1">{{ service.name }}</h3>
      <star-rating
        v-if="service.ratings <= 5 && service.ratings > 0"
        :rating="service.ratings"
      ></star-rating>
    </div>
  </div>
</template>
<script>
import StarRating from "../components/StarRating";
export default {
  name: "ServiceComponent",
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  components: {
    "star-rating": StarRating
  },
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
    };
  },
};
</script>
<style lang="css" scoped>
#item-image {
  max-height: 255px;
}
img:hover {
  filter: brightness(90%);
}
.service-bottom h3 {
  font: 20px;
  font-weight: 100;
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
.discount-badge {
  position: absolute;
  top: 0%;
  right: 15px;
  font-size: 1.1vmax;
  font-weight: 500;
}

.service-top:hover .overlay {
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

.service-bottom .fa {
  color: gold;
}
</style>
