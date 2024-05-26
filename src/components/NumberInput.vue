<template>
  <div class="form-group">
    <label v-if="label" class="form-control-label">{{ label }} <span v-if="required" class="text-danger">*</span></label>
    <input
      class="form-control form-control-alternative"
      :placeholder="placeholder"
      :value="value"
      type="number"
      @keyup.prevent="handle_input"
    />
    <label
      v-for="error in errors"
      :key="error"
      class="form-control-flush text-danger text-sm"
      >{{ error }}</label
    >
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: [String, Number],
      default: "",
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
  methods: {
    handle_input: function (e) {
      this.$emit("type", e.target.value);
    },
  },
};
</script>

<style>
</style>