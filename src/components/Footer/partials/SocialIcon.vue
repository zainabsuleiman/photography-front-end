<template>
  <a :href="link" target="__blank" class="mr-2">
    <button type="button" :class="getBtnClass">
      <span class="btn-inner--icon"><em :class="iconClass"></em></span>
    </button>
  </a>
</template>

<script>
export default {
  name: "SocialIcon",
  props: ["link", "iconClass", "btnClass"],
  computed: {
    getBtnClass: function() {
      return this.btnClass + " btn-icon-only rounded-circle";
    }
  }
};
</script>
