<template>
  <!-- add && edit product modal -->
  <div class="mt-4">
    <button class="btn btn-sm btn-default" @click="this.$router.go(-1)">
      Back
    </button>
    
    <div class="card shadow w-100 mt-2 p-4">
      <button
      v-if="$guards.is_photographer()"
      @click="$router.push({ name: 'New Activity' })"
      class="btn btn-sm btn-default"
      style="width:60px;"
    >
      New
    </button>
      <section-header info="Activities ">
       
      </section-header>
      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="activity_list"
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
            btnText:"update",
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: id => {
            this.updateActivity(id);
            },
            btnParamName: "id"
          },
          {
            btnText: "Deactivate",
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-edit",
            show: (canBeRequested) => {
              return canBeRequested;
            },
            btnFn: (id) => this.Activate_activity(id),
            btnParamName: "id",
            conditionParam: "canBeRequested",
          },
          {
            btnText: "Activate",
            btnClass: "btn btn-default btn-sm",
            iconClass: "fa fa-edit",
            show: (canBeRequested) => {
              return !canBeRequested;
            },
            btnFn: (id) => this.Activate_activity(id),
            btnParamName: "id",
            conditionParam: "canBeRequested",
          },
        ],
        columns: [
          { title: " Name", data: "name" },
          { title: "Price", data: "price"},
          { title: "Activity Type", data: "activity_type" },
          { title: "CanbeRequested", data: "canBeRequested",
          render: (data) => (data["canBeRequested"] ? `YES` : "NO"), 

          }

        ],
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    get_id() {
      return this.$store.getters.getPhotographer_id;
    },
  },
  methods: {
    getAllActivity() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}photographer/${this.get_id}/activities/`;
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
    Activate_activity(id) {
      console.log(this.$store.getters.getToken);
      axios
        .put(
          `${process.env.VUE_APP_BACKEND_URL}photographer/activities/${id}/change_status`,
          {},
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
            },
          }
        )
        .then((res) => {
          alert.success_center("Activity Status successfully Changed!");
          this.getAllActivity();
          return res;
        })
        .catch((err) => {
          alert.error("An error occured!");
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
    this.getAllActivity();
  }
};
</script>

<style></style>
