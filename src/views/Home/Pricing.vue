<template>
  <div id="pricing" class="pricing spacing-lg">
    <div class="container">
      <div class="text-center">
        <h1 class="section-title">
          Pick the right pricing plan for your needs
        </h1>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-sm-4 text-center wow fadeInDown"
          v-for="(plan, index) in plans"
          :key="index"
          :data-wow-delay="index * 0.3 + 's'"
        >
          <price-plan
            :title="plan.title"
            :price="plan.price"
            :features="plan.features"
            :index="index"
          ></price-plan>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PricePlan from "@/components/price-plan/PricePlan";
import axios from 'axios';
import { alert } from "../../utils/alertUtils";

export default {
  components: {
    PricePlan
  },
  data() {
    return {
      plans: [
        {
          title: "Basic",
          price: "0.00",
          features: ["First feaure", "Second feature", "Third feature"]
        },
        {
          title: "Standard",
          price: "9.99",
          features: ["First feaure", "Second feature", "Third feature"]
        },
        {
          title: "Premium",
          price: "19.99",
          features: ["First feaure", "Second feature", "Third feature"]
        }
      ]
    };
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/plans`).then(response => {
      const formatedResponse = response.data.map(plan => {
        return {
          title: plan.name,
          price: plan.price,
          features: plan.features.map(feature => feature.title)
        };
      });

      if (formatedResponse.length > 0) {
        this.plans = formatedResponse;
      }
    }).catch(error => {
      alert.error("Price, didn't load correctly");
      console.log(error);
    });
  }
};
</script>

<style scoped>
.pricing .section-title {
  margin-bottom: 38px;
}
</style>
