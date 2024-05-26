<template>
  <div class="mt-4">
    <button
      v-if="$guards.is_super_admin()"
      @click="$router.push({ name: 'New Plan' })"
      class="btn btn-sm btn-default"
    >
      New
    </button>
    <div class="card shadow w-100 mt-2 p-4">
      <data-table
        v-if="data_loaded"
        id="plans_list"
        :options="dtb_options.extra_options"
        :actions="dtb_options.actions"
        :data="dtb_options.data"
        :columns="dtb_options.columns"
      />
    </div>

    <!-- Update plan Modal -->
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "@/components/DataTable";
import { alert } from "../../utils/alertUtils";

export default {
  name: "Plans",
  components: {
    "data-table": DataTable,
  },
  data() {
    return {
      plans: [],
      data_loaded: false,
      dtb_options: {
        data: [],
        actions: this.$guards.is_super_admin()
          ? [
              // {
              //   btnText: "",
              //   btnClass: "btn btn-white text-danger btn-sm",
              //   iconClass: "fas fa-trash",
              //   btnFn: (uuid) => {
              //     this.delete_plan(uuid)
              //   },
              //   btnParamName: "uuid",
              // },
               {
                btnText: "Detail",
                btnClass: "btn btn-default text-white btn-sm",
                iconClass: "fas fa-info-circle",
                btnFn: (uuid) => {
                  this.$router.push({name:"PlanDetail",params:{uuid:uuid}})
                },
                btnParamName: "uuid",
              },
            ]
          : [],
        columns: [{ title: "Name", data: "name" }],
        extra_options: {},
      },
    };
  },
  methods: {
    fetch_plans: function () {

           var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans`;
      axios
        .get(url, {
              headers: {
                Authorization: "Bearer " + this.$store.getters.getToken,
              },
            })
        .then((res) => {
          console.log(res);
          this.dtb_options.data = res.data;
          this.data_loaded = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    delete_plan: function (uuid) {
      var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${uuid}`;
      axios
        .delete(url, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
          },
        })
        .then(() => {
          alert.success_center("Plan Deleted successfully.");
          this.fetch_plans()
        })
        .catch(() => {
          alert.error("An error occured, in deleting plan");
        });
    },
    // update_plan:function(uuid){
    //   var url = `${process.env.VUE_APP_BACKEND_URL}/api/plans/${uuid}`
    //   axios.put(url,this.dtb_options.data,)
    // },
  },
  mounted() {
    this.fetch_plans();
  },
  created() {
    // this.fetch_plans();
  },
};
</script>

<style>

</style>