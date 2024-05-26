<template>
  <!-- add && edit asset modal -->
  <liability-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createLiability"
    :edit="editLiability"
    :isEdit="isEditMode"
    :liabilityData="liabilityData"
    :token="getToken"
  ></liability-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of Liabilities">
        <template v-slot:component>
          <button-cta
            label="Add Liability"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="liabilities_list"
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
import LiabilityForm from "./LiabilityForm";
import moment from "moment";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    LiabilityForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedLiabilityID: "",
      liabilityData: {},
      liabilities: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: uuid => {
              this.selectedLiabilityID = uuid;
              this.isEditMode = true;
              this.getLiability(uuid);
              setTimeout(() => {
                this.openModal();
              }, 100);
            },
            btnParamName: "uuid"
          },
          {
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: uuid => this.deleteLiability(uuid),
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
            title: "Acquisition Date",
            data: "aquisition_date",
            render(data) {
              return moment(data.start_date).format("DD/MM/YYYY");
            }
          },
          {
            title: "Initiation Type",
            data: "initiation_type"
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
    getAllLiabilities() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/liabilities/`;
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
    getLiability(uuid) {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/liabilities/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.liabilityData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    createLiability(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/liabilities/`;
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Liability created successfully!");
          this.getAllLiabilities();
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
    deleteLiability(uuid) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_URL}/api/liabilities/${uuid}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success_center("Liability deleted successfully!");
          this.getAllLiabilities();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editLiability(data) {
      this.isLoading = true;
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/liabilities/${this.selectedLiabilityID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Liability updated successfully!");
          this.getAllLiabilities();
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
    this.getAllLiabilities();
  }
};
</script>
