<template>
  <!-- add && edit equity modal -->
  <equity-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createEquity"
    :edit="editEquity"
    :isEdit="isEditMode"
    :equityData="equityData"
    :token="getToken"
  ></equity-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Equities">
        <template v-slot:component>
          <button-cta
            label="Add Equity"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="equities_list"
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
import EquityForm from "./EquityForm";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    EquityForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedEquityID: "",
      equityData: {},
      equities: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedEquityID = uuid;
              this.isEditMode = true;
              this.getEquity(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteEquity(uuid),
            btnParamName: "uuid"
          }
        ],
        columns: [
          { title: "Title", data: "title" },
          { title: "Description", data: "description" },
          {
            title: "Account Type",
            data: "accountType",
            render: data => `${data.accountType.title}`
          },
          {
            title: "Acquisition Type",
            data: "aquisition_type"
          },
          { title: "Category", data: "category" },
          { title: "Amount", data: "amount" }
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
    getAllEquities() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/equities`;
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
    getEquity(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/equities/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.equityData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createEquity(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/equities`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Equity created successfully!");
          this.getAllEquities();
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
    deleteEquity(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/equities/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Equity deleted successfully!");
          this.getAllEquities();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editEquity(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/equities/${this.selectedEquityID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Equity updated successfully!");
          this.getAllEquities();
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
    this.getAllEquities();
  }
};
</script>
