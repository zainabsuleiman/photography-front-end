<template>
  <span>
     <input type='text' class="form-control form-control-alternative" v-model="d_date" onkeydown="return false;" :id='id'/>
  </span>
</template>

<script>
export default {
  name: "DateTimePicker",

  props: {
    locadate: {
      default: function () {
        return window.moment().subtract(30, "days");
      },
    }, 
    id: {
      default: "datetimepicker1"
    }, 
  },
  data: function () {
    return {
      d_date:"08/13/2021 5:03 PM"
    };
  },


  mounted: function () {
      var vm=this
      var id=this.id
      
     window
        .$('#'+id)
        .datetimepicker().on("dp.change",function(e){
               vm.$emit("apply", {
                date: e.date._d
              });
        })
        
       
  },
};
</script>

<style>
</style>