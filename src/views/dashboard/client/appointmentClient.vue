<template>
  <!-- add && edit product modal -->
  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="Appointment List">
       
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="products_list"
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
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import DataTable from "@/components/DataTable.vue";
// import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
// import moment from "moment";

export default {
  components: {
    DataTable,
    SectionHeader,
    // ButtonCta,
  
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedProductID: "",
      productData: {},
      productCategories: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnText:"",
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-list",
            btnFn: id => {
             this.$router.push({
                name: "Approved-Appointment",
                params: { id: id },
              });
            },
            btnParamName: "id"
          }
        ],
        columns: [
          { title: "Location", data: "location" },
          { title: "Hours-Min", data: "hours_min" },
          { title: "Description", data: "description" },
          { title: "Payment Status", data: "payment_status" },
          { title: "Status", data: "status" },
          { title: "Total Price", data: "appointment_total_price" },
        ],
        
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    getAllPhotographer() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}api/client/appointment`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
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
  
    updatePhotographer(id) {
      var url =`${process.env.VUE_APP_BACKEND_URL}photographer/approve/${id}`;
      axios
        .post(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Photographer approved successfully!");
          this.getAllPhotographer();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editProduct(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/products/${this.selectedProductID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Product updated successfully!");
          this.getAllProducts();
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
      this.productData = {
        productName: "",
        brand: "",
        productCode: "",
        unitPrice: "",
        category: {},
        expiryDate: ""
      };
    }
  },
  mounted() {
    this.getAllPhotographer();
  }
};
</script>

<style></style>
