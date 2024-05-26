<template>
  <div>
    <div class="row mt-1">
      <div class="col-12 col-sm-12 mt-3">
        <div class="card card-profile p-3">
          <div class="card-header bg-white">
            <div class="row">
              <div class="col-md-12">
                <h2>Complete Institution Profile</h2>
              </div>
            </div>
          </div>
          <div class="card-body bg-gradient-secondary">
            <h6 class="heading-small text-muted mb-4">
              Institution Information
            </h6>
            <div class="row">
              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Name</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter First Name"
                  v-model="name"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Phone Number</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter Last Name"
                  v-model="phone_number"
                />
              </div>

              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Email</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter Email"
                  v-model="email"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Country</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter Country"
                  v-model="country"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Registration Number</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter Business Registration Number"
                  v-model="business_registration_number"
                />
              </div>
              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Starting Year</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter Starting Year"
                  v-model="starting_year"
                />
              </div>

              <div class="form-group col-lg-4 col-md-6">
                <label class="form-control-label">Address</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Enter Address"
                  v-model="address"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <button-cta
                  class="btn btn-default btn-md"
                  @click="completeProfile"
                  label="Complete Profile"
                  :isBusy="isLoading"
                  :disabled="!isFormValid"
                >
                </button-cta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { alert } from "@/utils/alertUtils";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  components: {
    ButtonCta
  },
  data() {
    return {
      name: "",
      phone_number: "",
      email: "",
      country: "",
      business_registration_number: "",
      starting_year: "",
      address: "",
      isLoading: false
    };
  },
  computed: {
    institutionProfile() {
      return this.$store.getters.getUserProfile.institution;
    },
    getToken() {
      return this.$store.getters.getToken;
    },
    isFormValid() {
      const testEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return (
        this.name &&
        this.phone_number &&
        this.email &&
        testEmail.test(this.email) &&
        this.country &&
        this.business_registration_number &&
        this.starting_year &&
        this.address
      );
    }
  },
  methods: {
    completeProfile() {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_BACKEND_URL}/api/institutions/${this.institutionProfile.uuid}/complete_profile/`;

      const data = {
        name: this.name,
        phone_number: this.phone_number,
        email: this.email,
        country: this.country,
        business_registration_number: this.business_registration_number,
        starting_year: this.starting_year,
        address: this.address
      };

      axios
        .put(url, data, {
          headers: {
            Authorization: "Bearer " + this.getToken
          }
        })
        .then(response => {
          this.isLoading = false;
          if (response.data.id) {
            alert.success("Profile Completed successfully");
            this.$store.commit(
              "completedProfileSetup",
              response.data.has_set_profile
            );
            setTimeout(() => {
              this.$router.push("/dashboard/institution");
            }, 1000);
          }
        })
        .catch(error => {
          this.isLoading = false;
          alert.error("Profile could not be completed");
          console.log(error);
        });
    }
  },
  mounted() {
    if (this.institutionProfile) {
      this.name = this.institutionProfile.name;
      this.phone_number = this.institutionProfile.phoneNumber;
      this.email = this.institutionProfile.email;
    }
  }
};
</script>
