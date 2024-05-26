<template>
  <div class="form-group">
    <label v-if="label" class="form-control-label">{{ label }}<span v-if="required" class="text-danger">*</span></label>
    <div class="input-group input-group-alternative">
      <div class="input-group-prepend">
        <select class="form-control" v-model="selected_country">
          <option
            class=""
            v-for="country in countries"
            :key="country.isoCode"
            :value="country"
          >
            <span>{{ country.isoCode }} ({{ country.dialCode }})</span>
          </option>
        </select>
      </div>
      <input
        class="form-control"
        :placeholder="placeholder"
        :value="value.value"
        type="text"
        @keyup.prevent="handle_input"
      />
      <div class="input-group-append">
        <span class="input-group-text bg-neutral py-0">
          <img
            :src="selected_country.flag"
            class="shadow"
            style="height: 30px"
            alt=""
          />
        </span>
      </div>
    </div>
    <label
      v-for="error in errors"
      :key="error"
      class="form-control-flush text-danger text-sm"
    >
      {{ error }}
    </label>
    <label
      v-for="error in internal_errors"
      :key="error"
      class="form-control-flush text-danger text-sm"
    >
      {{ error }}
    </label>
  </div>
</template>

<script>
import phoneLib from "google-libphonenumber";
import countries from "../assets/country_phone_codes"
export default {
  name: "Phone Input",
  props: {
    value: {
      type: Object,
      default: function () {
        return {
          value: "",
          full_format: "",
          valid: false
        };
      },
    },
    errors: Array,
    label: [String, Number],
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    selected_country: function () {
      this.validate_phone(this.value.value);
    },
  },
  data() {
    return {
      internal_errors: [],
      countries: countries,
      selected_country: {
        name: "Rwanda",
        dialCode: "+250",
        isoCode: "RW",
        flag: "https://www.countryflags.io/RW/flat/64.png",
      },
      valid: false,
      formatted: "",
      phoneUtil:phoneLib.PhoneNumberUtil.getInstance(),
    };
  },
  methods: {
    get_phone:function(value){
      try {
          let PNF=phoneLib.PhoneNumberFormat
       
         return this.phoneUtil.format(this.phoneUtil.parse(value,'RW'), PNF.INTERNATIONAL)
      }
      catch(err) {
        // console.log(err)
        return 0
      }
     
    },
    
    handle_input: function (e) {
    //  console.log(this.get_phone(e.target.value))
      
      var val = {
        value: e.target.value,
        full_format: this.get_phone(e.target.value),
        valid: false,
      };
      this.internal_errors = [];
      if (!this.validate_phone(val.full_format)) {
        this.$emit("type", val);
      } else {
        this.$emit("type",this.formatted);
      }
    },
    selectCountryByCode: function (val) {
      this.countries.forEach((country) => {
        if (country.dialCode === "+" + val) {
          this.selected_country = country;
        }
      });
    },
    validate_initial: function (new_v) {
      this.internal_errors = [];
      const phoneUtil = phoneLib.PhoneNumberUtil.getInstance();
      const PNF = phoneLib.PhoneNumberFormat;

      try {
        const number = phoneUtil.parseAndKeepRawInput(
          new_v,
          this.selected_country.isoCode
        );
        const val = phoneUtil.formatInOriginalFormat(number, PNF.INTERNATIONAL);
        this.formatted = {
          value: val.replace("+" + number.getCountryCode(), ""),
          full_format: val,
          valid: true,
        };
        this.selectCountryByCode("+" + number.getCountryCode());
        this.$emit("type", this.formatted);
        const res = phoneUtil.isValidNumber(number);
        if(!res)
            this.internal_errors.push('invalid phone number')
        return res
      } catch (error) {
        this.internal_errors.push("invalid phone number");
        return false;
      }
    },
    validate_phone: function (new_v) {
      this.internal_errors = [];
      const phoneUtil = phoneLib.PhoneNumberUtil.getInstance();
      const PNF = phoneLib.PhoneNumberFormat;

      try {
        const number = phoneUtil.parseAndKeepRawInput(
          new_v,
          this.selected_country.isoCode
        );
        const val = phoneUtil.formatInOriginalFormat(number, PNF.INTERNATIONAL);
        this.formatted = {
          value: val.replace("+" + number.getCountryCode(), ""),
          full_format: val,
          valid: true,
        };
        this.selectCountryByCode("+" + number.getCountryCode());
        const res = phoneUtil.isValidNumber(number);
        if(!res)
            this.internal_errors.push('invalid phone number')
        return res
      } catch (error) {
        this.internal_errors.push("invalid phone number");
        return false;
      }
    },
  },
  created() {
    if (this.value.full_format) {
      this.validate_initial(this.value.full_format);
    }
  },
};
</script>

<style>
</style>