<template>
  <div>
    <div v-if="reviews.length === 0">
      <h2 class="h2 text-default text-muted text-center">
        This product has no reviews
      </h2>
    </div>
    <div class="row mb-5" v-if="reviews.length > 0">
      <h2 class="display-4 col-12 mb-3 text-default">Reviews</h2>
      <div class="col-md-3">
        <div style="width:max-content" class="ml-auto mr-auto mb-2">
          <h1 class="mt-lg-5 mt-md-5 display-4 ml-4">
            {{ productRating.toFixed(1) }}
          </h1>
          <star-rating :rating="productRating" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="card col-md-12">
          <!-- ----- -->
          <div
            class="progress-wrapper mt--2"
            v-for="(stc, i) in star_count"
            :key="i"
          >
            <div class="progress-info"></div>
            <div class="row">
              <div class="col-md-2 mt--2">
                <span
                  >{{ stc.num }} <em class="fa fa-star"></em>
                  <span class="text-muted">({{ stc.count }})</span></span
                >
              </div>
              <div class="col-md-10">
                <div class="progress">
                  <div
                    class="progress-bar bg-default"
                    role="progressbar"
                    :aria-valuenow="stc.percentage"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="`width: ${stc.percentage}%`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <!-- ----- -->
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="review in show_reviews" :key="review.uuid">
        <div class="card p-3">
          <div class>
            <span>{{ review.name }}</span>
            <span class="text-muted ml-3 float-lg-right">{{
              $date_format.date_only(review.doneAt)
            }}</span>
            <div class="ml-auto">
              <star-rating :rating="review.star_rating" />
            </div>
          </div>

          <div class="coment">
            <p class="text-muted">{{ review.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import StarRating from "../components/StarRating";
import { alert } from "../utils/alertUtils";

export default {
  name: "ReviewsComponent",
  components: {
    "star-rating": StarRating,
  },
  props: {
    productUuid: {
      type: String,
      required: true,
    },
    productRate: {
      required: false,
    },
  },
  data() {
    return {
      reviews: [],
      show_reviews: [],
      productRating: this.productRate,
      star_count: [],
    };
  },
  watch: {
    productUuid: function () {
      this.fetch_reviews();
    },
  },
  methods: {
    fetch_reviews: function () {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/products/${this.productUuid}/review`;
      axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            this.reviews = res.data;
            console.log(res.data);
            this.count_stars();
            this.get_showing_reviews();
          }
        })
        .catch((err) => {
          alert.error("error occured" + err);
        });
    },
    count_stars: function () {
      this.star_count = [];
      for (var num = 5; num > 0; num--) {
        let data = {
          num: num,
          count: 0,
          percentage: 0,
        };
        this.reviews.forEach((rev) => {
          if (parseInt(rev.star_rating) == num) {
            data.count += 1;
          }
        });
        data.percentage = (data.count * 100) / this.reviews.length;
        this.star_count.push(data);
      }
    },
    get_showing_reviews: function () {
      this.reviews.sort(function () {
        return 0.5 - Math.random();
      });
      this.show_reviews = this.reviews.slice(0, 3);
    },
  },
  created() {
    this.fetch_reviews();
  },
};
</script>
<style lang="css" scoped>
.progress-bar {
  background-color: gold !important;
}
.fa-star {
  color: gold !important;
}
</style>