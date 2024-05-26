<template>
  <div>
    <div class="container mt-4">
      <h2>({{products.length+services.length+businesses.length}}) Results Found with '{{$route.query.search}}'</h2>
      <section class="products-section" v-if="products.length>0">
        <h4>Products ({{products.length}})</h4>
        <div class="row">
          <div
            class="col-6 col-sm-6 col-md-3 col-lg-3"
            v-for="product in products"
            :key="product.uuid"
          >
            <product-card :product="product">
              <template v-slot:star-rating>
                <star-rating :rating="product.rating" />
              </template>
            </product-card>
          </div>
        </div>
      </section>
      <section class="services-section" v-if="services.length>0">
        <h4>Services ({{services.length}})</h4>
        <div class="row">
          <div
            class="col-6 col-sm-6 col-md-3 col-lg-3"
            v-for="service in services"
            :key="service.uuid"
          >
            <service-component :service="service">
              <template v-slot:star-rating-service>
                <star-rating :rating="service.rating" />
              </template>
            </service-component>
          </div>
        </div>
      </section>
      <section class="busineses-section" v-if="businesses.length>0">
        <h4>Businesses ({{businesses.length}}) </h4>
        <div class="row mt-1">
      <div class="col-md-4 col-sm-6 col-12 mt-6" v-for="entity in businesses" :key="entity.uuid">
        <router-link :to="{name:'Company Profile', params:{uuid:entity.uuid}}">
        <div class="card card-profile">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-profile-image">
                
                  <img
                    :src="backend_url+entity.logo"
                    class="rounded-circle shadow-lg bg-white"
                    :onerror="`this.src='${$img_placeholder}';`"
                  />
               
              </div>
            </div>
          </div>
          <div class="card-header text-center border-0 pt-6 pt-md-4 pb-0 pb-md-4">
            <div class="d-flex justify-content-between">
              <!-- <a href="#" class="btn btn-sm btn-info mr-4">
                <em class="fab fa-twitter"></em> Follow Us
              </a>
              <a href="#" class="btn btn-sm btn-default float-right">
                <em class="fas fa-paper-plane"></em> Mail
              </a> -->
            </div>
          </div>

          <div class="card-body pt-0">
            <h2 class="h3 mt-4 text-center">{{entity.name}}</h2>
            <div class="text-center">
              <div class="h5 font-weight-300">
                <em class="fas fa-phone mr-2"></em>
                {{entity.phone}}
              </div>
              <div class="h5 font-weight-300">
                <em class="ni ni-email-83 mr-2"></em>
                {{entity.email}}
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
      </section>
    </div>
  </div>
</template>
<script>
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import ServiceComponent from "../components/ServiceComponent";
import axios from "axios";

export default {
  name: "SearchView",
  components: {
    "product-card": ProductCard,
    "star-rating": StarRating,
    "service-component": ServiceComponent
  },
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      search: "",
      products: [],
      services: [],
      businesses: []
    };
  },
  watch: {
    $route() {
      this.search = this.$route.query.search;
      this.fetch_products(this.search);
      this.fetch_services(this.search);
      this.fetch_businesses(this.search);
    }
  },
  created() {
    this.search = this.$route.query.search;
    this.fetch_products(this.search);
    this.fetch_services(this.search);
    this.fetch_businesses(this.search);
  },
  methods: {
    fetch_products: function(search) {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/products/all/search/?search=${search}`;
      axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            this.products = res.data.filter(pr => pr.visibilityStatus);
            this.search = "";
          }
        })
        .catch(err => {
          alert("error occured" + err);
        });
    },

    fetch_services: function(search) {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/services/all/search/?search=${search}`;
      axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            this.services = res.data;
            this.search = "";
          }
        })
        .catch(err => {
          alert("error" + err);
        });
    },

    fetch_businesses: function(search) {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/entities/all/search/?search=${search}`;
      axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            this.businesses = res.data;
            this.search = "";
          }
        })
        .catch(err => {
          alert("error occured" + err);
        });
    },

    // function to return the percentage of women in an entit
    getWomenPercentage(entity) {
      var women_percentage =
        (entity.no_of_women_employees * 100) / entity.no_of_employees;
      return women_percentage.toFixed(2);
    }
  }
};
</script>
<style lang="css" scoped>
</style>