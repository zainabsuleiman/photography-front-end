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
            v-model="data.name"
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
          <label class="form-control-label" for="tin">Tin</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="address"
            v-model="data.tin"
            placeholder="Enter tin"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="Address">Address</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="address"
            v-model="data.physical_address"
            placeholder="Enter address"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="phoneNumber"
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

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="vendor_type"
            >Vendor Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="vendor_type"
            v-model="data.vendorType"
          >
            <option value="">Select Vendor Type</option>
            <option value="Manufacturers">Manufacturers</option>
            <option value="Wholesalers">Wholesalers</option>
            <option value="Retailers">Retailers</option>
          </select>
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
        name: "",
        phoneNumber: "",
        email: "",
        tin: "",
        physical_address: "",
        vendorType: ""
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
    vendorData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    vendorData() {
      this.data = {
        name: this.vendorData.name,
        email: this.vendorData.email,
        phoneNumber: this.vendorData.phoneNumber,
        physical_address: this.vendorData.physical_address,
        tin: this.vendorData.tin,
        vendorType: this.vendorData.vendorType
      };
    }
  },
  computed: {
    isFormValid() {
      return (
        this.data.name &&
        this.data.email &&
        this.data.phoneNumber &&
        this.data.physical_address &&
        this.data.tin &&
        this.data.vendorType
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.name}` : "New Vendor";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        name: this.data.name,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        physical_address: this.data.physical_address,
        tin: this.data.tin,
        vendorType: this.data.vendorType
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
};
</script>
