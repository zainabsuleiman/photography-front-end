<template>
  <nav
    aria-label="nav"
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="d-flex align-items-center justify-content-between px-2 py-3">
        <span class="navbar-dark text-xl-center">My Art Studio</span>
        <!-- Sidenav toggler -->
        <div
          class="sidenav-toggler d-none d-xl-block"
          data-action="sidenav-unpin"
          data-target="#sidenav-main"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->
          <ul class="navbar-nav navbar-dark">
            <slot name="sidebarItems"></slot>
          </ul>

          <!-- Navigation -->
          <ul class="navbar-nav mb-md-3"></ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "sideBar"
};
</script>

<style>
.sidenav {
  z-index: 5;
}

.sidenav .sidenav-toggler {
  padding: 0;
}

.sidenav .navbar-brand__logo {
  font-size: 22px;
}

.sidenav-username {
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-left: 8px;
  margin-bottom: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid rgb(251, 249, 249);
  border-bottom: 1px solid rgb(250, 249, 249);
}

.sidenav-username .sidenav-username__label {
  font-size: 15px;
  font-weight: 400;
  margin-left: 15px;
  text-transform: capitalize;
}
</style>
