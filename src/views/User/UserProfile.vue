<template>
  <div>
    <div class="row mt-1">
      <div class="col-md-8 col-12 col-sm-12 mt-6">
        <div class="card card-profile p-3">
          <div class="card-header bg-white">
            <div class="row">
              <div class="col-md-12">
                <h2>My Account</h2>
              </div>
            </div>
          </div>
          <div class="card-body bg-gradient-secondary">
            <h6 class="heading-small text-muted mb-4">User information</h6>
            <div class="row">
              <div class="form-group col-md-6">
                <label class="form-control-label">First Name</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Add First Name"
                  v-model="data.firstName"
                />
                <label
                  v-for="error in errors.firstName"
                  :key="error"
                  class="form-control-flush text-danger text-sm"
                  >{{ error }}</label
                >
              </div>
              <div class="form-group col-md-6">
                <label class="form-control-label">Last Name</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Add Last Name"
                  v-model="data.lastName"
                />
                <label
                  v-for="error in errors.lastName"
                  :key="error"
                  class="form-control-flush text-danger text-sm"
                  >{{ error }}</label
                >
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label class="form-control-label">Email</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Add Email"
                  v-model="data.email"
                />
                <label
                  v-for="error in errors.email"
                  :key="error"
                  class="form-control-flush text-danger text-sm"
                  >{{ error }}</label
                >
              </div>
              <div class="form-group col-md-6">
                <label class="form-control-label">Phone Number</label>
                <input
                  class="form-control form-control-alternative"
                  placeholder="Add Phone Number"
                  v-model="data.phone"
                />
                <label
                  v-for="error in errors.phone"
                  :key="error"
                  class="form-control-flush text-danger text-sm"
                  >{{ error }}</label
                >
              </div>
            </div>
            <!-- 
            <hr class="" />
            <h6 class="heading-small text-muted mb-4">Address Information</h6>
            <div class="row">
              <div class="form-group col-md-12">
                <label class="form-control-label">Address</label>
                <input
                  name="address"
                  class="form-control form-control-alternative"
                  placeholder="Add Address"
                  v-model="data.address"
                />
                <label
                  v-for="error in errors.address"
                  :key="error"
                  class="form-control-flush text-danger text-sm"
                  >{{ error }}</label
                >
              </div>
            </div> -->
            <div class="row">
              <div class="col-md-6">
                <button-cta
                  class="btn btn-default btn-md"
                  @click="update_user_profile"
                  label="Update Information"
                  :isBusy="isLoading"
                >
                </button-cta>
                <span
                  @click="show_help_for_update()"
                  class="info-icon badge-circle badge-info badge badge-md text-black-50 mt--2 ml-1 hover-cursor"
                  ><em class="fas fa-info"></em
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 col-12 mt-6">
        <div class="card card-profile">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-profile-image">
                <a href="#">
                  <img
                    src="https://www.fluidogroup.com/wp-content/uploads/2018/09/user-icon-silhouette-ae9ddcaf4a156a47931d5719ecee17b9-400x400.png"
                    class="rounded-circle shadow-lg bg-white"
                  />
                </a>
              </div>
            </div>
          </div>
          <div
            class="card-header text-center border-0 pt-6 pt-md-4 pb-0 pb-md-4 mt-4"
          ></div>
          <div class="card-body pt-0">
            <h2 class="h3 mt-2 text-center">{{ data.username }}</h2>
            <div class="text-center">
              <div class="h5 font-weight-300" v-if="data.address">
                <em class="fas fa-location-arrow mr-2"></em>
                {{ data.address }}
              </div>
              <div class="h5 font-weight-300" v-if="data.phone">
                <em class="fas fa-phone mr-2"></em>
                {{ data.phone }}
              </div>
              <div class="h5 font-weight-300" v-if="data.email">
                <em class="ni ni-email-83 mr-2"></em>
                {{ data.email }}
              </div>
            </div>
          </div>
        </div>
        <div class="card shadow p-2">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h4>Actions</h4>
                <hr class="my-0 mb-3" />
                <div class="row mb-2">
                  <div class="col-md-12">
                    <button
                      type="button"
                      class="btn btn-default btn-sm btn-block w-100"
                      data-toggle="modal"
                      data-target="#changePasswordModal"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal  For Change password -->
    <div
      class="modal fade"
      id="changePasswordModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="changePasswordModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @close="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-secondary">
            <div class="form-group col-md-12">
              <label class="form-control-label">old password</label>
              <input
                class="form-control form-control-alternative"
                placeholder="old password"
                type="password"
                autocomplete="off"
                readonly
                onfocus="this.removeAttribute('readonly');"
                v-model="credentials.old_password"
              />
              <label
                v-for="error in errors.old_password"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
            <div class="form-group col-md-12">
              <label class="form-control-label">New password</label>
              <input
                class="form-control form-control-alternative"
                placeholder="New password"
                type="password"
                v-model="credentials.new_password1"
              />
              <label
                v-for="error in errors.new_password1"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
            <div class="form-group col-md-12">
              <label class="form-control-label">Confirm new password</label>
              <input
                class="form-control form-control-alternative"
                placeholder="Confirm Password"
                type="password"
                v-model="credentials.new_password2"
              />
              <label
                v-for="error in errors.new_password2"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="cancelbtn"
            >
              Cancel
            </button>
            <button-cta
              type="button"
              class="btn btn-default"
              @click="change_password"
              label="Change Password"
              :isBusy="isLoading"
            ></button-cta>
          </div>
        </div>
      </div>
    </div>
    <!-- end change password modal reason -->
  </div>
</template>
<script>
// @ alias to /src
import { alert } from "@/utils/alertUtils.vue";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  name: "UserProfile",
  components: {
    ButtonCta
  },
  data() {
    return {
      data: {
        phone_number: "",
        email: "",
        first_name: "",
        last_name: "",
        address: ""
      },
      credentials: {
        old_password: "",
        new_password1: "",
        new_password2: ""
      },
      errors: {
        description: []
      },
      isLoading: false
    };
  },
  methods: {
    populate_data() {
      this.data.phone_number = this.$store.getters.getUserProfile.phone;
      this.data.email = this.$store.getters.getUserProfile.email;
      this.data.first_name = this.$store.getters.getUserProfile.firstName;
      this.data.last_name = this.$store.getters.getUserProfile.lastName;
      this.data.address = this.$store.getters.getUserProfile.address;
    },

    async update_user_profile() {
      this.isLoading = true;
      await this.$store.dispatch("update_user_profile", this.data);
      this.populate_data();
      this.isLoading = false;
    },

    async change_password() {
      const result = await this.$store.dispatch(
        "change_password",
        this.credentials
      );
      if (result && result.statusText === "OK") {
        document.getElementById("cancelbtn").click();
      }
    },

    show_help_for_update() {
      alert.info_center(
        "After updating your profile, data will not change instantly unless you logout and login again that's when new changes will appear.  / Nyuma yo guhindara amakuru, ntabwo impinduka uhita uzibona ako kanya keretse nyuma yo gusohoka(logout) ukinjira (login) muri sisitemu."
      );
    }
  },
  created() {
    this.populate_data();
  }
};
</script>
