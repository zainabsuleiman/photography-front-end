<template>
  <side-bar>
    <template v-slot:sidebarItems>
      <div class="sidenav-username" id="loggedAs">
        <span class="avatar avatar-sm rounded-circle sidenav-username__avatar"
          ><img src="../../assets/images/default-icon.png" alt="user-avatar"
        /></span>
        <span class="sidenav-username__label">{{
          username ? username.split("@")[0] : "Username"
        }}</span>
      </div>
      <sidebar-items></sidebar-items>
    </template>
  </side-bar>

  <!-- Main content -->
  <div class="main-content" id="panel">
    <!-- Topnav -->
    <nav
      aria-label="nav"
      class="navbar navbar-top navbar-expand navbar-dark bg-default border-bottom"
    >
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- <h2 class="h4 text-white">{{ $route.name }}</h2> -->
          <!-- Navbar links -->
          <ul
            class="navbar-nav navbar-dark bg-default align-items-center ml-md-auto"
          >
            <li class="nav-item d-xl-none">
              <!-- Sidenav toggler -->
              <div
                class="pr-3 sidenav-toggler sidenav-toggler-dark"
                data-action="sidenav-pin"
                data-target="#sidenav-main"
              >
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>
            <li v-if="false" class="nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="ni ni-bell-55"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden"
              >
                <!-- Dropdown header -->
                <div class="px-3 py-3">
                  <h6 class="text-sm text-muted m-0">
                    You have
                    <strong class="text-primary">13</strong> notifications.
                  </h6>
                </div>
                <!-- List group -->
                <div class="list-group list-group-flush">
                  <a href="#!" class="list-group-item list-group-item-action">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <img
                          alt="Image placeholder"
                          src=""
                          class="avatar rounded-circle"
                        />
                      </div>
                      <div class="col ml--2">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        ></div>
                        <p class="text-sm mb-0">
                          Let's meet at Starbucks at 11:30. Wdyt?
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav navbar-dark align-items-center ml-auto ml-md-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link pr-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    {{ userLabel }}
                  </span>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-header noti-title">
                  <h6 class="text-overflow m-0">Welcome! {{ username }}</h6>
                </div>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'UserProfile' }"
                >
                  <i class="ni ni-single-02"></i>
                  <span>My profile</span>
                </router-link>
                <router-link
                  @click="logout"
                  :to="{ name: 'Login' }"
                  class="dropdown-item"
                >
                  <i class="ni ni-user-run"></i>
                  <span>Logout</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Page content -->
    <div class="container-fluid mt-3">
      <div class="header py-0 shadow bg-white my-3">
        <div class="container-fluid">
          <div class="header-body">
            <div class="row py-3">
              <nav aria-label="breadcrumb" class="ml-2">
                <ol class="breadcrumb breadcrumb-links">
                  <li class="breadcrumb-item">
                    <i class="fas fa-home"></i>
                  </li>
                  <li
                    class="breadcrumb-item"
                    v-for="(item, index) in breadCrumbs"
                    :key="index"
                  >
                    {{ capitalizeFirstLetter(item) }}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100">
        <router-view v-slot="{ Component, route }">
          <transition name="slide-fade">
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import SidebarItems from "@/Layouts/dashboard/partials/SidebarItems";

export default {
  components: { SideBar, SidebarItems },
  computed: {
    names: function() {
      return this.$store.getters.getNames;
    },
    first_name: function() {
      return this.$store.getters.getFirstName;
    },
    username: function() {
      return this.$store.getters.getUsername;
    },
    breadCrumbs: function() {
      return this.$route.path.split("/").slice(1);
    },
    userLabel() {
      return this.username ? this.username.slice(0, 1).toUpperCase() : "U";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
<style></style>
