<template>
  <div>
    <!-- <div>
      <loader :isLoading="true"></loader>
    </div> -->

    <button
      class="btn btn-default btn-sm mt-4 px-5"
      @click="this.$router.go(-1)"
    >
      Back
    </button>
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-12">
            <div
              class="card shadow-lg bg-gradient-secondary w-100 border-0 mb-0"
              id="BusinessInfo"
            >
              <div class="card-body px-lg-5 py-lg-3">
                <div class="row">
                  <div class="col-md-12">
                    <h3>Plan Details</h3>
                    <hr class="my-0 mb-3" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <strong
                      ><em class="fas fa-signature mr-2"></em> Name:
                    </strong>
                    <span>{{ data.name }}</span>
                    <br />
                    <br />
                  </div>
                  <div class="col-md-6">
                    <strong
                      ><em class="fas fa-money mr-2"></em> Price:
                    </strong>
                    <span>{{ data.price }}</span>
                    <br />
                    <br />
                  </div>
                  <div class="col-md-6">
                    <strong
                      ><em class="fas fa-money-check mr-2"></em> Currency:
                    </strong>
                    <span>{{ data.currency }}</span>
                    <br />
                    <br />
                  </div>
                  <div class="col-md-6">
                    <strong
                      ><em class="fas fa-user mr-2"></em> Allowed Users:
                    </strong>
                    <span>{{ data.number_of_users }}</span>
                    <br />
                    <br />
                  </div>
                  <div class="col-md-6">
                    <strong
                      ><em class="fas fa-home mr-2"></em> Allowed Branches:
                    </strong>
                    <span>{{ data.number_of_branch }}</span>
                    <br />
                    <br />
                  </div>
                  <div class="col-md-12">
                    <strong
                      ><em class="fas fa-clock mr-2"></em> Date Added:
                    </strong>
                    <span>{{ data.doneAt }}</span>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div
          class="card shadow-lg bg-gradient-secondary w-100 border-0 mb-0"
          id="BusinessInfo"
        >
          <div class="card-body px-lg-5 py-lg-3">
            <div class="row">
              <div class="col-md-12">
                <h3>Actions</h3>
                <hr class="my-0 mb-3" />
              </div>
            </div>
                        <div class="row mb-2">
              <div class="col-md-12">
                <button
                  v-if="$guards.is_super_admin()"
                  type="button"
                  class="btn btn-default btn-sm btn-block w-100"
                  @click="delete_industry_clicked"
                >
                  Update Industry
                </button>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <button
                  v-if="$guards.is_super_admin()"
                  type="button"
                  class="btn btn-default btn-sm btn-block w-100"
                  @click="delete_industry_clicked"
                >
                  Delete Industry
                </button>
              </div>
            </div>
            <!-- <div class="row mb-2">
              <div class="col-md-12">
                <router-link
                  v-if="$guards.is_super_admin()"
                  type="button"
                  class="btn btn-default btn-sm btn-block w-100 text-white"
                  :to="{
                    name: 'updateIndustry',
                    params: { uuid: this.$route.params.uuid },
                  }"
                >
                  Update Industry
                </router-link>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { alert } from "../../utils/alertUtils";
// import Loader from "../../components/Loader";
export default {
  //   component: {
  //     'loader': Loader,
  //   },
  data() {
    return {
      isLoaded: false,
      data: {},
    };
  },
  methods: {
    get_industry: function () {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${this.$route.params.uuid}`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
          },
        })
        .then((res) => {
            console.log(res.data)
          this.data = res.data;
          this.isLoaded = true;
        })
        .catch((err) => {
          alert.error(
            "An error occured please try again,if the error persist kindly contact the owner of this site!"
          );
          console.log(err.response);
        });
    },

    delete_industry_clicked: function () {
      alert.promptDelete(this.delete_industry);
    },
    delete_industry: function () {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${this.$route.params.uuid}`;
      axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
          },
        })
        .then(() => {
          alert.success_center("Industry Deleted successfully.");
          this.$router.push({name:'Industries'})
        })
        .catch((err) => {
            console.log(err.response)
          alert.error("An error occured, in deleting industry");
        });
    },
  },
  created() {
    this.get_industry();
    console.log(this.visible)
  },
};
</script>
<style lang="css" scoped>
</style>