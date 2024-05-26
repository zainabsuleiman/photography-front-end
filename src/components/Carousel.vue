<template>
  <div class="carousel" v-if="slides.length > 0">
    <vueper-slides
      fade
      :touchable="false"
      fixed-height="43.5vh"
      :slide-ratio="1.7 / 2"
      :autoplay="true"
      :duration="3000"
    >
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :link="slide.link"
      >
        <template v-slot:loader>
          <i class="fa fa-upload"></i>
          <span>Loading...</span>
        </template>
        <template v-slot:content>
          <div class="row carousel-row" :style="'background:'+slide.main_color">
            <div
              class="col-lg-4 col-md-4 col-sm-12 col-12 pl-3 pr-4 html-content"
            >
              <div class="mt-3 text-center html-data">
                <h3 :style="'color:'+slide.second_color">
                  {{ slide.title }}
                </h3>
                <p class="mb-3" :style="'color:'+slide.second_color">
                  {{ slide.content }}
                </p>
                <a
                  v-if="slide.button_title"
                  :href="slide.link"
                  class="btn mt-2 px-6"
                  :style="'background:'+slide.second_color+'; color:'+slide.main_color"
                  >{{ slide.button_title }}</a
                >
              </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-12 slides-images">
              <img :src="backend_url+slide.iconImage" class="img-fluid" :onerror="`this.src='${$img_placeholder}';`" />
            </div>
          </div>
        </template>
      </vueper-slide>
      <template v-slot:arrow-left>
        <i class="fas fa-chevron-circle-left" />
      </template>
      <template v-slot:arrow-right>
        <i class="fas fa-chevron-circle-right" />
      </template>
    </vueper-slides>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  name: "Carousel",
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      backend_url: process.env.VUE_APP_BACKEND_URL,
      breakpoints: {
        10000: {
          slideRatio: 3 / 3,
          bulletsOutside: true,
          arrows: false,
        },
        1400: {
          slideRatio: 1.0,
          bulletsOutside: true,
          arrows: false,
        },
        1280: {
          slideRatio: 4 / 4,
          bulletsOutside: true,
        },
        1000: {
          slideRatio: 4 / 4,
        },
        900: {
          slideRatio: 3 / 3,
          bulletsOutside: true,
        },
        600: {
          slideRatio: 2 / 2,
          arrows: false,
          bulletsOutside: true,
        },
      },
    };
  },
  watch:{
    slides: function(new_v){
      console.log(new_v)
    }
  },
  created() {
    console.log(this.slides)
  },
};
</script>
<style lang="css" scoped>
.vueperslides__arrow {
  color: black;
  font-size: 2rem;
}

.vueperslide--loading .vueperslide__content-wrapper {
  display: none !important;
}
.carousel-row {
  height: 100%;
}
@media (min-width: 768px) and (max-width: 1224.98px) {
  .slides-images {
    max-width: 100%;
    flex: 0 0 100%;
  }
  .html-content {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
@media (min-width: 1268px) {
  .carousel {
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    /* padding-left: 15px */
    /* padding-right: 15px; */
  }
}

.fa-chevron-circle-right:before {
  font-size: 25px;
}
.fa-chevron-circle-left:before {
  font-size: 25px;
}

/* @media (min-width: 768px) {
  .html-data{
    margin-left: 60px;
  }
} */
</style>
