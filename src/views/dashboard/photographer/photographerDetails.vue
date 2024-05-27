<template>
  <div class="">
    

    <div class="header py-0 shadow bg-white mt-3">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row py-3">
            <nav aria-label="breadcrumb" class="ml-2">
              <ol class="breadcrumb breadcrumb-links">
                <li class="breadcrumb-item">
                  <a href="#"><i class="fas fa-link"></i></a>
                </li>
                <li class="breadcrumb-item">
                  <router-link tag="li" :to="{ name: 'Photographers' }">
                    <a href="#">
                      Photographers
                    </a>
                  </router-link>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">Photographer Detail</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mt-2">
        <button
          class="mb-2 btn btn-default btn-sm"
          @click="this.$router.go(-1)"
        >
          Back
        </button>
        <div class="row">
          <div class="col-md-8">
            <div class="card shadow w-100 p-4">
              <div class="row mb-1 ">
                <div class="col-md-12 mb-4">
                  <div class="row">
                    <img
                      v-if="data.icon"
                      :src="data.icon"
                      class="avatar avatar-sm rounded-circle img-fluid mr-1"
                    />
                    <h3 class="mt-1">Photographer</h3>
                  </div>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="form-control-label">First Name : </label>
                  <span class="ml-2">{{ data.firstName ? data.firstName : "N/A" }}</span>
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Last Name : </label>
                  <span class="ml-2">{{ data.lastName ? data.lastName : "N/A" }}</span>
                </div>
                
              </div>
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="form-control-label">Phone : </label>
                  <span class="ml-2">{{
                    data.phone ? data.phone : "N/A"
                  }}</span>
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">District : </label>
                  <span class="ml-2">{{
                    data.district ? data.district : "N/A"
                  }}</span>
                </div>
                
              </div>
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="form-control-label">Age: </label>
                  <span class="ml-2">{{
                    data.age ? data.age : "N/A"
                  }}</span>
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Province: </label>
                  <span class="ml-2">{{
                    data.province ? data.province : "N/A"
                  }}</span>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="form-control-label">Sector: </label>
                  <span class="ml-2">{{
                    data.sector ? data.sector : "N/A"
                  }}</span>
                </div>
                <div class="col-md-6">
                  <label class="form-control-label">Street Number: </label>
                  <span class="ml-2">{{
                    data.streetNumber ? data.streetNumber : "N/A"
                  }}</span>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="form-control-label">Years Of Experience: </label>
                  <span class="ml-2">{{
                    data.years_experience ? data.years_experience : "N/A"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-4">
       
            <div
              class="card shadow-lg w-100 border-0 mb-0 mb-4"
              v-if="data.active_status === 'Suspended'"
            >
              <div class="card-body px-lg-2 py-lg-3">
                <div class="row">
                  <div class="col-md-12">
                    <h3
                      v-if="data.active_status === 'Suspended'"
                      class="text-danger"
                    >
                      {{ data.name ? data.name : "N/A" }} is Suspended
                    </h3>
                    <h3>Suspension reason</h3>
                    <hr class="my-0 mb-2" />
                    <p class="bg-secondary p-1">
                      {{
                        data.active_status_reason
                          ? data.active_status_reason
                          : "N/A"
                      }}
                    </p>
                    <button
                      v-if="$guards.is_super_admin()"
                      class="mt-2 btn btn-default"
                      @click="activate_institution_clicked"
                    >
                      <em class="ni ni-check-bold"></em> Activate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="card shadow w-100 p-4"
              v-if="data.active_status === 'Active'"
            >
              <div class="row mb-1 ">
                <div class="col-md-12 mb-4">
                  <h3>Actions</h3>
                </div>
                <div class="col-md-12 mb-3">
                  <button
                    v-if="
                      $guards.is_super_admin() &&
                        data.active_status !== 'Active'
                    "
                    type="button"
                    class="btn btn-default btn-sm btn-block w-100"
                  >
                    Activate
                  </button>
                </div>

                <div class="col-md-12 mb-3" v-if="$guards.is_super_admin()">
                  <button
                    type="button"
                    class="btn btn-default btn-sm btn-block w-100"
                    @click="this.update_institution()"
                  >
                    Update Institution
                  </button>
                </div>
                
                <div
                  class="col-md-12 mb-3"
                  v-if="$guards.is_super_admin() || $guards.is_frontDesk()"
                >
                  <button
                    type="button"
                    class="btn btn-default btn-sm btn-block w-100"
                    @click="
                      this.$router.push({
                        name: 'Employees',
                        params: { id: this.$route.params.id },
                      })
                    "
                  >
                    Employees
                  </button>
                </div>
                <div
                  class="col-md-12 mb-3"
                  v-if="$guards.is_super_admin() || $guards.is_finance()"
                >
                  <button
                    type="button"
                    class="btn btn-default btn-sm btn-block w-100"
                    @click="
                      this.$router.push({
                        name: 'Contracts',
                        params: { uuid: this.$route.params.id },
                      })
                    "
                  >
                    Contracts
                  </button>
                </div>
                <div
                  class="col-md-12 mb-3"
                  v-if="$guards.is_super_admin() || $guards.is_finance()"
                >
                  <button
                    v-if="$guards.is_super_admin() || $guards.is_finance()"
                    type="button"
                    class="btn btn-default btn-sm btn-block w-100"
                    @click="
                      this.$router.push({
                        name: 'Institution Entry Period',
                        params: { id: this.$route.params.id },
                      })
                    "
                  >
                    Invoices
                  </button>
                </div>
                <div class="col-md-12 mb-3">
                  <button
                    v-if="
                      $guards.is_super_admin() &&
                        data.active_status === 'Active'
                    "
                    type="button"
                    class="btn btn-default btn-sm btn-block w-100"
                    data-toggle="modal"
                    data-target="#suspendModal"
                  >
                    Suspend Institution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        </div>
        <div class="row">
          <div class="col-md-12">
            <div
              class="card shadow-lg w-100 border-0 mb-0 mt-4 p-4"
              id="activity_card"
              v-if="$guards.is_client()"
            >
              <div class="card-body px-lg-1 py-lg-1">
                <div class="row">
                  <div class="col-md-12">
                    <h3>Appointment List</h3>
                    <hr class="my-0" />
                    <button
                      v-if="$guards.is_client()"
                      type="button"
                      data-toggle="modal"
                      data-target="#usersModal"
                      class="mt-2 btn btn-default btn-sm text-white"
                    >
                      <em  class="ni ni-check-bold"></em>Make Appointment
                    </button>
                  </div>
                  <div class="col-md-12">
                    <data-table
                      v-if="user_table_loaded"
                      id="list_of_users"
                      :options="dtb_options.extra_options"
                      :actions="dtb_options.actions"
                      :data="dtb_options.data"
                      :columns="dtb_options.columns"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal  For Suspension Reason-->
    <div
      class="modal fade"
      id="suspendModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="suspendModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">suspense Reason</h5>
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
              <label class="form-control-label"
                >Please Add the reason to suspend this Institution</label
              >
              <textarea
                class="form-control form-control-alternative"
                placeholder="Reason for suspension"
                rows="5"
                v-model="suspend_reason.value"
              ></textarea>
              <label
                v-for="error in suspend_reason.errors"
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
            <button
              type="button"
              class="btn btn-default"
              @click="suspend_institution"
            >
              Suspend
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end suspenction reason -->

    <!-- Modal  For Adding the user -->
    <div
      class="modal fade"
      id="usersModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="usersModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add appointment</h5>
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
              <label class="form-control-label"
                >Location <span class="text-danger">*</span></label
              >
              <input
                class="form-control form-control-alternative"
                placeholder="Enter location"
                type="text"
                v-model="user.location"
              />
            </div>
            <div class="form-group col-md-12">
              <label class="form-control-label"
                >Hours & Min <span class="text-danger">*</span></label
              >
              <input
                class="form-control form-control-alternative"
                placeholder="Enter hours & min"
                type="datetime-local"
                v-model="user.hours_min"
              />
            </div>
            <div class="form-group col-md-12">
              <label class="form-control-label"
                >Description <span class="text-danger">*</span></label
              >
              <input
                class="form-control form-control-alternative"
                placeholder="Enter Description"
                type="text"
                v-model="user.description"
              />
            </div>
            
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="userCancelbtn"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-default" @click="add_appointment">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <modal title="Assign Appointment" :show="showModal" @close="closeModal" width="50%">
    <div class="row" v-for="(e,index) in activity" :key="index" >
      <div class="col-md-6">
           <div class="form-group">
          <label class="form-control-label" :for="e.name"> <input class="text-md-center" type="checkbox" :value="e.name" v-model="post_data[index]" />{{e.name}}</label>
           </div></div>
            <div class="col-md-6">
           <div class="form-group">
          <label class="form-control-label" for="name">{{e.price}}</label>
           </div></div>
    </div>

    <template v-slot:actions>
      <button-cta
        label="Add"
        class="btn btn-warning"
        @click="assign_activity"
        :isBusy="isLoading"
      ></button-cta>
    </template>
    </modal>
  <!-- end of add user url  -->
</template>
<script>
import { alert } from "../../../utils/alertUtils";
import modal from '../../../components/modal/Modal.vue';
import axios from "axios";
import DataTable from "../../../components/DataTable.vue";
import ButtonCta from '../../../components/Button/ButtonCta.vue';
export default {
  name: "photographerDetail",
  components: {
    modal,
    ButtonCta,
    "data-table": DataTable,
  },
  data() {
    return {
      delayedInvoices: 0,
      showModal:false,
      areDelayedLoaded: false,
      selectedId:'',
      url: "",
      user: {},
      acts_data_loaded: false,
      data_loaded: false,
      user_table_loaded: false,
      post_data:[],
      active:'',
      data: {},
      activity:{},
      isActivate: true,
      suspend_reason: {
        value: "",
        errors: [],
      },

      dtb_options: {
        data: [],
        actions: [
          {
            btnText: "Assign Activity",
            btnClass: "btn btn-warning text-white btn-sm",
            iconClass: "fas fa-arrow-up-circle",
            btnFn: (id) => {
             this.selectedId = id;
             this.openModal();
            },
            show: this.$guards.is_client(),
            btnParamName: "id",
          },
        ],
        columns: [
          { title: "Location", data: "location" },
          { title: "Hours-Min", data: "hours_min" },
          { title: "Description", data: "description" },
          { title: "Payment Status", data: "payment_status" },
          { title: "Status", data: "status" },
          { title: "Total Price", data: "appointment_total_price" },
        ],
        extra_options: {},
      },
    };
  },

  methods: {
      assign_activity:function(){
         var url = `${process.env.VUE_APP_BACKEND_URL}api/client/appointment/${this.selectedId}/assign_activity`;
         const data ={
             activities:this.post_data
         }
      axios
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert.success_center("You have successfully added activity");
            // this.user = {};
            // this.user_table_loaded = true;
            // this.user.errors = [];
            this.fetch_institution_users();
            console.log(this.post_data);
            
          } else if (res.status === 400) {
            alert.error("Form error occured, try again");
          } else {
            alert.error("an error occured, try again");
          }
        })
        .catch((err) => {
          console.log(err);
          this.user_table_loaded = true;
          alert.error(
            "An error occured link, please try again,if the error persist kindly contact the owner of this site!"
          );
        });
      },
      activities:function(){
        axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}photographer/${this.$route.params.id}/activities/`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          this.activity = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      },
    add_appointment: function() {
      this.user_table_loaded = false;
      this.dtb_options.data = [];
      var url = `${process.env.VUE_APP_BACKEND_URL}api/client/${this.$route.params.id}/make_appointment/`;
      var data = {
        location: this.user.location,
        hours_min: this.user.hours_min,
        description: this.user.description,
      };
      axios
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert.success_center("You have successfully added appointment");
            this.user = {};
            this.user_table_loaded = true;
            this.user.errors = [];
            document.getElementById("userCancelbtn").click();
            this.fetch_institution_users();
            
          } else if (res.status === 400) {
            alert.error("Form error occured, try again");
          } else {
            alert.error("an error occured, try again");
          }
        })
        .catch((err) => {
          console.log(err);
          this.user_table_loaded = true;
          alert.error(
            "An error occured link, please try again,if the error persist kindly contact the owner of this site!"
          );
        });
    },

    fetch_institution_users: function() {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}api/client/${this.$route.params.id}/appointments`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          this.dtb_options.data = res.data;
          this.user_table_loaded = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    fetch_photographer: function() {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}photographer/${this.$route.params.id}/details`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          this.data = res.data;
          this.data_loaded = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    assign_appointment: function() {
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/institutions/${this.$route.params.id}/delete/`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then(() => {
          alert.success_center("You have successfully Deleted Institution");
          this.$router.push({
            name: "Institutions",
          });
        })
        .catch(() => {
          alert.error(
            "An error occured in deleting institution please try again,if the error persist kindly contact the owner of this site!"
          );
        });
    },

    update_institution: function() {
      this.$router.push({
        name: "Institution Update",
        params: { id: this.$route.params.id },
      });
    },

    delete_institution_clicked: function() {
      alert.promptDelete(this.delete_institution);
    },

    // suspend or deactivate an institution
    suspend_institution: function() {
      this.show_loader = true;
      var body = {
        deactivation_reason: this.suspend_reason.value,
      };
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_URL}/institutions/${this.$route.params.id}/deactivate/`,
          body,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then(() => {
          alert.success_center("Institution Suspended");
          this.post_data = {};
          this.show_loader = false;
          document.getElementById("cancelbtn").click();
          this.fetch_institution();
        })
        .catch((err) => {
          this.show_loader = false;
          if (err.response.status === 400) {
            this.suspend_reason.errors = err.response.data;
            alert.error(
              "An Error occured, kindly check the for for specific errors"
            );
          } else {
            alert.error("An Error occured, Please try again!");
          }
          console.error(err);
        });
    },

    activate_institution_clicked: function() {
      alert.promptAction(
        this.activate_from_supension,
        "you want to activate this Institution ?"
      );
    },

    activate_from_supension: function() {
      this.show_loader = true;
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_URL}/institutions/${this.$route.params.id}/activate`,
          {},
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then(() => {
          alert.success_center("Institution Activated Successfully");
          this.post_data = {};
          this.show_loader = false;
          this.fetch_institution();
        })
        .catch((err) => {
          this.show_loader = false;
          if (err.response.status === 400) {
            this.suspend_reason.errors = err.response.data;
            alert.error(
              "An Error occured, kindly check the for for specific errors"
            );
          } else {
            alert.error("An Error occured, Please try again!");
          }
          console.error(err);
        });
    },

    fetch_delayed_invoices: function() {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/institutions/${this.$route.params.id}/invoices/fetch/delayed/`,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          this.delayedInvoices = res.data.length;
          this.areDelayedLoaded = true;
        })
        .catch(() => {
          this.areDelayedLoaded = true;
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal(){
        this.showModal = false;
    }
  },

  created() {
    this.fetch_delayed_invoices();
    this.fetch_institution_users();
    this.fetch_photographer();
    this.activities();
    
  },
};
</script>
<style lang="css">
#users_length {
  display: none;
}
#users_info {
  display: none;
}
</style>
