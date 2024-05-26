<template>
 
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12">
             
            <card
              :title="stats.money.title"
              :value=inst
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              :title="stats.users.title"
              :value=att
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              :title="stats.clients.title"
              :value=res
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              directionReverse
            ></card>
          </div>
          <!-- <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.sales.title"
              :value="stats.sales.value"
              :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass"
              :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail"
              directionReverse
            ></card>
          </div> -->
        </div>
        <div class="row">
          
          <div class="col-lg-5">
            
          </div>
        </div>
        <div class="row mt-4">
          
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "../../../components/Cards/Card.vue";
// import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
// import Carousel from "./components/Carousel.vue";
// import CategoriesCard from "./components/CategoriesCard.vue";
import axios from "axios";




export default {
  name: "dashboard-default",
  data() {
    return {
      data_loaded: false,
      institutions: [],
      daily_attendance: [],
      employees: [],
      att:'',
      res:"",
      inst:'',
      stats: {
        money: {
          title: "Appointments",
          value:this.res,
          percentage: "+55%",
          iconClass: "ni ni-single-02",
          iconBackground: "bg-gradient-success",
        },
        users: {
          title: "Clients",
          value: "2,300",
          percentage: "+3%",
          iconClass: "ni ni-collection",
        iconBackground: "bg-gradient-danger",
        },
        clients: {
          title: "Activities ",
          value: "+3,462",
          percentage: "-2%",
          iconClass: "ni ni-chart-pie-35",
          iconBackground: "bg-gradient-warning",
        },
        // sales: {
        //   title: "Sales",
        //   value: "$103,430",
        //   percentage: "+5%",
        //   iconClass: "ni ni-cart",
        //   iconBackground: "bg-gradient-warning",
        //   detail: "than last month",
        // },
      },
      // sales: {
      // },
    };
  },
  components: {
    Card,
    // GradientLineChart,
    // Carousel,
    // CategoriesCard,
    
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
    fetch_users: function() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}photographer/${this.get_id}/activities/`, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.institutions = res.data;
          this.data_loaded = true;
          this.res = this.institutions.length;
        })
        .catch((err) => {
          this.data_loaded = true;
          console.error(err);
        });
    },
    fetch_photographers: function() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}photographer/${this.get_id}/appointments`, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.daily_attendance = res.data;
          this.data_loaded = true;
          this.inst = this.daily_attendance.length;
           
        })
        .catch((err) => {
          this.data_loaded = true;
          console.error(err);
        });
    },
        fetch_clients: function() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}api/client/list/`, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getToken,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          this.employees = res.data;
          this.data_loaded = true;
          this.att = this.employees.length;
          console.log(this.att);
        })
        .catch((err) => {
          this.data_loaded = true;
          console.error(err);
        });
    },
  },
  created() {
    this.fetch_clients();
    this.fetch_photographers();
    this.fetch_users();

    console.log(this.$store.getters.getUserRole)

  },
};
</script>
