<template>
  <!-- add && edit accountType modal -->
  <sub-account-type-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createSubAssetAccount"
    :edit="editSubAssetAccount"
    :isEdit="isEditMode"
    :itemData="subAssetAccountData"
    :accountTypes="assetAccountTypes"
  ></sub-account-type-form>

  <section-header info="List of Sub Asset Account Types">
    <template v-slot:component>
      <div class="d-flex align-items-center">
        <select
          class="form-control form-control-alternative mr-2"
          style="width:200px"
          id="accountType"
          v-model="selectedAssetAccountID"
        >
          <option value="">Select Account Type</option>
          <option
            v-for="(acc, index) in assetAccountTypes"
            :key="index"
            :value="acc.uuid"
          >
            {{ acc.title }}
          </option>
        </select>
        <button-cta
          label="Add Asset Type"
          class="btn btn-default"
          @click="openModal"
        ></button-cta>
      </div>
    </template>
  </section-header>

  <div class="row mt-4">
    <div class="col-12">
      <data-table
        v-if="data_loaded"
        id="sub-asset-accounts-types-list"
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
import moment from "moment";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DataTable from "@/components/DataTable";
import ButtonCta from "@/components/Button/ButtonCta";
import SubAccountTypeForm from "./SubAccountTypeForm";
import { alert } from "@/utils/alertUtils";

export default {
  components: {
    SubAccountTypeForm,
    ButtonCta,
    DataTable,
    SectionHeader
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: true,
      selectedSubAssetAccountID: "",
      selectedAssetAccountID: "",
      subAssetAccountData: {},
      assetAccountTypes: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedSubAssetAccountID = uuid;
              this.isEditMode = true;
              this.getSubAssetAccount(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteSubAssetAccount(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
          {
            title: "Parent Account Type",
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
  watch: {
    selectedAssetAccountID(newValue) {
      if (newValue) {
        this.getAllSubAssetAccountTypes(newValue);
      } else {
        this.dtb_options.data = [];
        this.data_loaded = true;
      }
    }
  },
  methods: {
    getAllAssetAccountTypes() {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Asset/accounts_types`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.assetAccountTypes = res.data;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    getAllSubAssetAccountTypes(assetAccountUuid) {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${assetAccountUuid}/account_sub_types/`;
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
    getSubAssetAccount(uuid) {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/sub_types/${uuid}/details`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          this.subAssetAccountData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createSubAssetAccount(data, assetAccountUuid) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/sub_types`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Sub Asset Account Type created successfully!");
          this.selectedAssetAccountID = assetAccountUuid;
          this.getAllSubAssetAccountTypes(assetAccountUuid);
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
    deleteSubAssetAccount(uuid) {
      axios
        .delete(
          `${process.env.VUE_APP_BACKEND_URL}/api/sub_types/${uuid}/details`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          alert.success_center("Asset Account Type deleted successfully!");
          this.getAllSubAssetAccountTypes(this.selectedAssetAccountID);
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editSubAssetAccount(data, assetAccountUuid) {
      this.isLoading = true;
      var url = `/api/sub_types/${this.selectedSubAssetAccountID}/details`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Asset Account Type updated successfully!");
          this.selectedAssetAccountID = assetAccountUuid;
          this.getAllSubAssetAccountTypes(assetAccountUuid);
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
    this.getAllAssetAccountTypes();
  }
};
</script>
