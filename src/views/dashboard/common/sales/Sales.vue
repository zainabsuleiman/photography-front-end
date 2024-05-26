<template>
  <!-- add && edit sale modal -->
  <sale-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createSale"
    :edit="editSale"
    :isEdit="isEditMode"
    :saleData="saleData"
    :products="products"
    :customers="customers"
  ></sale-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Sales">
        <template v-slot:component>
          <button-cta
            label="Add Sale"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="sales_list"
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
import SaleForm from "./SaleForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    SaleForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedSaleID: "",
      saleData: {},
      products: [],
      sales: [],
      customers: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedSaleID = uuid;
              this.isEditMode = true;
              this.getSale(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteSale(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Customer", data: "customer", render: data => data.customer.Names },
          { title: "Product", data: "product", render: data => data.product.productName },
          { title: "Payment Mode", data: "paymentMode" },
          { title: "Payment Type", data: "paymentType" },
          { title: "Bank", data: "amount_paid_bank" },
          { title: "Cash", data: "amount_paid_cash" },
          {
            title: "Incl. VAT",
            data: "is_vat_included",
            render: data => (data.is_vat_included ? "Yes" : "No")
          },
          { title: "Percentage", data: "vat_percentage" },
          { title: "Total", data: "amount" }
        ],
        extra_options: {}
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    institutionUuid() {
      return this.$store.getters.getUserProfile.institution.uuid;
    },
    branchUuid() {
      return this.$store.getters.getUserProfile.branch.uuid;
    }
  },
  methods: {
    getAllSales() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/sales`;
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
    getSale(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/sales/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.saleData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createSale(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/sales`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Sale created successfully!");
          this.getAllSales();
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
    deleteSale(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/sales/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Sale deleted successfully!");
          this.getAllSales();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editSale(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/sales/${this.selectedSaleID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Sale updated successfully!");
          this.getAllSales();
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
    getAllProducts() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/products`;

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.products = res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    getAllCustomers() {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/customers`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.customers = res.data;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditMode = false;
      this.saleData = {};
    }
  },
  mounted() {
    this.getAllSales();
    this.getAllProducts();
    this.getAllCustomers();
  }
};
</script>

<style></style>
