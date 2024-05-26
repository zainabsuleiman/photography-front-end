<template>
  <div class="item" v-for="(category, index) in categories" :key="index">
    <router-link :to="category.link">
      <div class="text-center p-2 slideItem__card">
        <img
          :src="category.image"
          alt="cat_image"
          class="rounded-circle shadow--hover"
          height="152"
          width="154"
        />
        <br />
        <h4 class="pt-1 text-black">{{category.name}}</h4>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Category",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data() {
    return {};
  }
};
</script>
<style lang="css" scoped>
.slideItem__card {
  max-width: 10rem;
  max-height: 12rem;
  margin-bottom: 25px;
}
</style>