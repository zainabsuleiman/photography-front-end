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
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
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
              !selectedExpenseAccountID || selectedExpenseAccountID == ''
            "
          >
            <option value="">Select Sub Type</option>
            <option
              v-for="(subAcc, index) in subExpenseAccountTypes"
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
          <label class="form-control-label" for="responsible">Reponsible</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="responsible"
            v-model="data.responsible"
            placeholder="Enter responsible"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="aquisitionType"
            >Initiation Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="aquisitionType"
            v-model="data.initiationType"
          >
            <option value="">Select Initiation Type</option>
            <option value="Loan">Loan</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Loaned Income Tax">Loaned Income Tax</option>
            <option value="Income Tax">Income Tax</option>
          </select>
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
        amount: "",
        responsible: "",
        initiationType: "",
        accountTypeUuid: "",
        accountSubTypeUuid: "",
      },
      equityAccountTypes: [],
      subExpenseAccountTypes: []
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
    expenseData: {
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
    expenseData() {
      this.data = {
        title: this.expenseData.title,
        description: this.expenseData.description,
        category: this.expenseData.category,
        initiationType: this.expenseData.initiation_type,
        accountTypeUuid: this.expenseData.accountType
          ? this.expenseData.accountType.uuid
          : "",
        accountSubTypeUuid: this.expenseData.accountSubType
          ? this.expenseData.accountSubType.uuid
          : "",
        amount: this.expenseData.amount
      };
    },
    selectedExpenseAccountID(newValue) {
      if (newValue) {
        this.getAllSubExpenseAccountTypes(newValue);
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
        this.data.amount &&
        this.data.responsible
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Expense";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    },
    selectedExpenseAccountID() {
      return this.data.accountTypeUuid;
    }
  },
  methods: {
    getAllExpenseAccount() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Expense/accounts_types`;
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
    getAllSubExpenseAccountTypes(equityAccountUuid) {
      if (!equityAccountUuid) {
        this.subExpenseAccountTypes = [];
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
          this.subExpenseAccountTypes = res.data;
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
        responsible: this.data.responsible,
        category: this.data.category,
        initiation_type: this.data.initiationType,
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
    this.getAllExpenseAccount();
  }
};
</script>
