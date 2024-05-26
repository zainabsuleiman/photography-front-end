<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="50%">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="name">Name</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="name"
            v-model="data.name"
            placeholder="Enter name"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="price">Price</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="price"
            v-model="data.price"
            placeholder="Enter price"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="users">Number of Users</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="users"
            v-model="data.number_of_users"
            placeholder="Enter Users count"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="branches"
            >Number of Branches</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="branches"
            v-model="data.number_of_branch"
            placeholder="Enter Branches count"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="currency">Currency</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="currency"
            v-model="data.currency"
            placeholder="Enter currency"
          />
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label class="form-control-label">Features</label>
          <addable-input 
            placeholder="Type here to add feature"
            :value="features"
            :onChange="setFeatures"
          ></addable-input>
        </div>
      </div>
    </div>

    <template v-slot:actions>
      <button-cta
        :label="renderBtnLabel"
        @click="handleSubmit"
        :isBusy="isLoading"
        :disabled="!isFormValid"
      ></button-cta>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import ButtonCta from "@/components/Button/ButtonCta";
import AddableInput from "@/components/addable-input/AddableInput";

export default {
  components: {
    Modal,
    ButtonCta,
    AddableInput
  },
  data() {
    return {
      isLoading: false,
      data: {
        price: "",
        currency: "",
        number_of_users: "",
        number_of_branch: "",
        name: ""
      },
      features: []
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
    planData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    planData() {
      if(this.isEdit) {
        this.data = {
          name: this.planData.name,
          price: this.planData.price,
          currency: this.planData.currency,
          number_of_users: this.planData.number_of_users,
          number_of_branch: this.planData.number_of_branch,
        };
        this.features = this.planData.features.map(feature => feature.title);
      } else {
        this.data = {
          price: "",
          currency: "",
          number_of_users: "",
          number_of_branch: "",
          name: ""
        }
        this.features = []
      }
    }
  },
  computed: {
    isFormValid() {
      return (
        this.data.name &&
        this.data.price &&
        this.data.currency &&
        this.data.number_of_users &&
        this.data.number_of_branch
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.name}` : "New Plan";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      console.log("clicked");
      const data = {
        name: this.data.name,
        price: this.data.price,
        currency: this.data.currency,
        number_of_users: this.data.number_of_users,
        number_of_branch: this.data.number_of_branch,
        features: this.features.map(feature => ({title: feature}))
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    setFeatures(value) {
      this.features = value;
    }
  }
};
</script>
