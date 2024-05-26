<template>
  <!-- add && edit plan modal -->
  <plan-form
    :showModal="showModal"
    :closeModal="closeModal"
    :save="createPlan"
    :edit="editPlan"
    :isEdit="isEditMode"
    :planData="planData"
  ></plan-form>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="List of plans">
        <template v-slot:component>
          <button-cta
            label="Add Plan"
            class="btn btn-default"
            @click="openModal"
          ></button-cta>
        </template>
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="plans_list"
            :options="dtb_options.extra_options"
            :actions="dtb_options.actions"
            :data="dtb_options.data"
            :columns="dtb_options.columns"
          />
        </div>
      </div>
    </div>

    <!-- Update plan Modal -->
  </div>
</template>

<script>
import axios from "axios";
import SectionHeader from "@/components/dashboard/SectionHeader";
import DataTable from "@/components/DataTable";
import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
import PlanForm from "./PlanForm";

export default {
  name: "Plans",
  components: {
    "data-table": DataTable,
    ButtonCta,
    SectionHeader,
    PlanForm
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      plans: [],
      selectedPlanID: "",
      planData: {},
      isEditMode: false,
      data_loaded: false,
      dtb_options: {
        data: [],
        actions: this.$guards.is_super_admin()
          ? [
              {
                btnClass: "btn btn-warning btn-sm",
                iconClass: "fa fa-pencil-square",
                btnFn: uuid => {
                  this.selectedPlanID = uuid;
                  this.isEditMode = true;
                  this.getPlan(uuid);
                  setTimeout(() => {
                    this.openModal();
                  }, 100);
                },
                btnParamName: "uuid"
              },
              {
                btnClass: "btn btn-danger btn-sm",
                iconClass: "fa fa-trash",
                btnFn: uuid => this.deletePlan(uuid),
                btnParamName: "uuid"
              }
            ]
          : [],
        columns: [
          { title: "Name", data: "name" },
          {
            title: "price",
            data: "price"
          },
          {
            title: "N.o of users",
            data: "number_of_users"
          },
          {
            title: "N.o of branch",
            data: "number_of_branch"
          },
          {
            title: "Currency",
            data: "currency"
          }
        ],
        extra_options: {}
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    isFormValid() {
      return (
        this.planData.name &&
        this.planData.price &&
        this.planData.number_of_users &&
        this.planData.number_of_branch &&
        this.planData.currency
      );
    }
  },
  methods: {
    fetchPlans() {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans`;
      axios
        .get(url)
        .then(res => {
          this.dtb_options.data = res.data;
          this.data_loaded = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    getPlan(uuid) {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${uuid}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          this.planData = res.data;
          return res.data;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    editPlan(data) {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${this.selectedPlanID}`;
      axios
        .put(url, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Plan updated successfully");
          this.fetchPlans();
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
    deletePlan(uuid) {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${uuid}`;
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(() => {
          alert.success_center("Plan Deleted successfully.");
          this.fetchPlans();
        })
        .catch(() => {
          alert.error("An error occured, in deleting plan");
        });
    },
    createPlan(data) {
      this.isLoading = true;
      axios
        .post(`${process.env.VUE_APP_BACKEND_URL}/api/plans`, data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
          alert.success("Plan Created successfully.");
          this.fetchPlans();
          setTimeout(() => {
            this.closeModal();
            this.isLoading = false;
          }, 1000);
          return res;
        })
        .catch(() => {
          alert.error("An error occured, in creating plan");
          this.isLoading = false;
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditMode = false;
      this.planData = {};
    }
  },
  mounted() {
    this.fetchPlans();
  }
};
</script>

<style></style>
