<template>
  <div class="form-group">
    <label v-if="label" class="form-control-label">{{ label }} <span v-if="required" class="text-danger">*</span> </label>
    <input
      class="form-control form-control-alternative"
      :placeholder="placeholder"
      :value="value"
      :type="is_password ? 'password' : 'text'"
      @keyup.prevent="handle_input"
    />
    <label
      v-for="error in errors"
      :key="error"
      class="form-control-flush text-danger text-sm"
    >
      {{ error }}
    </label>
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
    is_password: {
      default: false,
      type: Boolean,
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