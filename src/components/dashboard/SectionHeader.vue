<template>
  <div class="section-header">
    <div class="section-header__left">
      <h1 class="title" v-if="title">{{ title }}</h1>
      <span class="subtitle" v-if="subtitle">{{ subtitle }}</span>
      <span class="info" v-if="info"><i class="fa fa-info-circle mr-2"></i>{{info}}</span>
    </div>

    <div class="section-header__right">
      <slot name="component"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    info:{
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="css" scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-header .subtitle, .section-header .info {
  font-size: 14px;
}
</style>
