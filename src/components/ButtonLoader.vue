<template>
    <button 
    :disabled="show_loader"
    @click="$emit('click')" 
    :class="classes"
    :style="!show_loader?'':styleObject"
    >
      {{ title }} <i v-if="show_loader" class="fa fa-spinner fa-spin"></i>
    </button>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    show_loader: {
      type: Boolean,
      required: true,
    },
    classes:{
        type: String,
        required: true
    }
  },
  data() {
    return {
      styleObject: {
        cursor: "not-allowed",
      },
    };
  },
};
</script>