<template>
  <div class="card shadow-lg w-100 border-0 mb-0 mt-3">
    <div class="card-body px-lg-5 py-lg-3">
      <div class="row">
        <div class="col-md-12">
          <h3>Social Networks</h3>
          <hr class="my-0 mb-3" />
        </div>
        <div class="col-md-12">
           <div class="row">
             <div class="col-md-12">
                <h5>Add Social Network</h5>
                <span class="text-muted text-sm">(select social icon to add that social network)</span>
                <hr class="my-0 mb-3" />
                <div class="row text-center mb-3">
                  <div class="col-md-12" id="socialIcons">
                     <button
                        v-if="!facebookIn"
                        @click="show_facebook_input"
                        type="button"
                        class="btn btn-facebook btn-icon-only rounded-circle"
                     >
                      <span class="btn-inner--icon"><em class="fab fa-facebook"></em></span>
                     </button>
                     <button
                            v-if="!twitterIn"
                            @click="show_twitter_input"
                            type="button"
                            class="btn btn-twitter btn-icon-only rounded-circle"
                            >
                            <span class="btn-inner--icon"
                                ><em class="fab fa-twitter"></em
                            ></span>
                     </button>
                     <button
                                v-if="!instagramIn"
                                @click="show_instagram_input"
                                type="button"
                                class="btn btn-instagram btn-icon-only rounded-circle"
                           >
                            <span class="btn-inner--icon"
                                ><em class="fab fa-instagram"></em
                            ></span>
                      </button>
                  </div>
                  <div class="col-md-12 d-none" id="facebookUrlInput">
                    <em class="fas fa-times mr-2 hover-cursor" @click="hide_facebook_input" title="cancel"></em>
                    <input
                            v-model="facebookLink"
                            type="text"
                            name=""
                            id="add_facebook"
                            placeholder="add Facebook url"
                            class="mb-1"
                           />
                    <button class="btn btn-facebook btn-sm ml-2" @click="add_facebook">
                            Add
                    </button>
                  </div>
                  <div class="col-md-12 d-none" id="twitterUrlInput">
                    <em
                      class="fas fa-times mr-2 hover-cursor"
                      @click="hide_twitter_input"
                      title="cancel"
                    ></em>
                    <input
                      v-model="twitterLink"
                      type="text"
                      name=""
                      id="add_twitter"
                      placeholder="add Twitter url"
                      class="mb-1"
                    />
                    <button
                      class="btn btn-twitter btn-sm ml-2"
                      @click="add_twitter"
                    >
                      Add
                    </button>
                  </div>
                  <div class="col-md-12 d-none" id="instagramUrlInput">
                       <em class="fas fa-times mr-2 hover-cursor" @click="hide_instagram_input" title="cancel"></em>
                            <input
                                v-model="instagramLink"
                                type="text"
                                name=""
                                id="add_instagram"
                                placeholder="add Instagram url"
                                class="mb-1"
                            />
                            <button class="btn btn-instagram btn-sm ml-2" @click="add_instagram"> Add
                            </button>
                  </div>
              
                </div>
                <div class="row">
                  <div class="col-md-12">
                      <h5>Existing Social Network</h5>
                      <hr class="my-0 mb-3" />
                      
                      <table class="table align-items-center">
                          <thead class="thead-light">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody class="list">
                             <tr :key="index" v-for="(sn, index) in socials">
                               <td>{{ sn.name }}</td>
                               <td>
                                    <button
                                    class="btn btn-icon btn-danger btn-sm"
                                    @click="delete_social(sn.uuid)"
                                    >
                                    <em class="fas fa-trash-alt"></em>
                                    </button>
                                    <button
                                    class="btn btn-icon btn-default btn-sm"
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#socialModal"
                                    @click="get_sn_link(sn.uuid)"
                                    >
                                    <em class="fas fa-edit"></em>
                                    </button>
                                </td>
                             </tr>
                          </tbody>
                      </table>
                  </div>
                </div>
               

             </div>
           </div>
        </div>
      </div>
    </div>




     <!-- Modal  For Update social-->
    <div
      class="modal fade"
      id="socialModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="socialModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Update {{ social.title.value }} Link
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @close="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-secondary">
            <div class="form-group col-md-12">
              <label class="form-control-label">Link</label>
              <input
                class="form-control form-control-alternative"
                placeholder="Add the link"
                type="text"
                v-model="social.link.value"
              />
              <label
                v-for="error in social.link.errors"
                :key="error"
                class="form-control-flush text-danger text-sm"
                >{{ error }}</label
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="socialCancelbtn"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-default"
              @click="update_social"
            >
              Update Link
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of update  -->


  </div>
</template>

<script>
import { alert } from "../utils/alertUtils";
import axios from "axios";
export default {
    props:{
        
        //  url:{
        //      type:String,
        //      required:true
        //  },
         reference_name:{
           type:String,
           required:true
         },
         reference_id:{
          required:true 
         }
    },
 data(){

     return {
        socials:[],
        suspend_reason: {
        value: "",
        errors: [],
      },
      keyword: {
        value: "",
        errors: [],
      },
      keywordUpdate: {
        value: "",
        errors: [],
      },
      social: {
        title: {
          value: "",
          errors: [],
        },
        link: {
          value: "",
          errors: [],
        },
      },
     

      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      facebookLink: "",
      twitterLink: "",
      instagramLink: "",
      facebookIn: false,
      twitterIn: false,
      instagramIn: false,
      socialUuid:"",
     }
 },
 methods:{
   show_facebook_input:function(){
      var all_icons = document.getElementById("socialIcons");
      var facebookInput = document.getElementById("facebookUrlInput");
      console.log(facebookInput)
        facebookInput.classList.remove("d-none");
      all_icons.classList.add("d-none");
    
     
   },
   show_twitter_input:function(){
     var all_icons = document.getElementById("socialIcons");
      var twitterInput = document.getElementById("twitterUrlInput");

      all_icons.classList.add("d-none");
      twitterInput.classList.remove("d-none");
   },
   hide_twitter_input:function(){
      var all_icons = document.getElementById("socialIcons");
      var twitterInput = document.getElementById("twitterUrlInput");
      all_icons.classList.remove("d-none");
      twitterInput.classList.add("d-none");
   },
   show_instagram_input:function(){
      var all_icons = document.getElementById("socialIcons");
      var instagramInput = document.getElementById("instagramUrlInput");
      all_icons.classList.add("d-none");
      instagramInput.classList.remove("d-none");
   },
   hide_facebook_input:function(){
      var all_icons = document.getElementById("socialIcons");
      var facebookInput = document.getElementById("facebookUrlInput");

      all_icons.classList.remove("d-none");
      facebookInput.classList.add("d-none");
   },
   hide_instagram_input:function(){
      var all_icons = document.getElementById("socialIcons");
      var instagramInput = document.getElementById("instagramUrlInput");
      all_icons.classList.remove("d-none");
      instagramInput.classList.add("d-none");
   },
   add_facebook:function(){
       var url = `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/`;
      var data = {
        name: "Facebook",
        link: this.facebookLink,
        reference_id:this.reference_id,
        reference_name:this.reference_name
      };
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then(() => {
          alert.success_center("Facebook Added successfully");
          this.fetch_socials(),
            document.getElementById("facebookUrlInput").classList.add("d-none");
          document.getElementById("socialIcons").classList.remove("d-none");
        })
        .catch(() => {
          alert.error(
            "An error occured please try again,if the error persist kindly contact the owner of this site!"
          );
        });
   },
   add_twitter: function () {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/`;
      var data = {
        name: "Twitter",
        link: this.twitterLink,
        reference_id:this.reference_id,
        reference_name:this.reference_name
      };
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then(() => {
          alert.success_center("Twitter Added successfully");
          this.fetch_socials(),
            document.getElementById("twitterUrlInput").classList.add("d-none");
          document.getElementById("socialIcons").classList.remove("d-none");
        })
        .catch(() => {
          alert.error(
            "An error occured please try again,if the error persist kindly contact the owner of this site!"
          );
        });
    },
    add_instagram: function () {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/`;
      var data = {
        name: "Instagram",
        link: this.instagramLink,
        reference_id:this.reference_id,
        reference_name:this.reference_name
      };
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then(() => {
          alert.success_center("Instagram Added successfully");
          this.fetch_socials(),
            document
              .getElementById("instagramUrlInput")
              .classList.add("d-none");
          document.getElementById("socialIcons").classList.remove("d-none");
        })
        .catch(() => {
          alert.error(
            "An error occured please try again,if the error persist kindly contact the owner of this site!"
          );
        });
    },
    fetch_socials: function () {
      axios
        .get(
          `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/reference_name/${this.reference_name}/reference_id/${this.reference_id}/`,{
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        }
        )
        .then((res) => {
          this.socials = res.data;
          var names = [];
          for (var key in res.data) {
            names.push(res.data[key].name);
          }
          if (names.includes("Facebook")) {
            this.facebookIn = true;
          }
          if (names.includes("Twitter")) {
            this.twitterIn = true;
          }
          if (names.includes("Instagram")) {
            this.instagramIn = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

  get_sn_link: function (uuid) {
      this.socialUuid = uuid
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/${uuid}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.social.link.value = res.data.link;
          this.social.title.value = res.data.name;
        })
        .catch(() => {
          alert.error(
            "An error occured on getting Social Network link, please try again,if the error persist kindly contact the owner of this site!"
          );
        });
    },

   delete_social: function (uuid) {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/${uuid}`;
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then(() => {
          this.fetch_socials();
          window.location.reload();
          alert.success_center("Social Network Deleted successfully");
          document.getElementById("socialIcons").classList.remove("d-none");
        })
        .catch(() => {
          alert.error(
            "An error occured please try again,if the error persist kindly contact the owner of this site!"
          );
        });
    },
    update_social: function(){
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/socialLinks/${this.socialUuid}`
      const data = {
        link:this.social.link.value
      }
      axios.put(url,data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        }).then(()=>{
          
          alert.success_center("You have successfully updated the social link")
          document.getElementById('socialCancelbtn').click()
        })
        .catch((err)=>{
          console.log(err.response)
          alert.error("An error occured in updating social link.")
        })
    },

  
 },
 created(){
   this.fetch_socials()
 }
}
</script>

<style>

</style>