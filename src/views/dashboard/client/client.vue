<template>
    <div class="row justify-content-center" >
        <div class="col-md-3" v-for="product in dtb_options.data" :key="product.id"  >
       <div class="card" style="display:flex;flex-direction: column;">
       <div class="card-body" >
         <div class="product" >
          <div class="img">
            <img :src="getImages(product.photo)" style="width:100%; height:100%;" alt="">
            </div>
          <h4 class="text-info">{{ product.firstName }} {{product.lastName}}</h4>                                            
          <h4 class="text-muted">{{ product.age }} </h4>
          <p class="text-muted">{{ product.years_experience }} years</p>
          <div class="separ"></div>
          <input type="submit"  @click="details(product.id)"  name="add_to_cart" class="btn btn-default btn-block fa-lg gradient-custom-4 mb-3" value="Details">
        </div>
      </div>
   <modal label="details"  :show="showModal" @close="closeModal" width="50%">
    <div class="row" >
      <div class="col-md-6" style="justify-content:space-between;">
         <h3 class="text-muted">First Name: {{photographerData.firstName}}</h3>
          </div>
          <div class="col-md-6" style="justify-content:space-between;">
         <h3 class="text-muted">Last Name: {{photographerData.lastName}}</h3>
          </div>
          <div class="col-md-6" style="justify-content:space-between;margin-top:20px;">
         <h3 class="text-muted"> Age: {{photographerData.age}}</h3>
          </div>
          <div class="col-md-6" style="justify-content:space-between; margin-top:20px;">
         <h3 class="text-muted"> Address: {{photographerData.province}} ,{{photographerData.district}} ,{{photographerData.streetNumber}} </h3>
          </div>
          <div class="row justify-content-center" >
              <div class="col-md-3" v-for="activity in info2.data" :key="activity.id">
              <div class="card" style="display:flex;flex-direction: column;">
                   <h1>Activities</h1>
                    <div class="col-md-6" style="justify-content:space-between;">
                        <h3 class="text-muted">Name: {{activity.name}}</h3>
                    </div>
              </div></div>
          </div>
          </div>
          </modal>
     </div>
     </div>
    </div>
</template>
<script>
import axios from "axios";
// import SectionHeader from "@/components/dashboard/SectionHeader";
// import DataTable from "@/components/DataTable";
// import ButtonCta from "@/components/Button/ButtonCta";
import { alert } from "@/utils/alertUtils";
// import viewmodal from "./viewmodal.vue";
import modal from "@/components/modal/Modal";
// import moment from "moment";
export default {
  components: {
  modal,
    // DataTable,
    // SectionHeader,
    // ButtonCta,
  
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      data_loaded: false,
      data_load: false,
      selectedProductID: "",
      photographerData: {},
      productCategories: [],
      info2:{
          data: []
      },
      isEditMode: false,
      dtb_options: {
        data: [],
        actions: [
          { btnText:"Approve",
            btnClass: "btn btn-warning btn-sm",
            iconClass: "fa fa-pencil-square",
            btnFn: id => {
            this.updatePhotographer(id);
            },
            btnParamName: "id"
          }
        ],
        columns: [
          { title: "First Name", data: "firstName" },
          { title: "Last Name", data: "lastName" },
          { title: "Age", data: "age" },
          { title: "Profile Photo", data: "photo"},
          { title: "Street Number", data: "streetNumber" },
          { title: "Years of Experience", data: "years_experience" },
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
    getImages(url) {
                return ('http://127.0.0.1:8000' + url);
            },
    details(id){
      this.$router.push({
                name: "Photographer Detail",
                params: { id: id },
              });
    },
    getAllPhotographer() {
      this.data_loaded = false;
      var url = `${process.env.VUE_APP_BACKEND_URL}photographer/list`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
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
  
    
  
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.isEditMode = false;
      
    }
  },
  mounted() {
    this.getAllPhotographer();
   
  }
};
</script>

<style scoped>
/* .card {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
} */


</style>