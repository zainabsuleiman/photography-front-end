<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="50%">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="start_date">Start Date</label>
          <input
            type="date"
            class="form-control form-control-alternative"
            id="start_date"
            v-model="data.startDate"
            placeholder="Enter Start Date"
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
            v-model="data.endDate"
            placeholder="Enter end date"
          />
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
// import axios from "axios";
import Modal from "@/components/modal/Modal";
import ButtonCta from "@/components/Button/ButtonCta";
import moment from 'moment';

export default {
  components: {
    Modal,
    ButtonCta
  },
  data() {
    return {
      isLoading: false,
      data: {
        amount: 0,
        startDate: "",
        endDate: "",
      },
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
    budgetData: {
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
    budgetData() {
      this.data = {
        amount: this.budgetData.amount,
        startDate: moment(this.budgetData.start_date).format("YYYY-MM-DD"),
        endDate: moment(this.budgetData.end_date).format('YYYY-MM-DD'),
      };
    },
  },
  computed: {
    isFormValid() {
      return (
        this.data.amount &&
        this.data.startDate &&
        this.data.endDate
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit Budget` : "New Budget";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        amount: this.data.amount,
        start_date: new Date(this.data.startDate),
        end_date: new Date(this.data.endDate)
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  },
  mounted() {
    if(this.isEdit && this.budgetData) {
        this.data = {
            amount: this.budgetData.amount,
            startDate: this.budgetData.startDate,
            endDate: this.budgetData.endDate,
        };
    }
  }
};
</script>
