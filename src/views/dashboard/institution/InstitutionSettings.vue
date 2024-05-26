<template>
  <div class="row mt-1">
    <div class="col-md-9 col-12 col-sm-12 mt-4">
      <div class="card card-profile p-3">
        <div class="card-header bg-white">
          <div class="row">
            <div class="col-md-12">
              <h2>Insitution Profile</h2>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div
              class="col-md-6 col-12 mb-4"
              v-for="(info, index) in profileInfo"
              :key="index"
            >
              <info-tag :label="info.label" :value="info.value"></info-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-12 col-sm-12 mt-4">
      <div class="card card-profile"></div>
    </div>
  </div>

  <div class="row mt-1">
    <div class="col-md-9 col-12 col-sm-12 my-3">
      <div class="card card-profile p-3">
        <div class="card-header bg-white">
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="mb-0">
              {{ has_plan ? "Active Subscription Plan" : "Trial Details" }}
            </h2>

            <button-cta
              :isBusy="isLoading"
              :label="subscriptionBtnLabel"
              :btnClass="subscriptionBtnClass"
            ></button-cta>
          </div>
        </div>
        <div class="card-body">
          <div class="row" v-if="has_plan">
            <div
              class="col-md-6 col-12 mb-4"
              v-for="(info, index) in planInfo"
              :key="index"
            >
              <info-tag :label="info.label" :value="info.value"></info-tag>
            </div>
          </div>
          <div class="row" v-else>
            <div
              class="col-md-6 col-12 mb-4"
              v-for="(info, index) in trialInfo"
              :key="index"
            >
              <info-tag :label="info.label" :value="info.value"></info-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ alias src
import moment from "moment";
import InfoTag from "@/components/dashboard/InfoTag";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  components: { InfoTag, ButtonCta },
  data() {
    return {
      profileInfo: [],
      planInfo: [
        {
          label: "Name",
          value: "Premium"
        },
        {
          label: "Price",
          value: "10,000"
        },
        {
          label: "Currency",
          value: "$"
        },
        {
          label: "Number of Users",
          value: "10"
        },
        {
          label: "Number of Branches",
          value: "10"
        },
        {
          label: "Start Date",
          value: "10/10/2020"
        },
        {
          label: "End Date",
          value: "10/10/2021"
        }
      ],
      trialInfo: [],
      isLoading: false
    };
  },
  computed: {
    getInstitutionProfile() {
      return this.$store.getters.getUserProfile.institution;
    },
    has_plan() {
      return this.getInstitutionProfile.has_plan;
    },
    subscriptionBtnLabel() {
      return this.has_plan ? "Upgrade Plan" : "Get Plan";
    },
    subscriptionBtnClass() {
      return this.has_plan ? "btn btn-success" : "btn btn-warning";
    }
  },
  mounted() {
    if (this.getInstitutionProfile) {
      this.profileInfo = [
        {
          label: "Name",
          value: this.getInstitutionProfile.name
        },
        {
          label: "Email",
          value: this.getInstitutionProfile.email
        },
        {
          label: "Phone",
          value: this.getInstitutionProfile.phoneNumber
        },
        {
          label: "Country",
          value: this.getInstitutionProfile.country
        },
        {
          label: "Address",
          value: this.getInstitutionProfile.addres
        },
        {
          label: "Business Registration N.o",
          value: this.getInstitutionProfile.business_registration_number
        },
        {
          label: "Starting year",
          value: this.getInstitutionProfile.starting_year
        }
      ];
    }

    if (this.getInstitutionProfile.has_plan) {
      this.profileInfo = [];
    } else {
      this.trialInfo = [
        {
          label: "Start Date",
          value: moment(this.getInstitutionProfile.trial_start_date).format(
            "DD-MM-YYYY"
          )
        },
        {
          label: "End Date",
          value: moment(this.getInstitutionProfile.trial_end_date).format(
            "DD-MM-YYYY"
          )
        }
      ];
    }
  }
};
</script>
