<template>
  <div class="row mt-4">
    <div
      class="col-md-4 col-lg-3 mb-2"
      v-for="(stat, index) in statistics"
      :key="index"
    >
      <statistic-card :title="stat.title" :value="stat.value"></statistic-card>
    </div>
  </div>
</template>

<script>
// @ alias to /src
import StatisticCard from "@/components/dashboard/StatisticCard.vue";

export default {
  components: {
    StatisticCard
  },
  data: function() {
    return {
      statistics: [
        {
          title: "Users",
          value: "4"
        },
        {
          title: "Assets Value",
          value: "10,00"
        },
        {
          title: "Income Value",
          value: "120,000"
        },
        {
          title: "Products Value",
          value: "100,000"
        }
      ]
    };
  }
};
</script>
