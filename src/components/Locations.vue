<template>
  <div class="row">
    <div class="form-group mb-3 col-md-6">
      <label class="text-strong">Province</label>
      <select
        class="form-control form-control-alternative"
        v-model="province"
        @change="handle_option(province,'Province')"
      >
        <option>--select province--</option>
        <option v-for="pro in provinces" :key="pro.provincecode" :value="pro">
          {{ pro.provincename }}
        </option>
      </select>
      <span id="phone_error" class="text-danger"></span>
    </div>
    <div class="form-group mb-3 col-md-6">
      <label class="text-strong">District</label>
      <select
        class="form-control form-control-alternative"
        v-model="district"
        @change="handle_option(district,'District')"
      >
        <option selected>--select district--</option>
        <option v-for="dis in districts" :key="dis.districtcode" :value="dis">
          {{ dis.namedistrict }}
        </option>
      </select>
      <span id="phone_error" class="text-danger"></span>
    </div>
    <div class="form-group mb-3 col-md-6">
      <label class="text-strong">Sector</label>
      <select
        class="form-control form-control-alternative"
        v-model="sector"
        @change="handle_option(sector,'Sector')"
      >
        <option selected>--select sector--</option>
        <option v-for="sec in sectors" :key="sec.sectorcode" :value="sec">
          {{ sec.namesector }}
        </option>
      </select>

      <span id="phone_error" class="text-danger"></span>
    </div>

    <div class="form-group mb-3 col-md-6">
      <label class="text-strong">Cell</label>
      <select class="form-control" v-model="cell" @change="handle_option(cell,'Cell')">
        <option selected>--select cell--</option>
        <option v-for="cell in cells" :key="cell.codecell" :value="cell">
          {{ cell.nameCell }}
        </option>
      </select>
    </div>
    <!-- <div class="form-group mb-3 col-md-6">
      <label class="text-strong">Villages</label>
      <select class="form-control" v-model="village" @change="handle_option(village)">
        <option selected>--select village--</option>
        <option v-for="vill in villages" :key="vill.id" :value="vill">
          {{ vill.name }}
        </option>
      </select>
      <span id="phone_error" class="text-danger"></span>
    </div> -->
  </div>
</template>
<script>
import axios from "axios";
// import { alert } from "@/utils/alertUtils";
export default {
  props: {
    
    stage: {
            type: String,
            required:false
    },
    location_type:{
        type: String,
        required: false
    },
    entity_location:{
      type:Object,
      required:false,
      default:null
    }
  },
  data() {
    return {
      locations: [],
      provinces: [],
      location: "",
      districts: [],
      sectors: [],
      cells: [],
      villages: [],
      province: {},
      district: {},
      sector: {},
      cell: {},
      village: {},
      changed:false
    };
  },
  methods: {
    handle_option: function (evt,type) {
      this.changed=true
      this.location = evt;
      
      if (type == "Province") {
        this.get_districts();
        this.province=this.location
       
      }
      if (type == "District") {
        this.get_sectors();
        this.district=this.location
      }
      if (type == "Sector") {
        this.get_cells();
        this.sector=this.location
      }

      if (type == "Cell") {
         this.$emit("on-select", this.location);
      }
    },
    get_provinces: function () {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/api/locations/provinces/`,{
          headers: {
              Authorization: "Bearer " + this.$store.getters.getToken,
            },
        })
        .then((res) => {
           console.log(res)
          this.provinces = res.data.data;
          this.province = res.data.data[0];
          this.get_districts()
        })
        .catch((err) => {
          console.log(err)
        });
    },
    get_districts: function () {
          this.districts =this.province.districts
          this.district = this.districts[0];
          this.get_sectors();
    },
    get_sectors: function () {
      this.sectors = this.district.sectors;
      this.sector = this.sectors[0];
      this.get_cells();
    },
    get_cells: function () {
      this.cells = this.sector.cells;
      this.cell = this.cells[0];
      if (this.cell) {
        this.$emit("on-select", this.cell);
      }
      if(!this.changed){
        this.populate_location()
      }
     
    },

    populate_location:function(){
      if(this.entity_location!==null){
        this. province=this.entity_location.cell.sector.district.province
        this.districts=this.entity_location.cell.sector.district
        this.sector=this.entity_location.cell.sector
        this.cell=this.entity_location.cell
      }
    }
    // get_villages: function () {
    //   if (this.cell) {
    //     this.villages = this.cell.villages;
    //     this.villages = villages({ parent_id: this.cell.id });
    //     this.village = this.villages[0];
    //     this.$emit("on-select", this.village);
    //   }
    // },
  },
  created() {
    // this.get_locations();
    this.get_provinces();
  },
}
</script>