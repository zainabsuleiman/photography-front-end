<template>
  <nav style="height:38px"
    class="navbar navbar-horizontal py-0 rounded navbar-light navbar-expand-lg  bg-gradient-neutral shadow-lg"
  >
    <div class="container pt-0 m-0">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-default"
        aria-controls="navbar-default"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <em class="fas fa-bars"></em>
        <span class="d-lg-none ml-3">Browse Categories</span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-default">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <span class="display-3">Categories</span>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbar-default"
                aria-controls="navbar-default"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav align-items-start mr-lg-auto" style="white-space: nowrap">
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Motors</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Fashion</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Finance</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Sports</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Health & Beauty</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Agriculture</span>
            </a>
          </li>
          <li class="nav-item dropdown">
           <a
              class="nav-link nav-link-icon"
              href="#"
              id="navbar-default_dropdown_2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="nav-link-inner--text">Design blocks<em class="fas fa-caret-down ml-1"></em></span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-xl "
              aria-labelledby="navbarDropdownMenuLink"
            >
              <div class="row">
                <div class="col-md-6">
                  <a class="dropdown-item" href="./sections.html#headers">
                    <em class="ni ni-album-2 text-info"></em>
                    Headers
                  </a>
                  <a class="dropdown-item" href="./sections.html#features">
                    <em class="ni ni-settings text-danger"></em>
                    Features
                  </a>
                  <a class="dropdown-item" href="./sections.html#blogs">
                    <em class="ni ni-align-left-2 text-primary"></em>
                    Blogs
                  </a>
                  <a class="dropdown-item" href="./sections.html#teams">
                    <em class="ni ni-user-run text-danger"></em>
                    Teams
                  </a>
                </div>
                <div class="col-md-6">
                  <a class="dropdown-item" href="./sections.html#projects">
                    <em class="ni ni-paper-diploma text-purple"></em>
                    Projects
                  </a>
                  <a class="dropdown-item" href="./sections.html#pricing">
                    <em class="ni ni-money-coins text-pink"></em>
                    Pricing
                  </a>
                  <a class="dropdown-item" href="./sections.html#testimonials">
                    <em class="ni ni-chat-round text-muted"></em>
                    Testimonials
                  </a>
                  <a class="dropdown-item" href="./sections.html#contact-us">
                    <em class="ni ni-mobile-button text-success"></em>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-link-icon"
              href="#"
              id="navbar-default_dropdown_2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="nav-link-inner--text">Electronics<em class="fas fa-caret-down ml-1"></em></span>
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="navbar-default_dropdown_2"
            >
              <a class="dropdown-item" href="#">TVs</a>
              <a class="dropdown-item" href="#">Phones</a>
              <a class="dropdown-item" href="#">Kitchen</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              <span class="nav-link-inner--text">Agriculture</span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-link-icon"
              href="#"
              id="navbar-default_dropdown_2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="nav-link-inner--text">More<em class="fas fa-caret-down ml-1"></em></span>
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="navbar-default_dropdown_2"
            >
              <a class="dropdown-item" href="#">TVs</a>
              <a class="dropdown-item" href="#">Phones</a>
              <a class="dropdown-item" href="#">Kitchen</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>