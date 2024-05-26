<template>
  <!-- add && edit asset modal -->
  <asset-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createAsset"
    :edit="editAsset"
    :isEdit="isEditMode"
    :assetData="assetData"
    :token="getToken"
  ></asset-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Assets">
        <template v-slot:component>
          <button-cta
            label="Add Asset"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="assets_list"
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
import moment from 'moment';
import AssetForm from "./AssetForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    AssetForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedAssetID: "",
      assetData: {},
      assets: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedAssetID = uuid;
              this.isEditMode = true;
              this.getAsset(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteAsset(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
          { title: "Description", data: "description" },
          {
            title: "Account Type",
            data: "accountType",
            render: data => `${data.accountType.title}`
          },
          {
            title: "Acquisition Type",
            data: "aquisition_type"
          },
          {
            title: "Acquisition Date",
            data: "aquisition_date",
            render(data) {
              return moment(data.start_date).format("DD/MM/YYYY");
            }
          },
          { title: "Category", data: "category" },
          { title: "Amount", data: "amount" }
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
    getAllAssets() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/assets`;
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
    getAsset(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/assets/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.assetData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createAsset(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/assets`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Asset created successfully!");
          this.getAllAssets();
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
    deleteAsset(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/assets/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Asset deleted successfully!");
          this.getAllAssets();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editAsset(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/assets/${this.selectedAssetID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Asset updated successfully!");
          this.getAllAssets();
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
    }
  },
  mounted() {
    this.getAllAssets();
  }
};
</script>
