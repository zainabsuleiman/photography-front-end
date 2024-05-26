<template>
  <div class="col-lg-6 col-md-7">
    <div class="card shadow-lg bg-gradient-secondary border-0 mb-0">
      <div class="card-body px-lg-5 py-lg-5">
        <!-- <div class="d-flex mb-4 justify-content-center">
          <button
            @click="facebook_login_trigger"
            type="button"
            class="btn btn-facebook btn-icon"
          >
            <span class="btn-inner--icon"
              ><em class="fab fa-facebook"></em
            ></span>
            <span class="btn-inner--text">Facebook</span>
          </button>
          <button
            id="google_login"
            type="button"
            class="btn btn-google-plus btn-icon"
          >
            <span class="btn-inner--icon"><em class="fab fa-google"></em></span>
            <span class="btn-inner--text">Google</span>
          </button>
        </div> -->
        <form ref="form" role="form">
          <div class="row">
            <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="First Name"
                  v-model="post_data.firstName"
                  type="text"
                  required
                />
              </div>
            </div>

            <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Last Name"
                  v-model="post_data.lastName"
                  type="text"
                  required
                />
              </div>
            </div>

            <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="District"
                  v-model="post_data.district"
                  type="text"
                  required
                />
                </div>
               </div>  
          
             <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Age"
                  v-model="post_data.age"
                  type="text"
                  required
                />
              </div>
              </div>
   
             <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Photo"
                  @change="onFileChange"
                  type="file"
                  required
                />
              </div>
              </div>

              <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Province"
                  v-model="post_data.province"
                  type="text"
                  required
                />
              </div>
              </div>
           
              <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Sector"
                  v-model="post_data.sector"
                  type="text"
                  required
                />
              </div>
             </div>

             <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Years Of Experience"
                  v-model="post_data.years_experience"
                  type="text"
                  required
                />
              </div>
              </div>
           
            
             <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><em class="ni ni-single-02"></em
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Street Number"
                 v-model="post_data.streetNumber"
                  type="text"
                  required
                />
              </div>
             </div>

             <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="ni ni-email-83"></i
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Email"
                  v-model="post_data.email"
                  type="email"
                />
              </div>
             </div>

          <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="ni ni-lock-alt"></i
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Password"
                  v-model="post_data.password"
                  type="password"
                />
              </div>
             </div>

             <div class="form-group mb-3 col-12">
              <div
                class="input-group input-group-merge input-group-alternative"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text"
                    ><i class="ni ni-email-83"></i
                  ></span>
                </div>
                <input
                  class="form-control"
                  placeholder="Username"
                  v-model="post_data.username"
                  type="text"
                />
              </div>
             </div>

             <div class="form-group col-12">
              <phone-input
                :value="phone"
                :errors="errors.phone"
                placeholder="Enter your phone number"
                @type="val => (this.phone = val)"
              />
            </div>
           </div>

            <div class="text-center">
            <button-cta
              label="Register"
              :isBusy="isLoading"
              class="btn btn-lg btn-block btn-success mb-2"
              @click="register"
              :disabled="!isFormValid"
            ></button-cta>
           
           </div>
          </form>
         </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <router-link class="text-white" to="/forgot_password">
          <small>Forgot password?</small></router-link
        >
      </div>
      <div class="col-6 text-center">
        <router-link class="text-white" to="/registers">
          <small> New Client</small></router-link
        >
      </div>
      <!-- <div class="col-6 text-right">
        <router-link class="text-white" to="/login"
          ><small>Already have an account? Sign in</small></router-link
        >
      </div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PhoneInput from "@/components/PhoneInput";
import ButtonCta from "@/components/Button/ButtonCta";

export default {
  name: "Register",
  components: {
    PhoneInput,
    ButtonCta
  },
  data() {
    return {
      post_data: {
        firstName: "",
        lastName: "",
        district:"",
        age:"",
        photo:"",
        province:"",
        sector:"",
        years_experience:"",
        streetNumber:"",
        username:"",
        password:"",
        email: "",
        phone: ""
      },
      isLoading: false,
      phone: {},
      errors: {}
    };
  },
  computed: {
    isFormValid() {
      return (
        this.phone.full_format
      );
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0]
      this.createImage(this.file);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.photo = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(file.name);
    },

    async register() {
      if (this.phone.valid){
        this.isLoading = true;
        this.post_data.phone = this.phone.full_format;
        await this.$store.dispatch("register",{
        firstName: this.post_data.firstName,
        lastName: this.post_data.lastName,
        district:this.post_data.district,
        age:this.post_data.age,
        photo:this.file.name,
        province:this.post_data.province,
        sector:this.post_data.sector,
        streetNumber:this.post_data.streetNumber,
        years_experience:this.post_data.years_experience,
        username:this.post_data.username,
        password:this.post_data.password,
        email: this.post_data.email,
        phone: this.phone.full_format,
        });
        this.isLoading = false;
      }
    },
    
  }
};
</script>

<style></style>
