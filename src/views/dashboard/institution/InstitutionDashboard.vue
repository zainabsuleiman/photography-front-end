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
import axios from "axios";
import StatisticCard from "@/components/dashboard/StatisticCard";

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
          title: "Branches",
          value: "4"
        },
        {
          title: "Assets Value",
          value: "120,000"
        },
        {
          title: "Income Value",
          value: "100,000"
        }
      ],
      trialHasEnded: false,
      institutionProfile: {}
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    getInstitutionProfile() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/profile/`, {
          headers: {
            authorization: `Bearer ${this.getToken}`
          }
        })
        .then(response => {
          this.institutionProfile = response.data.institution;
          this.isTrialEnded = !this.institutionProfile.is_in_trial;
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.getInstitutionProfile();

    if (!this.$store.state.completedProfileSetup) {
      this.$router.push("/dashboard/institution/complete_profile");
    } else {
      this.$router.push("/dashboard/institution");
    }
  }
};
</script>
