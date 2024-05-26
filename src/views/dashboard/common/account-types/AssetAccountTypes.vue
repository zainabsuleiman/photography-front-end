<template>
  <!-- add && edit accountType modal -->
  <account-type-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createAssetAccount"
    :edit="editAssetAccount"
    :isEdit="isEditMode"
    :itemData="assetAccountData"
    referenceName="Asset"
  ></account-type-form>

  <section-header info="List of Asset Accounts">
    <template v-slot:component>
      <button-cta
        label="Add Asset Type"
        class="btn btn-default"
        @click="openModal"
      ></button-cta>
    </template>
  </section-header>

  <div class="row mt-4">
    <div class="col-12">
      <data-table
        v-if="data_loaded"
        id="asset-accounts-types-list"
        :options="dtb_options.extra_options"
        :actions="dtb_options.actions"
        :data="dtb_options.data"
        :columns="dtb_options.columns"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DataTable from "@/components/DataTable";
import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
import AccountTypeForm from "./AccountTypeForm";
import moment from "moment";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    AccountTypeForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedAssetAccountID: "",
      assetAccountData: {},
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedAssetAccountID = uuid;
              this.isEditMode = true;
              this.getAssetAccount(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteAssetAccount(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
          {
            title: "Reference",
            data: "reference",
            render(data) {
              return data.reference ? data.reference : "Asset";
            }
          },
          {
            title: "Created At",
            data: "doneAt",
            render(data) {
              return moment(data.doneAt).format("DD/MM/YYYY");
            }
          }
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
    getAllAssetAccount() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Asset/accounts_types`;
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
    getAssetAccount(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/account_types/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.assetAccountData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createAssetAccount(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Asset Account Type created successfully!");
          this.getAllAssetAccount();
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
    deleteAssetAccount(uuid) {
      axios
        .delete(
          `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          alert.success_center("Asset Account Type deleted successfully!");
          this.getAllAssetAccount();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editAssetAccount(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${this.selectedAssetAccountID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Asset Account Type updated successfully!");
          this.getAllAssetAccount();
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
    this.getAllAssetAccount();
  }
};
</script>
