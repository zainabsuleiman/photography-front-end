<template>
  <!-- add && edit institution branch modal -->
  <institution-branch-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createBranch"
    :edit="editBranch"
    :isEdit="isEditMode"
    :branchData="branchData"
    :token="getToken"
    :institutionId="getInstitutionUuid"
  ></institution-branch-form>

  <div class="bg-white pt-4 px-3 rounded shadow mt-5">
    <section-header info="List of Institution branches">
      <template v-slot:component>
        <button-cta
          class="btn btn-default"
          @click="openModal"
          label="Add Branch"
        ></button-cta>
      </template>
    </section-header>

    <div class="row mt-4">
      <div class="col-12">
        <data-table
          id="institution_branches_list"
          v-if="data_loaded"
          :columns="dtb_options.columns"
          :data="dtb_options.data"
          :actions="dtb_options.actions"
        ></data-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "@/components/DataTable";
import SectionHeader from "@/components/dashboard/SectionHeader";
import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
import InstitutionBranchForm from "./InstitutionBranchForm";
import moment from 'moment';

export default {
  components: { "data-table": DataTable, SectionHeader, ButtonCta, InstitutionBranchForm },
  data() {
    return {
      isLoading: false,
      data_loaded: false,
      isEditMode: false,
      selectedBranchID: "",
      branchData: {},

      dtb_options: {
        columns: [
          {
            title: "Names",
            data: "name",
            render(data) {
              return data.name;
            }
          },
          {
            title: "email",
            data: "email",
            render(data) {
              return data.email;
            }
          },
          {
            title: "Phone Number",
            data: "phoneNumber",
            render(data) {
              return data.phoneNumber;
            }
          },
          {
            title: "Address",
            data: "address",
            render(data) {
              return data.address;
            }
          },
          {
            title: "Country",
            data: "country",
            render(data) {
              return data.country;
            }
          },
          {
            title: "Starting Year",
            data: "starting_year",
            render(data) {
              return moment(data.starting_year).format("YYYY");
            }
          }
        ],
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: (uuid) => {
              this.selectedBranchID = uuid;
              this.isEditMode = true;
              this.getBranch(uuid);
              console.log('institution branch id', uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash", 
            btnFn: uuid => this.deleteBranch(uuid),
            btnParamName: "uuid"
          }
        ],
        extra_options: {}
      },
      showModal: false
    };
  },
  computed: {
    getInstitutionUuid() {
      return this.$store.getters.getUserProfile.institution.uuid;
    },
    getToken() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    createBranch(data) {
      this.data_loaded = false;
      this.isLoading = true;
      if (this.getInstitutionUuid) {
        axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/api/branches`, data,
            {
              headers: {
                Authorization: `Bearer ${this.getToken}`
              }
            }
          )
          .then(response => {
            this.isLoading = false;
            if (response) alert.success("Branch created successfully");
            this.getAllBranches();
            this.data_loaded = true;
            setTimeout(() => {
              this.closeModal();
              this.isLoading = false;
            }, 1000);
          })
          .catch(error => {
            this.isLoading = false;
            alert.error("Error creating branch");
            console.log(error);
          });
      }
    },
    getAllBranches() {
      this.data_loaded = false;
      if (this.getInstitutionUuid) {
        axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/api/institutions/${this.getInstitutionUuid}/branches/`,
            {
              headers: {
                authorization: `Bearer ${this.$store.getters.getToken}`
              }
            }
          )
          .then(response => {
            this.dtb_options.data = response.data;
            this.data_loaded = true;
          })
          .catch(error => {
            alert.error(
              error.response.data.message || "Error retrieving branches"
            );
          });
      }
    },
    getBranch(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/branches/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.branchData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    deleteBranch(uuid) {
      axios
        .delete(
          `${process.env.VUE_APP_BACKEND_URL}/api/branches/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          alert.success_center("Branch deleted successfully!");
          this.getAllBranches();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editBranch(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/branches/${this.selectedBranchID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Institution branch updated successfully!");
          this.getAllBranches();
          setTimeout(() => {
            this.closeModal();
            this.isLoading = false;
          }, 1000);
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          this.isLoading = false;
          console.error(err);
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditMode = false;
      this.branchData = {};
    }
  },
  mounted() {
    this.getAllBranches();
  }
};
</script>
