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
            <option value="Short term">Short term</option>
            <option value="Long term">Long term</option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="initiationType"
            >Initiation Type</label
          >
         <select
            class="form-control form-control-alternative"
            id="initiationType"
            v-model="data.initiationType"
          >
            <option value="">Select Initiation Type</option>
            <option value="Asset">Asset</option>
            <option value="Expense">Expense</option>
            <option value="Short Liability">Short Liability</option>
            <option value="Long Liability">Long Liability</option>
            <option value="Shareholder">Shareholder</option>
            <option value="Fund">Fund</option>
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
              v-for="(acc, index) in liabilityAccountTypes"
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
            :disabled="
              !selectedLiabilityAccountID || selectedLiabilityAccountID == ''
            "
          >
            <option value="">Select Sub Type</option>
            <option
              v-for="(subAcc, index) in subLiabilityAccountTypes"
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
            <option value="">Select Suppleir</option>
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
        initiationType: "",
        accountTypeUuid: "",
        accountSubTypeUuid: "",
        amount: "",
        acquistionDate: new Date(),
        supplierId: ""
      },
      liabilityAccountTypes: [],
      subLiabilityAccountTypes: [],
      vendors: []
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
    liabilityData: {
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
    liabilityData() {
      this.data = {
        title: this.liabilityData.title,
        description: this.liabilityData.description,
        category: this.liabilityData.category,
        initiationType: this.liabilityData.initiation_type,
        accountTypeUuid: this.liabilityData.accountType
          ? this.liabilityData.accountType.uuid
          : "",
        accountSubTypeUuid: this.liabilityData.accountSubType
          ? this.liabilityData.accountSubType.uuid
          : "",
        amount: this.liabilityData.amount,
        acquistion_date: this.liabilityData.acquistion_date,
        supplierId: this.liabilityData.vendor ? this.liabilityData.vendor.uuid : ""
      };
    },
    selectedLiabilityAccountID(newValue) {
      if (newValue) {
        this.getAllSubLiabilityAccountTypes(newValue);
      }
    }
  },
  computed: {
    isFormValid() {
      return (
        this.data.title &&
        this.data.description &&
        this.data.category &&
        this.data.initiationType &&
        this.data.accountTypeUuid &&
        this.data.accountSubTypeUuid &&
        this.data.amount
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Liability";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    },
    selectedLiabilityAccountID() {
      return this.data.accountTypeUuid;
    }
  },
  methods: {
    getAllLiabilityAccount() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Liability/accounts_types`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          this.liabilityAccountTypes = res.data;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    getAllSubLiabilityAccountTypes(liabilityAccountUuid) {
      if (!liabilityAccountUuid) {
        this.subLiabilityAccountTypes = [];
        return;
      }
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${liabilityAccountUuid}/account_sub_types/`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          this.subLiabilityAccountTypes = res.data;
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
        initiation_type: this.data.initiationType,
        accountType_uuid: this.data.accountTypeUuid,
        accountSubType_uuid: this.data.accountSubTypeUuid,
        amount: this.data.amount,
        acquistion_date: new Date(this.data.acquistionDate),
        supplierId: this.data.supplierId
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  },
  mounted() {
    this.getAllLiabilityAccount();
    this.getAllVendors();
  }
};
</script>
