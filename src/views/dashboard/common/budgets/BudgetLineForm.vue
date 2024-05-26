<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="60%" height="55vh" bodyHeight="400px">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="title">Title</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="title"
            v-model="data.title"
            placeholder="Enter title"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="description">Description</label>
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
        title: "",
        description: "",
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
    budgetLineData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    budgetLineData() {
      this.data = {
        amount: this.budgetLineData.amount,
        title: this.budgetLineData.title,
        description: this.budgetLineData.description,
      };
    },
  },
  computed: {
    isFormValid() {
      return (
        this.data.amount &&
        this.data.title &&
        this.data.description
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Budget Line";
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
        title:this.data.title,
        description: this.data.description
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  },
  mounted() {
    // this.getAllAssetAccount();
    // this.getAllVendors();
  }
};
</script>
