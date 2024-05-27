<template>
  <!-- add && edit product modal -->

<modal title="Upload" :show="showModal" @close="closeModal">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-control-label" for="name">Upload</label>
                    <input type="file" class="form-control" multiple accept="image" @change="uploadImage"/>
                   <div  v-for="(image, key) in images" :key="key">
                  <img :src="image.src" class="preview" style="width:50px;"/>
                 {{ image.file.name }}
                 </div>
                </div>
            </div>
            
            </div>
        <template v-slot:actions>
            <button-cta 
                class="btn btn-default" 
                @click="upload" 
                label="Upload" 
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
import ButtonCta from "@/components/Button/ButtonCta.vue";
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
      selectedFiles:'',
      selectedProductID: "",
      data:{},
      images:[],
      productData: {},
      productCategories: [],
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          {
            btnText:"Upload",
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-arrow-up",
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
      uploadImage(e) {
           this.selectedFiles = e.target.files;
            console.log(this.selectedFiles)
            for (let i = 0; i < this.selectedFiles.length; i++) {
                let img = {
                    src: URL.createObjectURL(this.selectedFiles[i]),
                    file: this.selectedFiles[i],
                }
                this.images.push(img);
                console.log(this.images)
            }
        },
    getAllPhotographer() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}photographer/${this.get_id}/appointments/half_paid`;
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
    upload() {
      var url =`${process.env.VUE_APP_BACKEND_URL}api/client/appointment/${this.selectedProductID}/upload/files`;
      let data=[
          this.selectedFiles[0].name,
          this.selectedFiles[1].name,
          this.selectedFiles[2].name
      ]
      let file =new FormData();
      file.append('file',JSON.stringify(data));
      axios
        .post(url, file, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "content-type": "multipart/form-data",
          }
        })
        .then(res => {
          alert.success_center("Result Uploaded successfully!");
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