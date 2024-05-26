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
          <label class="form-control-label" for="title">Refernce</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="reference"
            :value="referenceName"
            disabled="true"
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
        title: "",
        referenceName: "Asset"
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
    referenceName: {
      type: String
    }
  },
  watch: {
    itemData() {
      this.data = {
        title: this.itemData.title
      };
    }
  },
  computed: {
    isFormValid() {
      return this.data.title;
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.title}` : "New Account Type";
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
        referenceName: this.referenceName
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
};
</script>
