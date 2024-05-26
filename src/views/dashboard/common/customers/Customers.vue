<template>
  <!-- add && edit customer modal -->
  <customer-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createCustomer"
    :edit="editCustomer"
    :isEdit="isEditMode"
    :customerData="customerData"
  ></customer-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Customers">
        <template v-slot:component>
          <button-cta
            label="Add Customer"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="customers_list"
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
import CustomerForm from "./CustomerForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    CustomerForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedCustomerID: "",
      customerData: {},
      customers: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedCustomerID = uuid;
              this.isEditMode = true;
              this.getCustomer(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteCustomer(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Names", data: "Names" },
          { title: "Email", data: "email" },
          { title: "Phone No.", data: "phoneNumber" },
          { title: "Address", data: "address" }
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
    getAllCustomers() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/customers`;
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
    getCustomer(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/customers/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.customerData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createCustomer(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/customers`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Customer created successfully!");
          this.getAllCustomers();
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
    deleteCustomer(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/customers/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Customer deleted successfully!");
          this.getAllCustomers();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editCustomer(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/customers/${this.selectedCustomerID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Customer updated successfully!");
          this.getAllCustomers();
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
      this.customerData = {
        names: "",
        email: "",
        phoneNumber: "",
        address: ""
      };
    }
  },
  mounted() {
    this.getAllCustomers();
  }
};
</script>

<style></style>
