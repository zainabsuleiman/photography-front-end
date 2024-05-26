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
            <option value="Capital">Capital</option>
            <option value="Donations">Donations</option>
            <option value="Earnings">Earnings</option>
            <option value="Reserves">Reserves</option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="aquisitionType"
            >Aquisition Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="aquisitionType"
            v-model="data.aquisitionType"
          >
            <option value="">Select Acquisition Type</option>
            <option value="Asset">Asset</option>
            <option value="Capital">Capital</option>
            <option value="Receivable">Receivable</option>
            <option value="Reserve">Reserve</option>
            <option value="Asset Revaluation">Asset Revaluation</option>
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
              v-for="(acc, index) in equityAccountTypes"
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
              !selectedEquityAccountID || selectedEquityAccountID == ''
            "
          >
            <option value="">Select Sub Type</option>
            <option
              v-for="(subAcc, index) in subEquityAccountTypes"
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
        amount: ""
      },
      equityAccountTypes: [],
      subEquityAccountTypes: []
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
    equityData: {
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
    equityData() {
      this.data = {
        title: this.equityData.title,
        description: this.equityData.description,
        category: this.equityData.category,
        aquisitionType: this.equityData.aquisition_type,
        accountTypeUuid: this.equityData.accountType
          ? this.equityData.accountType.uuid
          : "",
        accountSubTypeUuid: this.equityData.accountSubType
          ? this.equityData.accountSubType.uuid
          : "",
        amount: this.equityData.amount
      };
    },
    selectedEquityAccountID(newValue) {
      if (newValue) {
        this.getAllSubEquityAccountTypes(newValue);
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
        this.data.amount
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Equity";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    },
    selectedEquityAccountID() {
      return this.data.accountTypeUuid;
    }
  },
  methods: {
    getAllEquityAccount() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Equity/accounts_types`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          this.equityAccountTypes = res.data;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    getAllSubEquityAccountTypes(equityAccountUuid) {
      if (!equityAccountUuid) {
        this.subEquityAccountTypes = [];
        return;
      }
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${equityAccountUuid}/account_sub_types/`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          this.subEquityAccountTypes = res.data;
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
        amount: this.data.amount
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  },
  mounted() {
    this.getAllEquityAccount();
  }
};
</script>
