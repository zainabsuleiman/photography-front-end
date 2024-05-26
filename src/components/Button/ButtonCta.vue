<template>
  <button type="button" @click="onclick" :class="btnClass" :disabled="disabled">
    <span v-if="isBusy"><i class="fa fa-spinner fa-spin"></i></span>
    <span v-if="!isBusy">{{ label }}</span>
  </button>
</template>

<script>
export default {
  emits: ["click"],
  props: {
    label: {
      type: String,
      default: "Button"
    },
    isBusy: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: "btn btn-info"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      return this.class + (this.isBusy || this.disabled ? " disabled" : "");
    }
  },
  methods: {
    onclick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
}
</style>
