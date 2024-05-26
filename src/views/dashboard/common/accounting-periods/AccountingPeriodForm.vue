<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="title">Title</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="title"
            v-model="periodData.title"
            placeholder="Enter title"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="start_date">Start Date</label>
          <input
            type="date"
            class="form-control form-control-alternative"
            id="start_date"
            v-model="periodData.start_date"
            placeholder="Enter start date"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="end_date">End Date</label>
          <input
            type="date"
            class="form-control form-control-alternative"
            id="end_date"
            v-model="periodData.end_date"
            placeholder="Enter end date"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label mb-3">Is Current active period</label>
          <toggle-switch @toggle="switchToggle" :value="isCurrent"></toggle-switch>
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
import Modal from "@/components/modal/Modal";
import ButtonCta from "@/components/Button/ButtonCta";
import moment from "moment";
import ToggleSwitch from "@/components/toggle-switch/ToggleSwitch";

export default {
  components: {
    Modal,
    ButtonCta,
    ToggleSwitch,
  },
  data() {
    return {
      isLoading: false,
      periodData: {
        title: "",
        start_date: "",
        end_date: ""
      },
      isCurrent: false,
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
    accPeriodData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    activatePeriod: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    accPeriodData() {
      this.periodData = {
        title: this.accPeriodData.title,
        start_date: moment(this.accPeriodData.start_date).format("YYYY-MM-DD"),
        end_date: moment(this.accPeriodData.end_date).format("YYYY-MM-DD")
      };

      this.isCurrent = this.accPeriodData.is_current;
    }
  },
  computed: {
    isFormValid() {
      return (
        this.periodData.title &&
        this.periodData.start_date &&
        this.periodData.end_date
      );
    },
    renderTitle() {
      return this.isEdit
        ? `Edit ${this.periodData.title}`
        : "New Accounting Period";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        title: this.periodData.title,
        start_date: new Date(this.periodData.start_date),
        end_date: new Date(this.periodData.end_date)
      };
      if(this.isEdit) {
        await this.edit(data);
        await this.activatePeriod({is_current: this.isCurrent});
      } else {
        await this.save(data);
        await this.activatePeriod({is_current: this.isCurrent});
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    switchToggle(value) {
      this.isCurrent = value;
    }
  },
  mounted() {
    if (this.isEdit && this.accPeriodData) {
      this.periodData = {
        title: this.accPeriodData.title,
        start_date: this.accPeriodData.start_date,
        end_date: this.accPeriodData.end_date
      };
    }
  }
};
</script>
