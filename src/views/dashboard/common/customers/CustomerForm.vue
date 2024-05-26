<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="50%">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="names">Full Name</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="names"
            v-model="data.names"
            placeholder="Enter Full Name"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input
            type="email"
            class="form-control form-control-alternative"
            id="email"
            v-model="data.email"
            placeholder="Enter email"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="address">Address</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="address"
            v-model="data.address"
            placeholder="Enter address"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="phonenumber"
            >Phone Number</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="phoneNumber"
            v-model="data.phoneNumber"
            placeholder="Enter phone number"
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
        names: "",
        email: "",
        phoneNumber: "",
        address: ""
      }
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
    customerData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    customerData() {
      this.data = {
        names: this.customerData.Names,
        email: this.customerData.email,
        phoneNumber: this.customerData.phoneNumber,
        address: this.customerData.address
      };
    }
  },
  computed: {
    isFormValid() {
      return (
        this.data.names &&
        this.data.email &&
        this.data.phoneNumber &&
        this.data.address
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.names}` : "New Customer";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        Names: this.data.names,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        address: this.data.address
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
};
</script>
