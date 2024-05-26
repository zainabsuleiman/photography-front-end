<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="50%">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="title">Title</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="title"
            v-model="data.title"
            placeholder="Enter Title"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="description"
            >Description</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="description"
            v-model="data.description"
            placeholder="Enter description"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="category">Category</label>
          <select
            class="form-control form-control-alternative"
            id="category"
            v-model="data.category"
          >
            <option value="">Select Category</option>
            <option value="Current">Current</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="aquisitionType">Aquisition Type</label>
          <select
            class="form-control form-control-alternative"
            id="aquisitionType"
            v-model="data.aquisitionType"
          >
            <option value="">Select Acquisition Type</option>
            <option value="Loan">Loan</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Grant">Grant</option>
            <option value="Subsidies">Subsidies</option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="accountType"
            >Account Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="accountType"
            v-model="data.accountTypeUuid"
          >
            <option value="">Select Type</option>
            <option
              v-for="(acc, index) in assetAccountTypes"
              :key="index"
              :value="acc.uuid"
            >
              {{ acc ? acc.title : "" }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="accountType"
            >Sub Account Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="accountType"
            v-model="data.accountSubTypeUuid"
            :disabled="!selectedAssetAccountID || selectedAssetAccountID == ''"
          >
            <option value="">Select Sub Type</option>
            <option
              v-for="(subAcc, index) in subAssetAccountTypes"
              :key="index"
              :value="subAcc.uuid"
            >
              {{ subAcc.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="vendor"
            >Supplier</label
          >
          <select
            class="form-control form-control-alternative"
            id="accountType"
            v-model="data.supplierId"
          >
            <option value="">Select Supplier</option>
            <option
              v-for="(vendor, index) in vendors"
              :key="index"
              :value="vendor.uuid"
            >
              {{ vendor.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="acquisition_date">Acquistion Date</label>
          <input
            type="date"
            class="form-control form-control-alternative"
            id="acquisition_date"
            v-model="data.acquistionDate"
            placeholder="Enter acquisition date"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="amount">Amount</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="amount"
            v-model="data.amount"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>

    <template v-slot:actions>
      <button-cta
        :label="renderBtnLabel"
        @click="handleSubmit"
        :isDisabled="!isFormValid"
        :isBusy="isLoading"
      ></button-cta>
    </template>
  </modal>
</template>

<script>
import axios from "axios";
import Modal from "@/components/modal/Modal";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  components: {
    Modal,
    ButtonCta
  },
  data() {
    return {
      isLoading: false,
      data: {
        title: "",
        description: "",
        category: "",
        aquisitionType: "",
        accountTypeUuid: "",
        accountSubTypeUuid: "",
        amount: "",
        acquistionDate: new Date(),
        supplierId: ""
      },
      assetAccountTypes: [],
      subAssetAccountTypes: [],
      vendors: [],
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    closeModal: {
      type: Function,
      default: () => {}
    },
    save: {
      type: Function,
      default: () => {}
    },
    edit: {
      type: Function,
      default: () => {}
    },
    assetData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    token: {
      type: String
    }
  },
  watch: {
    assetData() {
      this.data = {
        title: this.assetData.title,
        description: this.assetData.description,
        category: this.assetData.category,
        aquisitionType: this.assetData.aquisition_type,
        accountTypeUuid: this.assetData.accountType
          ? this.assetData.accountType.uuid
          : "",
        accountSubTypeUuid: this.assetData.accountSubType
          ? this.assetData.accountSubType.uuid
          : "",
        amount: this.assetData.amount,
        acquistionDate: this.assetData.acquistion_date,
        supplierId: this.assetData.supplierId || ""
      };
    },
    selectedAssetAccountID(newValue) {
      if (newValue) {
        this.getAllSubAssetAccountTypes(newValue);
      }
    }
  },
  computed: {
    isFormValid() {
      return (
        this.data.title &&
        this.data.description &&
        this.data.category &&
        this.data.aquisitionType &&
        this.data.accountTypeUuid &&
        this.data.accountSubTypeUuid &&
        this.data.amount &&
        this.data.acquistionDate &&
        this.data.supplierId
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Asset";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    },
    selectedAssetAccountID() {
      return this.data.accountTypeUuid;
    }
  },
  methods: {
    getAllAssetAccount() {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Asset/accounts_types`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
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
      if (!assetAccountUuid) {
        this.subAssetAccountTypes = [];
        return;
      }
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${assetAccountUuid}/account_sub_types/`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          this.subAssetAccountTypes = res.data;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    getAllVendors() {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/vendors`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          this.vendors = res.data;
        })  
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        title: this.data.title,
        description: this.data.description,
        category: this.data.category,
        aquisition_type: this.data.aquisitionType,
        accountType_uuid: this.data.accountTypeUuid,
        accountSubType_uuid: this.data.accountSubTypeUuid,
        amount: this.data.amount,
        acquistion_date: this.data.acquistionDate ? new Date(this.data.acquistionDate) : new Date(),
        supplierId: this.data.supplierId
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  },
  mounted() {
    this.getAllAssetAccount();
    this.getAllVendors();
  }
};
</script>
