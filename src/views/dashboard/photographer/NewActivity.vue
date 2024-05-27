<template>
    <div class="header py-0 shadow bg-white mt-3">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row py-3">
            <nav aria-label="breadcrumb" class="ml-2">
              <ol class="breadcrumb breadcrumb-links">
                <li class="breadcrumb-item">
                  <a href="#"><i class="fas fa-link"></i></a>
                </li>
                <li class="breadcrumb-item">
                  <!-- <router-link tag="li" :to="{ name: 'Photographer Detail' }">
                    <a href="#">
                      Assign Appointment
                    </a>
                  </router-link> -->
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  <div class="mt-0">
    <button @click="$router.go(-1)" class="btn btn-sm btn-default">Back</button>
    <div class="card mt-2 shadow p-4">
      <div class="row">
        <div class="col-md-6">
         <text-input
            :value="post_data.name || ''"
            :errors="errors.phone"
            label="Name"
            placeholder="Enter the activity name"
            @type="(v) => (post_data.name = v)"
             :required="true"
          />
        </div>
        <div class="col-md-6">
          <text-input
            :value="post_data.activity_type || ''"
            :errors="errors.phone"
            label="Activity Type"
            placeholder="Enter the activity type"
            @type="(v) => (post_data.activity_type = v)"
             :required="true"
          />
          <span style="color:#fc7676;" v-for="e in errors" v-bind:key="e.id" >{{e.phone}}</span>
        </div>
        <div class="col-md-6">
         <label class="form-control-label" for="">Price</label>
         <input type="number"    class="form-control" v-model="post_data.price" placeholder="Enter price for activity" />
        </div>
      </div>

      
      
    </div>
    <div class="row">
      <div class="col-md-6">
        <button
          :style="!show_loader ? '' : styleObject"
          :disabled="show_loader"
          @click="submit"
          class="btn btn-block col-md-7 mt-3 btn-default"
        >
          Submit
          <i v-if="show_loader" class="fa fa-spinner fa-spin"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../../../components/TextInput.vue";
import { alert } from "../../../utils/alertUtils.vue";
import axios from "axios";


export default {
  name: "New Activity",
  components: {
    "text-input": TextInput,
  },
  data() {
    return {
      errors: [],
      post_data: {
        
      },
      names:"",
      phone:"",
      email:"",
      address:"",
      Image: {},
      styleObject: {
        cursor: "not-allowed",
      },
      show_loader: false,
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.getToken;
    },
    get_id() {
      return this.$store.getters.getPhotographer_id;
    },},
  methods: {
    
    submit: function() {
      this.show_loader = true;
      
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}photographer/${this.get_id}/activity`,
          this.post_data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
              "content-type": "application/json",
            },
          }
        )
        .then(() => {
          alert.success_center("Activity created successfully!");
          this.post_data = {};
          this.show_loader = false;
          this.$router.push({ name: "Activity" });
        })
        .catch((err) => {
          this.show_loader = false;
          if (err.response.status === 400) {
            this.errors = err.response.data;
            alert.error(
              "An Error occured, kindly check the for for specific errors"
            );
          } else {
            alert.error("An Error occured, Please try again!");
          }
          console.error(err);
        });
        this.errors =[];
        if(!this.post_data.name){
          this.errors.push({names:'Name of Institution required'});
        }
        if(!this.post_data.phone){
          this.errors.push({phone:'Phone number of Institution required'});
        }
         if(!this.post_data.email){
          this.errors.push({email:'Email of Institution required'});
        }
        if(!this.post_data.address){
          this.errors.push({address:'Address of Institution required'});
        }
    },
  },
};
</script>

<style></style>
