<template>
  <nav-bar navClasses="p-0">
    <template v-slot:nav-brand>
      <a class="navbar-brand page-scroll" href="#main">
        <span class="navbar-brand__logo">Accounting Master</span>
      </a>
    </template>

    <template v-slot:nav-left-items>
      <nav-item href="#about" name="About"></nav-item>
      <nav-item href="#features" name="Features"></nav-item>
      <nav-item href="#pricing" name="Pricing"></nav-item>
    </template>

    <template v-slot:nav-right-items>
      <nav-item name="Log in" link="/login" />
      <nav-item name="Register" link="/register" />
    </template>
  </nav-bar>

  <div class="w-100">
    <hero-banner ref="hero"></hero-banner>
    <about ref="about"></about>
    <features ref="features"></features>
    <pricing ref="pricing"></pricing>
  </div>

  <Footer></Footer>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar/NavBar";
import NavItem from "@/components/Navbar/NavItem";
import HeroBanner from "@/views/Home/HeroBanner";
import About from "@/views/Home/About";
import Features from "@/views/Home/Features";
import Pricing from "@/views/Home/Pricing";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    NavBar,
    NavItem,
    HeroBanner,
    Footer,
    About,
    Features,
    Pricing
  },
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" scoped></style>
