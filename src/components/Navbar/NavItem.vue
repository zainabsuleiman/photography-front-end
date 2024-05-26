<template>
  <li class="nav-item">
    <router-link v-if="!href" :class="navLinkClass" :to="link">{{
      name
    }}</router-link>
    <a v-else :href="href" :class="navLinkClass">{{ name }}</a>
  </li>
</template>

<script>
export default {
  name: "navItem",
  props: ["name", "link", "href"],
  computed: {
    navLinkClass() {
      return {
        "nav-link": true,
        active: this.$route.path === this.link,
        "page-scroll": this.href && this.href.startsWith("#")
      };
    }
  }
};
</script>

<style>
.nav-item .nav-link {
  color: #333;
}
</style>
