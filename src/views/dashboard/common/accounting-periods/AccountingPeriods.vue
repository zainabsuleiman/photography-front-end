<template>
  <!-- add && edit accounting period modal -->
  <accounting-period-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createNewAccPeriod"
    :edit="editAccPeriod"
    :isEdit="isEditMode"
    :accPeriodData="accPeriodData"
    :activatePeriod="toggleActivePeriod"
  ></accounting-period-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of accounting periods">
        <template v-slot:component>
          <button-cta
            label="Add Period"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="accounting_periods_list"
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
import moment from "moment";
import AccountingPeriodForm from "./AccountingPeriodForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    AccountingPeriodForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedAccPeriodID: "",
      accPeriodData: {},
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedAccPeriodID = uuid;
              this.isEditMode = true;
              this.getAccountingPeriod(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteAccPeriod(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
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
          {
            title: "is Active",
            data: "is_current",
            render(data) {
              return data.is_current ? "Yes" : "No";
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
    getAllAccountingPeriods() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/accounting_periods`;
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
    getAccountingPeriod(uuid) {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/accounting_periods/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          this.accPeriodData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createNewAccPeriod(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/accounting_periods`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Accounting Period created successfully!");
          this.getAllAccountingPeriods();
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
    deleteAccPeriod(uuid) {
      axios
        .delete(
          `${process.env.VUE_APP_BACKEND_URL}/api/accounting_periods/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          }
        )
        .then(res => {
          alert.success_center("Accounting Period deleted successfully!");
          this.getAllAccountingPeriods();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editAccPeriod(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/accounting_periods/${this.selectedAccPeriodID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Accounting Period updated successfully!");
          this.getAllAccountingPeriods();
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
    toggleActivePeriod(value) {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/accounting_periods/${this.selectedAccPeriodID}/activate`;
      axios
        .put(url, value, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
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
      this.accPeriodData = {};
    }
  },
  mounted() {
    this.getAllAccountingPeriods();
  }
};
</script>

<style></style>
