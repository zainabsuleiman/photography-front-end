<template>
  <!-- add && edit product category modal -->
  <product-category-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createNewProdCategory"
    :edit="editProdCategory"
    :isEdit="isEditMode"
    :prodCategoryData="prodCategoryData"
  ></product-category-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Product categories">
        <template v-slot:component>
          <button-cta
            label="Add Category"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="product_categories_list"
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
import ProductCategoryForm from "./ProductCategoryForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    ProductCategoryForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedProdCategoryID: "",
      prodCategoryData: {},
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedProdCategoryID = uuid;
              this.isEditMode = true;
              this.getProdCategory(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteProdCategory(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
          { title: "Description", data: "description" }
        ],
        extra_options: {}
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    getAllProdCategories() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/product_categories/`;
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
    getProdCategory(uuid) {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/product_categories/${uuid}/`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          this.prodCategoryData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createNewProdCategory(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/product_categories/`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Product Category created successfully!");
          this.getAllProdCategories();
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
    deleteProdCategory(uuid) {
      axios
        .delete(
          `${process.env.VUE_APP_BACKEND_URL}/api/product_categories/${uuid}/`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          alert.success_center("Product Category deleted successfully!");
          this.getAllProdCategories();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editProdCategory(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/product_categories/${this.selectedProdCategoryID}/`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Product Category updated successfully!");
          this.getAllProdCategories();
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
      this.prodCategoryData = {};
    }
  },
  mounted() {
    this.getAllProdCategories();
  }
};
</script>

<style></style>
