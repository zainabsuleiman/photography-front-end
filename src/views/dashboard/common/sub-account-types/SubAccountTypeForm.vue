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
            v-model="data.title"
            placeholder="Enter Title"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="accountType"
            >Account Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="accountType"
            v-model="data.accountTypeUuid"
            :disabled="isEdit"
          >
            <option value="">Select Account Type</option>
            <option
              v-for="(acc, index) in accountTypes"
              :key="index"
              :value="acc.uuid"
            >
              {{ acc.title }}
            </option>
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
        title: "",
        accountTypeUuid: ""
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
    itemData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    accountTypes: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    itemData() {
      this.data = {
        title: this.itemData.title,
        accountTypeUuid: this.itemData.parent_type.uuid
      };
    }
  },
  computed: {
    isFormValid() {
      return this.data.title;
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Sub Account Type";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        title: this.data.title,
        parent_uuid: this.data.accountTypeUuid
      };
      this.isEdit
        ? await this.edit(data, this.data.accountTypeUuid)
        : await this.save(data, this.data.accountTypeUuid);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
};
</script>
