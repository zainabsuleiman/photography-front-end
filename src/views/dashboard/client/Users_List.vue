<template>
  <!-- add && edit product modal -->
  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Users ">
       
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
import { alert } from "@/utils/alertUtils.vue";
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
        
        columns: [
          { title: "Names", data: "names" },
          { title: "Phone", data: "phone" },
          { title: "Username", data: "username" },
          { title: "Email", data: "email" },
          { title: "Active", data: "is_active",
          render: (data) => (data["is_active"] ? `YES` : "NO"), },
          { title: "Created At", data: "created_at" },
          { title: "Updated At", data: "updated_at" },
          
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
      var url = `${process.env.VUE_APP_BACKEND_URL}api/client/Userslist/`;
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
        .put(url,'', {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
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
