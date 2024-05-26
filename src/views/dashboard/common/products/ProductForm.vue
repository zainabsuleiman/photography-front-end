<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="50%">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="productName"
            >Product Name</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="productName"
            v-model="data.productName"
            placeholder="Enter Product Name"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="brand">Brand</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="brand"
            v-model="data.brand"
            placeholder="Enter brand"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="unitPrice">Unit Price</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="unitPrice"
            v-model="data.unitPrice"
            placeholder="Enter unit price"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="purchasePrice"
            >Purchase Price</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="purchasePrice"
            v-model="data.purchasePrice"
            placeholder="Enter purchase price"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="quantity">Quantity</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="quantity"
            v-model="data.quantity"
            placeholder="Enter quantity"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="expirationDate"
            >Expiration Date</label
          >
          <input
            type="date"
            class="form-control form-control-alternative"
            id="expirationDate"
            v-model="data.expirationDate"
            placeholder="Enter expiration date"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="productCategory"
            >Product Category</label
          >
          <select
            class="form-control form-control-alternative"
            id="productCategory"
            v-model="data.productCategoryID"
          >
            <option value="">Select Product Category</option>
            <option
              v-for="(category, index) in productCategories"
              :key="index"
              :value="category.uuid"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="taxExamption">Tax examption</label>
          <select
            class="form-control form-control-alternative"
            id="taxExamption"
            v-model="data.isTaxExampted"
          >
            <option value="">Select Include Tax</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
      </div>

      <div class="col-md-6" v-if="data.isTaxExampted">
        <div class="form-group">
          <label class="form-control-label" for="taxRate">Tax Rate</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="taxRate"
            v-model="data.taxRate"
            placeholder="Enter Tax Rate"
          />
        </div>
      </div>
    </div>

    <template v-slot:actions>
      <div class="mr-2">
        <info-tag label="Total Sales Price" :value="totalSalesPrice"></info-tag>
      </div>
      <div class="mr-5">
        <info-tag label="Total Purchase Price" :value="totalPurchasePrice"></info-tag>
      </div>
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
import InfoTag from "../../../../components/dashboard/InfoTag.vue";

export default {
  components: {
    Modal,
    ButtonCta,
    InfoTag
  },
  data() {
    return {
      isLoading: false,
      data: {
        productName: "",
        brand: "",
        unitPrice: "",
        purchasePrice: "",
        quantity: "",
        expirationDate: "",
        productCategoryID: "",
        productCategories: [],
        isTaxExampted: false,
        taxRate: ""
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
    productData: {
      type: Object,
      default: () => {}
    },
    productCategories: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    productData() {
      this.data = {
        productName: this.productData.productName,
        brand: this.productData.brand,
        unitPrice: this.productData.unitPrice,
        purchasePrice: this.productData.purchasePrice,
        quantity: this.productData.quantity,
        expirationDate: moment(this.productData.expirationDate).format(
          "YYYY-MM-DD"
        ),
        productCategoryID: this.productData.category.uuid,
        isTaxExampted: this.productData.is_tax_exampted,
        taxRate: this.productData.tax_rate
      };
    }
  },
  computed: {
    isFormValid() {
      return (
        this.data.productName &&
        this.data.brand &&
        this.data.unitPrice &&
        this.data.purchasePrice &&
        this.data.quantity &&
        this.data.expirationDate &&
        this.data.productCategoryID
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit ${this.data.productName}` : "New Product";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    },
    totalSalesPrice() {
      return this.data.unitPrice * this.data.quantity;
    },
    totalPurchasePrice() {
      return this.data.purchasePrice * this.data.quantity;
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        productName: this.data.productName,
        brand: this.data.brand,
        unitPrice: this.data.unitPrice,
        purchasePrice: this.data.purchasePrice,
        quantity: this.data.quantity,
        expirationDate: this.data.expirationDate ? new Date(this.data.expirationDate) : new Date(),
        category_uuid: this.data.productCategoryID,
        totalSalesPrice: this.totalSalesPrice,
        totalPurchasePrice: this.totalPurchasePrice,
        is_tax_exampted: this.data.isTaxExampted,
        tax_rate: this.data.taxRate || 0
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
};
</script>
