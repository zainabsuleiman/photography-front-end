<template>
  <div class="col-auto">
    <input
      class="form-control"
      name="daterange"
      value="01/01/2018 - 01/15/2018"
    />
  </div>
</template>

<script>
export default {
  name: "DateRangePicker",
  props: {
    startDate: {
      default: function () {
        return window.moment().subtract(30, "days");
      },
    },
    endDate: {
      default: function () {
        return window.moment();
      },
    },
  },
  data: function () {
    return {
      start: this.startDate,
      end: this.endDate,
    };
  },
  computed: {
    dateRange: function () {
      //   return this.$nextTick(function () {
      var start = window.moment(this.start);
      var end = window.moment(this.end);
      return start.format("LL") + " - " + end.format("LL");
      //   });
    },
  },

  mounted: function () {
    var vm = this;
    this.start = window.moment(this.start);
    this.end = window.moment(this.end);
    this.$nextTick(function () {
      var options = {
        startDate: this.start,
        endDate: this.end,
        alwaysShowCalendars: true,
      };

      window
        .$('input[name="daterange"]')
        .daterangepicker(options)
        .on("apply.daterangepicker", function (e, picker) {
          vm.$emit("apply", {
            startDate: picker.startDate,
            endDate: picker.endDate,
          });
          vm.start = picker.startDate;
          vm.end = picker.endDate;
        });
    });
  },
};
</script>

<style>
</style>