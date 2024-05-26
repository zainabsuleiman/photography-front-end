<template>
  <modal :title="renderTitle" :show="showModal" @close="closeModal" width="40%">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="product">Product</label>
          <select
            class="form-control form-control-alternative"
            id="product"
            v-model="data.productUuid"
          >
            <option value="">Select Product</option>
            <option
              v-for="(prod, index) in products"
              :key="index"
              :value="prod.uuid"
            >
              {{ prod.productName }}
            </option>
          </select>
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
          <label class="form-control-label" for="amountPaidInCash"
            >Amount to be paid</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="amountPaidInCash"
            v-model="amountToBePaid"
            placeholder="Enter amount paid in cash"
            disabled="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="amountPaidInBank"
            >Non-cash payment</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="amountPaidInBank"
            v-model="data.amountPaidInBank"
            placeholder="Enter amount paid in bank"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="loanAmount">Amount on credit</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="loanAmount"
            v-model="data.loanAmount"
            placeholder="Enter loan Amount"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="paymentMode"
            >Payment Mode</label
          >
          <select
            class="form-control form-control-alternative"
            id="paymentMode"
            v-model="data.paymentMode"
          >
            <option value="">Select Payment Mode</option>
            <option
              v-for="(paymentMode, index) in paymentModes"
              :key="index"
              :value="paymentMode"
            >
              {{ paymentMode }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="paymentType"
            >Payment Type</label
          >
          <select
            class="form-control form-control-alternative"
            id="paymentType"
            v-model="data.paymentType"
          >
            <option value="">Select Payment Type</option>
            <option
              v-for="(paymentType, index) in paymentTypes"
              :key="index"
              :value="paymentType"
            >
              {{ paymentType }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="customer">Customer</label>
          <select
            class="form-control form-control-alternative"
            id="customer"
            v-model="data.customerUuid"
          >
            <option value="">Select Customer</option>
            <option
              v-for="(customer, index) in customers"
              :key="index"
              :value="customer.uuid"
            >
              {{ customer.Names }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="includeVat">include VAT</label>
          <select
            class="form-control form-control-alternative"
            id="includeVat"
            v-model="data.isVatIncluded"
          >
            <option value="">Include VAT</option>
            <option :value="true">
              Yes
            </option>
            <option :value="false">
              No
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6" v-if="data.isVatIncluded">
        <div class="form-group">
          <label class="form-control-label" for="percentageVat"
            >Vat Percentage</label
          >
          <input
            type="text"
            class="form-control form-control-alternative"
            id="percentageVat"
            v-model="data.vatPercentage"
            placeholder="Enter vat percentage"
          />
        </div>
      </div>
    </div>

    <template v-slot:actions>
      <button-cta
        :label="renderBtnLabel"
        @click="handleSubmit"
        :disabled="false"
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
        amountPaidInCash: 0,
        loanAmount: 0,
        amountPaidInBank: 0,
        paymentMode: "",
        paymentType: "",
        productUuid: "",
        quantity: 1,
        isVatIncluded: false,
        vatPercentage: 0,
        customerUuid: ""
      },
      paymentTypes: ["Pending", "Paid"],
      paymentModes: [
        "Cash",
        "Bank",
        "Donation",
        "Mobile Money",
        "POS",
        "Debt",
        "Bank&Cash",
        "Bank&&MoMo",
        "Bank&&Cash&&MoMo",
        "Bank&&Debt",
        "Cash&&Debt",
        "POS&&Debt"
      ]
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
    saleData: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    products: {
      type: Array,
      default: () => []
    },
    customers: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    saleData() {
      if(this.isEdit) {
        this.data = {
          amountPaidInCash: this.saleData.amount_paid_cash,
          loanAmount: this.saleData.loan_amount,
          amountPaidInBank: this.saleData.amount_paid_bank,
          paymentMode: this.saleData.paymentMode,
          paymentType: this.saleData.paymentType,
          productUuid: this.saleData.product ? this.saleData.product.uuid : "",
          isVatIncluded: this.saleData.is_vat_included,
          vatPercentage: this.saleData.vat_percentage,
          customerUuid: this.saleData.customer ? this.saleData.customer.uuid : "",
          quantity: this.saleData.quantity
        };
      } 

      if(!this.isEdit) {
        this.data = {
          amountPaidInCash: 0,
          loanAmount: 0,
          amountPaidInBank: 0,
          paymentMode: "",
          paymentType: "",
          productUuid: "",
          isVatIncluded: false,
          vatPercentage: 0,
          customerUuid: "",
          quantity: 1
        };
      }
    },
  },
  computed: {
    isFormValid() {
      return (
        this.data.amountPaidInCash &&
        this.data.loanAmount &&
        this.data.amountPaidInBank &&
        this.data.paymentMode &&
        this.data.paymentType &&
        this.data.productUuid &&
        this.data.customerUuid
      );
    },
    renderTitle() {
      return this.isEdit ? `Edit Sale` : "New Sale";
    },
    renderBtnLabel() {
      return this.isEdit ? "Edit" : "Save";
    },
    amountToBePaid() {
      if(this.data.productUuid && this.products.length > 0) {
        const productUnitPrice = this.products.find(product => product.uuid === this.data.productUuid).unitPrice;

        return parseInt(productUnitPrice) * parseInt(this.data.quantity) - parseInt(this.data.amountPaidInBank || 0) - parseInt(this.data.loanAmount || 0);
      }

      return 0;
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const data = {
        amount_paid_in_cash: this.amountToBePaid,
        loan_amount: parseInt(this.data.loanAmount),
        amount_paid_in_bank: parseInt(this.data.amountPaidInBank),
        paymentMode: this.data.paymentMode,
        paymentType: this.data.paymentType,
        product_uuid: this.data.productUuid,
        is_vat_included: this.data.isVatIncluded,
        vat_percentage: parseInt(this.data.vatPercentage),
        customer_uuid: this.data.customerUuid,
        quantity: parseInt(this.data.quantity)
      };
      this.isEdit ? await this.edit(data) : await this.save(data);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
};
</script>
