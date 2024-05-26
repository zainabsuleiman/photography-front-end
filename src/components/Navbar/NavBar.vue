<template>
  <!-- <div class="bg-white shadow-lg"> -->
  <nav :class="navbarClass">
    <div class="container px-0">
      <slot name="before-brand" />
      <slot name="nav-brand"></slot>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse ml-lg-2" id="navbarSupportedContent">
        <div class="float-right collapse-close">
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <ul class="navbar-nav mr-auto">
          <slot name="nav-left-items"></slot>
        </ul>
        <ul class="navbar-nav mx-auto">
          <slot name="nav-center-items"></slot>
        </ul>
        <ul class="navbar-nav ml-auto">
          <slot name="nav-right-items"></slot>
        </ul>
        <slot name="left-items"></slot>
      </div>
    </div>
  </nav>
  <!-- </div> -->
</template>

<script>
export default {
  name: "navbar",
  props: ["navbrand", "navClasses"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    navbarClass() {
      const navbarClass =
        "navbar navbar-horizontal navbar-main navbar-expand-lg navbar-light";
      return this.$route.path === "/"
        ? navbarClass + " fixed-top"
        : navbarClass;
    }
  }
};
</script>

<style lang="css" scoped>
.navbar {
  /* border-bottom: 1px solid #eee; */
  padding: 0.5rem 0;
  background-color: #fff;
}
</style>
