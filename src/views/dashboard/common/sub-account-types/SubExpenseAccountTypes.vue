<template>
  <!-- add && edit accountType modal -->
  <sub-account-type-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createSubExpenseAccount"
    :edit="editSubExpenseAccount"
    :isEdit="isEditMode"
    :itemData="subExpenseAccountData"
    :accountTypes="expenseAccountTypes"
  ></sub-account-type-form>

  <section-header info="List of Sub Expense Account Types">
    <template v-slot:component>
      <div class="d-flex align-items-center">
        <select
          class="form-control form-control-alternative mr-2"
          style="width:200px"
          id="accountType"
          v-model="selectedExpenseAccountID"
        >
          <option value="">Select Account Type</option>
          <option
            v-for="(acc, index) in expenseAccountTypes"
            :key="index"
            :value="acc.uuid"
          >
            {{ acc.title }}
          </option>
        </select>
        <button-cta
          label="Add Expense Type"
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
        id="sub-expense-accounts-types-list"
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
      selectedSubExpenseAccountID: "",
      selectedExpenseAccountID: "",
      subExpenseAccountData: {},
      expenseAccountTypes: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedSubExpenseAccountID = uuid;
              this.isEditMode = true;
              this.getSubExpenseAccount(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteSubExpenseAccount(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
          {
            title: "Parent Account Type",
            data: "reference",
            render(data) {
              return data.reference ? data.reference : "Expense";
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
    selectedExpenseAccountID(newValue) {
      if (newValue) {
        this.getAllSubExpenseAccountTypes(newValue);
      } else {
        this.dtb_options.data = [];
        this.data_loaded = true;
      }
    }
  },
  methods: {
    getAllExpenseAccountTypes() {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/Expense/accounts_types`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.expenseAccountTypes = res.data;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    getAllSubExpenseAccountTypes(expenseAccountUuid) {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/account_types/${expenseAccountUuid}/account_sub_types/`;
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
    getSubExpenseAccount(uuid) {
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
          this.subExpenseAccountData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createSubExpenseAccount(data, expenseAccountUuid) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/sub_types`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Sub Expense Account Type created successfully!");
          this.selectedExpenseAccountID = expenseAccountUuid;
          this.getAllSubExpenseAccountTypes(expenseAccountUuid);
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
    deleteSubExpenseAccount(uuid) {
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
          alert.success_center("Expense Account Type deleted successfully!");
          this.getAllSubExpenseAccountTypes(this.selectedExpenseAccountID);
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editSubExpenseAccount(data, expenseAccountUuid) {
      this.isLoading = true;
      var url = `/api/sub_types/${this.selectedSubExpenseAccountID}/details`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Expense Account Type updated successfully!");
          this.selectedExpenseAccountID = expenseAccountUuid;
          this.getAllSubExpenseAccountTypes(expenseAccountUuid);
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
    this.getAllExpenseAccountTypes();
  }
};
</script>
