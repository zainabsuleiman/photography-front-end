<template>
  <!-- add && edit vendor modal -->
  <vendor-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createVendor"
    :edit="editVendor"
    :isEdit="isEditMode"
    :vendorData="vendorData"
  ></vendor-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Vendors">
        <template v-slot:component>
          <button-cta
            label="Add Vendor"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="vendors_list"
            :options="dtb_options.extra_options"
            :actions="dtb_options.actions"
            :data="dtb_options.data"
            :columns="dtb_options.columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DataTable from "@/components/DataTable";
import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
import VendorForm from "./VendorForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    VendorForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedVendorID: "",
      vendorData: {},
      vendors: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedVendorID = uuid;
              this.isEditMode = true;
              this.getVendor(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteVendor(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Names", data: "name" },
          { title: "Email", data: "email" },
          { title: "Phone No.", data: "phoneNumber" },
          { title: "Address", data: "physical_address" },
          { title: "Vendor Type", data: "vendorType" }
        ],
        extra_options: {}
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    getAllVendors() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/vendors`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.dtb_options.data = res.data;
          this.data_loaded = true;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    getVendor(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/vendors/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.vendorData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createVendor(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/vendors`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Vendor created successfully!");
          this.getAllVendors();
          setTimeout(() => {
            this.closeModal();
            this.isLoading = false;
          }, 1000);
          return res;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          this.isLoading = false;
          console.error(err);
        });
    },
    deleteVendor(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/vendors/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Vendor deleted successfully!");
          this.getAllVendors();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editVendor(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/vendors/${this.selectedVendorID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Vendor updated successfully!");
          this.getAllVendors();
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
      this.vendorData = {
        name: "",
        phoneNumber: "",
        email: "",
        tin: "",
        physical_address: "",
        vendorType: ""
      };
    }
  },
  mounted() {
    this.getAllVendors();
  }
};
</script>

<style></style>
