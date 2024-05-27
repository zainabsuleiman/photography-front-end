<template>
  <!-- add user modal -->
  <modal title="New User" :show="showModal" @close="closeModal">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="firstname">Firstname</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="firstname"
            v-model="firstname"
            placeholder="Enter firstname"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="lastname">Lastname</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="lastname"
            v-model="lastname"
            placeholder="Enter lastname"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input
            type="text"
            class="form-control form-control-alternative"
            id="email"
            v-model="email"
            placeholder="Enter email"
          />
        </div>
      </div>
    </div>

    <template v-slot:actions>
      <button-cta
        class="btn btn-default"
        @click="createUser"
        label="Create User"
        :isBusy="isLoading"
        :disabled="!isFormValid"
      ></button-cta>
    </template>
  </modal>

  <!-- users datatable -->
  <div class="bg-white pt-4 px-3 rounded shadow mt-5">
    <section-header info="List of Branch users">
      <template v-slot:component>
        <button-cta
          label="Add User"
          :onClick="openModal"
          :close="closeModal"
        ></button-cta>
      </template>
    </section-header>
    <div class="row mt-4">
      <div class="col-12">
        <datatable
          id="users"
          v-if="data_loaded"
          :columns="tableData.columns"
          :data="tableData.data"
          :actions="tableData.actions"
        ></datatable>
      </div>
    </div>
  </div>
</template>

<script>
// @ alias src
import axios from "axios";
import Datatable from "@/components/DataTable.vue";
import SectionHeader from "@/components/dashboard/SectionHeader.vue";
import ButtonCta from "@/components/Button/ButtonCta.vue";
import moment from "moment";
import { alert } from "../../../utils/alertUtils";
import Modal from "../../../components/modal/Modal.vue";

export default {
  components: { Datatable, SectionHeader, ButtonCta, Modal },
  data() {
    return {
      tableData: {
        columns: [
          {
            title: "Firstname",
            data: "first_name",
          },
          {
            title: 'Lastname',
            data: 'last_name'
          },
          {
            title: "email",
            data: "email",
            render(data) {
              return data.email;
            }
          },
          {
            title: "Joined On",
            data: "date_joined",
            render(data) {
              return moment(data.date_joined).format("DD-MM-YYYY");
            }
          }
        ],
        data: [],
        actions: [
          // {
          //   btnClass: "btn btn-default btn-sm",
          //   iconClass: "fa fa-eye",
          //   btnFn: () => console.log("view")
          // },
          // {
          //   btnClass: "btn btn-warning btn-sm",
          //   iconClass: "fa fa-pencil-square",
          //   btnFn: () => console.log("edit")
          // },
          // {
          //   btnClass: "btn btn-danger btn-sm",
          //   iconClass: "fa fa-trash",
          //   btnFn: () => console.log("delete")
          // }
        ]
      },
      firstname: "",
      lastname: "",
      email: "",
      isLoading: false,
      data_loaded: false,
      showModal: false
    };
  },
  computed: {
    branchUuid() {
      return this.$store.getters.getUserProfile.branch.uuid;
    },
    token() {
      return this.$store.getters.getToken;
    },
    isFormValid() {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (
        this.firstname &&
        this.lastname &&
        this.email &&
        emailRegex.test(this.email)
      );
    }
  },
  methods: {
    loadBranchUsers() {
      if (this.branchUuid) {
        axios
          .get(
            `${process.env.VUE_APP_BACKEND_URL}/api/branches/users/`,
            {
              headers: {
                authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(response => {
            this.tableData.data = response.data;
            this.data_loaded = true;
          })
          .catch(error => {
            console.log(error);
            alert.error(error.response.data || "Could not load users");
          });
      }
    },
    createUser() {
      this.isLoading = true;
      if (this.isFormValid) {
        axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/api/branches/users/`,
            {
              firstName: this.firstname,
              lastName: this.lastname,
              email: this.email
            },
            {
              headers: {
                authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(response => {
            alert.success("User created successfully");
            this.loadBranchUsers();
            this.isLoading = false;
            this.showModal = false;
            return response;
          })
          .catch(error => {
            console.log(error);
            alert.error(error.response.data || "Could not create user");
            this.isLoading = false;
          });
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.loadBranchUsers();
  }
};
</script>
