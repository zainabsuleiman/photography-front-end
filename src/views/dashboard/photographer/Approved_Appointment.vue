<template>
  <!-- add && edit product modal -->


  <modal title="Pre-Requisite Payment" :show="showModal" @close="closeModal">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="name">name</label>
                    <input type="text" class="form-control form-control-alternative"  v-model="data.names"
                        placeholder="Enter name" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input type="email" class="form-control form-control-alternative"  v-model="data.email"
                        placeholder="Enter email" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="email">Phone</label>
                    <input type="text" class="form-control form-control-alternative"  v-model="data.phone"
                        placeholder="Enter phone number" />
                </div>
            </div>

            </div>
        <template v-slot:actions>
            <button-cta 
                class="btn btn-default" 
                @click="payment" 
                label="Pay" 
                :isBusy="isLoading"
                
            ></button-cta>
        </template>
    </modal>
  <div class="mt-4">
    <div class="card shadow w-100 mt-2 p-4">
      <section-header info="Approved Appointment">
       
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
import SectionHeader from "@/components/dashboard/SectionHeader";
import Modal from  '../../../components/modal/Modal.vue';
import DataTable from "@/components/DataTable";
import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
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
      data:{},
      selectedProductID: "",
      productData: {},
      productCategories: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnText:"Pay",
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-money",
            btnFn: id => {
            this.selectedProductID=id;
            this.openModal();
            },
            btnParamName: "id"
          }
        ],
        columns: [
          { title: "Payment", data: "payment" },
          { title: "Comment", data: "comment" },
          { title: "Occurence Date", data: "occurance_date" },
        ],
      }
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    getAllPhotographer() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}api/client/${this.$route.params.id}/approved`;
      axios
        .get(url,{
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
    payment() {
      var url =`${process.env.VUE_APP_BACKEND_URL}api/client/${this.$route.params.id}/payment`;
      axios
        .post(url, this.data, {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        })
        .then(res => {
         console.log(res);
         var link = res.data.link;
         window.location.replace(link);
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
