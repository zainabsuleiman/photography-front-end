<template>
  <!-- budget lines modal -->
  <modal title="Budget Lines" :show="showBudgetLinesModal" @close="closeBudgetLinesModal" width="60%" :hideFooter="true">
    <budget-lines 
        :budgetID="selectedBudgetID"
    ></budget-lines>
  </modal>

  <!-- Add && Edit budget modal -->
  <budget-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createNewBudget"
    :edit="editBudget"
    :isEdit="isEditMode"
    :budgetData="budgetData"
  ></budget-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Budgets">
        <template v-slot:component>
          <button-cta
            label="Add Budget"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="budgets_list"
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
import Modal from "@/components/modal/Modal";
import moment from "moment";
import BudgetForm from "./BudgetForm";
import BudgetLines from "./BudgetLines";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    BudgetForm,
    Modal,
    BudgetLines
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedBudgetID: "",
      budgetData: {},
      isEditMode: false,
      showBudgetLinesModal: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-default btn-sm",
            iconClass: "fa fa-eye",
            btnFn: uuid => {
              this.selectedBudgetID = uuid;
              setTimeout(() => {
                this.showBudgetLinesModal = true;
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedBudgetID = uuid;
              this.isEditMode = true;
              this.getBudget(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteBudget(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          {
            title: "Start Date",
            data: "start_date",
            render(data) {
              return moment(data.start_date).format("DD/MM/YYYY");
            }
          },
          {
            title: "End Date",
            data: "end_date",
            render(data) {
              return moment(data.end_date).format("DD/MM/YYYY");
            }
          },
          { title: "Amount", data: "amount" },
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
    getAllBudgets() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/budgets`;
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
    getBudget(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/budgets/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.budgetData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createNewBudget(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/budgets`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Budget created successfully!");
          this.getAllBudgets();
          setTimeout(() => {
            this.closeModal();
          }, 1000);
          return res;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    deleteBudget(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/budgets/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Budget deleted successfully!");
          this.getAllBudgets();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editBudget(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/budgets/${this.selectedBudgetID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Budget updated successfully!");
          this.getAllBudgets();
          setTimeout(() => {
            this.closeModal();
          }, 1000);
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditMode = false;
      this.budgetData = {};
    },
    closeBudgetLinesModal() {
      this.showBudgetLinesModal = false;
    }
  },
  mounted() {
    this.getAllBudgets();
  }
};
</script>
