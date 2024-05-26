<template>
  <!-- Add && Edit budget modal -->
  <budget-line-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createNewBudgetLine"
    :edit="editBudgetLine"
    :isEdit="isEditMode"
    :budgetLineData="budgetLineData"
  ></budget-line-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Budgets line">
        <template v-slot:component>
          <button-cta
            label="Add Budget Line"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="budget_lines_list"
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
import BudgetLineForm from "./BudgetLineForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    BudgetLineForm,
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedBudgetLineID: "",
      budgetLineData: {},
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedBudgetLineID = uuid;
              this.isEditMode = true;
              this.getBudgetLine(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteBudgetLine(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: 'Title', data: "title" },
          { title: "Description", data: "description" },
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
  props: {
    budgetID: {
        type: String,
    }
  },
  methods: {
    getAllBudgetLines() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/budgets/${this.budgetID}/BudgetLines`;
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
    getBudgetLine(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/budget_lines/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.budgetLineData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createNewBudgetLine(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/budgets/${this.budgetID}/BudgetLines`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("BudgetLine created successfully!");
          this.getAllBudgetLines();
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
    deleteBudgetLine(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/budget_lines/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("BudgetLine deleted successfully!");
          this.getAllBudgetLines();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editBudgetLine(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/budget_lines/${this.selectedBudgetLineID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("BudgetLine updated successfully!");
          this.getAllBudgetLines();
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
      this.budgetLineData = {};
    }
  },
  mounted() {
    this.getAllBudgetLines();
  }
};
</script>
