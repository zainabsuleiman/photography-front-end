<template>
  <!-- Navbar -->
  <nav-bar navClasses="p-0">
    <template v-slot:nav-brand>
      <a class="navbar-brand" href="/">
        <!-- <span class="navbar-brand__logo">Accounting Master</span> -->
      </a>
    </template>

    <template v-slot:nav-right-items>
      <nav-item name="Log in" link="/login" />
      <nav-item name="Register" link="/register" />
    </template>
  </nav-bar>
  <!-- Main content -->
  <div class="main-content bg-gradient-default">
    <!-- Header -->
    <div class="header pt-3 pb-6 pt-lg-5">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5 mt-4">
              <h1 class="text-white">
                {{ currentTitle }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="separator h-100vh separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div> -->
    </div>
    <!-- Page content -->
    <div class="container mt--9 pb-5">
      <div class="row justify-content-center">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
  <Footer v-if="false"></Footer>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar/NavBar";
import NavItem from "@/components/Navbar/NavItem";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    NavBar,
    NavItem,
    Footer
  },
  computed: {
    currentTitle() {
      const path = this.$route.path;

      //switch title based on route path
      switch (path) {
        case "/register":
          return "Photographer";
        case "/registers":
          return "Client";
        case "/login":
          return "Log in";
        case "/forgot_password":
          return "Forgot Password";
        case "/set_password":
          return "Set Your Password";
        default:
          return "Welcome!";
      }
    }
  }
};
</script>

<style></style>
