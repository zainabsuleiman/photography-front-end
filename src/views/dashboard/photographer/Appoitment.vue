<template>
  <!-- add && edit product modal -->

<modal title="Pre-Requisite Payment" :show="showModal" @close="closeModal">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="name">Advance amount</label>
                    <input type="text" class="form-control form-control-alternative"  v-model="data.pre_requisite_amount"
                        placeholder="Enter advance" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="email">Comment</label>
                    <input type="text" class="form-control form-control-alternative"  v-model="data.comment"
                        placeholder="Enter comment" />
                </div>
            </div>
            </div>
        <template v-slot:actions>
            <button-cta 
                class="btn btn-default" 
                @click="approve_appointment" 
                label="Approve" 
                :isBusy="isLoading"
                
            ></button-cta>
        </template>
    </modal>

  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="Appointment List">
       
      </section-header>

      <div class="row mt-4">
        <div class="col-12">
          <data-table
            v-if="data_loaded"
            id="products_list"
            :options="dtb_options.extra_options"
            :actions="dtb_options.actions"
            :data="dtb_options.data"
            :columns="dtb_options.columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import DataTable from "@/components/DataTable.vue";
import Modal from '../../../components/modal/Modal.vue';
import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils.vue";
// import moment from "moment";

export default {
  components: {
    DataTable,
    SectionHeader,
    ButtonCta,
    Modal,
  
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      selectedProductID: "",
      data:{},
      productData: {},
      productCategories: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnText:"Approve",
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: id => {
            this.selectedProductID=id;
            this.openModal();
            },
            btnParamName: "id"
          }
        ],
        columns: [
          { title: "Location", data: "location" },
          { title: "Hours-Min", data: "hours_min" },
          { title: "Description", data: "description" },
          { title: "Payment Status", data: "payment_status" },
          { title: "Status", data: "status" },
          { title: "Total Price", data: "appointment_total_price" },
        ],
        
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    get_id() {
      return this.$store.getters.getPhotographer_id;
    },
  },
  methods: {
    getAllPhotographer() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}photographer/${this.get_id}/appointments`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
          }
        })
        .then(res => {
          this.dtb_options.data = res.data;
          this.data_loaded = true;
        })
        .catch(err => {
          alert.error(err.response.data.message || "An error occured!");
          console.error(err);
        });
    },
    approve_appointment() {
      var url =`${process.env.VUE_APP_BACKEND_URL}photographer/appointment/${this.selectedProductID}/approve`;
      axios
        .post(url, this.data, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
          }
        })
        .then(res => {
          alert.success_center("Appointment approved successfully!");
          this.getAllPhotographer();
          return res;
        })
        .catch(err => {
          alert.error("An error occured!");
          console.error(err);
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditMode = false;
      this.productData = {
        productName: "",
        brand: "",
        productCode: "",
        unitPrice: "",
        category: {},
        expiryDate: ""
      };
    }
  },
  mounted() {
    this.getAllPhotographer();
  }
};
</script>

<style></style>
