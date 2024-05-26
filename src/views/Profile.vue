<template>
  <div class="main-content" id="panel">
    <!-- Topnav -->
    <!-- Header -->
    <!-- Header -->
    <div
      class="header pb-6 d-flex align-items-center"
      :style="
        'min-height: 500px;background-image: url(' +
        backend_url +
        entity.wall_picture +
        ');background-size: cover;background-position: center top;'
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-6"></span>
      <!-- Header container -->
      <div class="container-fluid w-100 d-flex align-items-center">
        <div class="row align-items-start w-100">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-3 text-white">{{ entity.name }}</h1>
            <p class="text-white text-md mt-0 mb-5" v-html="entity.about"></p>
            <div class="d-flex">
              <a
                :href="entity.website"
                target="blank"
                class="btn btn-neutral text-default d-none d-md-block mr-2"
              >
                <em class="fas fa-globe"></em> Visit Website
              </a>
              <button
                type="button"
                class="btn btn-neutral text-default btn-icon-only rounded-circle d-block d-md-none mr-2"
              >
                <span class="btn-inner--icon">
                  <em class="fas fa-globe"></em>
                </span>
              </button>
              <span v-for="social in socials" :key="social.uuid">
                <a
                  v-if="social.name === 'Facebook'"
                  :href="social.link"
                  target="blank"
                  class="btn-facebook avatar avatar-sm rounded-circle mr-2"
                >
                  <em class="fab fa-facebook"></em>
                </a>
                <a
                  v-if="social.name === 'Twitter'"
                  :href="social.link"
                  target="blank"
                  class="avatar avatar-sm btn-twitter rounded-circle mr-2"
                >
                  <em class="fab fa-twitter"></em>
                </a>
                <a
                  v-if="social.name === 'Instagram'"
                  :href="social.link"
                  target="blank"
                  class="avatar avatar-sm btn-instagram rounded-circle mr-2"
                >
                  <em class="fab fa-instagram"></em>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--6">
      <div class="row mt-2">
        <div class="col-xl-4 order-last">
          <div class="card card-profile">
            <img
              :onerror="`this.src='${$img_placeholder}';`"
              :src="backend_url + entity.profileImage"
              class="card-img-top"
              alt=""
              srcset=""
            />
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      :onerror="`this.src='${$img_placeholder}';`"
                      :src="backend_url + entity.logo"
                      class="rounded-circle shadow-lg bg-white"
                      alt=""
                      srcset=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <!-- <a href="#" class="btn btn-sm btn-info mr-4">
                  <em class="fab fa-twitter"></em> Follow Us
                </a> -->
                <a
                  :href="'mailto:' + entity.email"
                  class="btn btn-sm btn-default float-right"
                >
                  <em class="fas fa-paper-plane"></em> Email us
                </a>
              </div>
            </div>

            <div class="card-body pt-0">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span class="heading"
                        >{{ entity.women_percentage }}%</span
                      >
                      <span class="description">Women Employees</span>
                    </div>
                    <div>
                      <span class="heading">{{ entity.no_of_products }}</span>
                      <span class="description">Products</span>
                    </div>
                    <div>
                      <span class="heading">{{ entity.no_of_services }}</span>
                      <span class="description">Services</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div class="h5 font-weight-300">
                  <em class="fas fa-location-arrow mr-2"></em
                  >{{ entity.address }}
                </div>
                <div class="h5 mt-4">
                  <em class="fas fa-phone mr-2"></em>
                  <a class="text-default" :href="'tel:' + entity.phone">{{
                    entity.phone
                  }}</a>
                </div>
                <div>
                  <em class="ni ni-email-83 mr-2"></em>
                  <a class="text-default" :href="'mailto:' + entity.email">{{
                    entity.email
                  }}</a>
                </div>
              </div>
            </div>
          </div>
          <!-- Members list group card -->
          <div class="card" v-if="contacts.length > 0">
            <!-- Card header -->
            <div class="card-header">
              <!-- Title -->
              <h5 class="h3 mb-0">Contacts</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush list my--3">
                <li
                  class="list-group-item px-0"
                  v-for="contact in contacts"
                  :key="contact.uuid"
                >
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="avatar rounded-circle font-weight-bold"
                        >J</span
                      >
                    </div>
                    <div class="col ml--2">
                      <h4 class="mb-0">
                        <a href="#!"
                          >{{ contact.firstName + " " + contact.lastName }} -
                          {{ contact.title }}</a
                        >
                      </h4>
                      <small
                        ><a
                          class="text-default"
                          :href="'mailto:' + contact.email"
                          >{{ contact.email }}</a
                        ></small
                      >
                      <br />
                      <small
                        ><a
                          class="text-default"
                          :href="'tel:' + contact.phone"
                          >{{ contact.phone }}</a
                        ></small
                      >
                    </div>
                    <div class="col-auto">
                      <a
                        :href="'mailto:' + contact.email"
                        class="btn btn-sm btn-default rounded-bottom"
                      >
                        <em class="fas fa-paper-plane"></em> e-mail
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="entity.map_url" class="card p-4">
            <div class="car-body w-100">
              <iframe
                title="location"
                width="100%"
                height="450"
                style="border: 0"
                :src="entity.map_url"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div
          class="col-xl-8 order-xl-1 order-sm-1"
          v-if="services.length > 0 || products.length > 0"
        >
          <div class="card" v-if="products.length > 0">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Products</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div
                  class="col-6 col-sm-6 col-md-3 col-lg-3"
                  v-for="(product, index) in products"
                  :key="index"
                >
                  <product-card :product="product">
                    <template v-slot:star-rating>
                      <star-rating :rating="product.rating" />
                    </template>
                  </product-card>
                </div>
              </div>
            </div>
          </div>
          <div class="card" v-if="services.length > 0">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Services</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div
                  class="col-6 col-sm-6 col-md-3 col-lg-3"
                  v-for="(service, index) in services"
                  :key="index"
                >
                  <service-component :service="service">
                    <template v-slot:star-rating-service>
                      <star-rating :rating="service.rating" />
                    </template>
                  </service-component>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "../components/ProductCard.vue";
import StarRating from "../components/StarRating";
import ServiceComponent from "../components/ServiceComponent";
import axios from "axios";
export default {
  components: {
    "product-card": ProductCard,
    "star-rating": StarRating,
    "service-component": ServiceComponent,
  },
  data() {
    return {
      slideTitle: "Explore Popular Categories",
      products: [],
      services: [],
      entity: {},
      contacts: [],
      backend_url: process.env.VUE_APP_BACKEND_URL,
      socials: [],
    };
  },
  methods: {
    fetch_products: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/entities/${this.$route.params.uuid}/products`
        )
        .then((res) => {
          console.log(res);
          this.products = res.data.filter((pr) => pr.visibilityStatus);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetch_services: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/entities/${this.$route.params.uuid}/services`
        )
        .then((res) => {
          console.log(res);
          this.services = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetch_contacts: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/entities/${this.$route.params.uuid}/contacts`
        )
        .then((res) => {
          console.log(res);
          this.contacts = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetch_socials: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/entities/${this.$route.params.uuid}/socials`
        )
        .then((res) => {
          console.log(res);
          this.socials = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    get_details: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/entities/${this.$route.params.uuid}`
        )
        .then((res) => {
          console.log(res);
          this.entity = res.data;
          this.entity.women_percentage = (
            (this.entity.no_of_women_employees * 100) /
            this.entity.no_of_employees
          ).toFixed(2);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.get_details();
    this.fetch_products();
    this.fetch_services();
    this.fetch_contacts();
    this.fetch_socials();
  },
};
</script>

<style>
</style>