<template>
  <!-- link with subDropdowns -->
  <div class="sidebar-item" v-if="dropdowns">
    <div :class="labelClass" @click="toggleOptions">
      <span class="label-icon"><i :class="icon"></i></span>
      <span class="title">{{ label }}</span>
      <span class="arrow-icon"><i class="fa fa-angle-right"></i></span>
    </div>

    <ul class="sidebar-item__options" v-if="showOptions">
      <li v-for="(dropDown, index) in dropdowns" :key="index">
        <router-link :to="dropDown.link" @click.passive="hideOptions">{{
          dropDown.label
        }}</router-link>
      </li>
    </ul>
  </div>

  <!-- default link without dropdown -->
  <router-link class="sidebar-item__label" v-else :to="link">
    <span class="label-icon"><i :class="icon"></i></span>
    <span class="title">{{ label }}</span>
  </router-link>
</template>

<script>
export default {
  props: ["icon", "label", "link", "dropdowns"],
  data() {
    return {
      showOptions: false
    };
  },
  computed: {
    labelClass() {
      return this.showOptions
        ? "sidebar-item__label showOptions"
        : "sidebar-item__label";
    }
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    hideOptions() {
      // this.showOptions = false;
    }
  }
};
</script>

<style scoped>
.sidebar-item {
  position: relative;
}

.sidebar-item__label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  margin-bottom: 10px;
  color: var(--default);
  border-left: 0px solid var(--blue);
  transition: border-left 0.1s ease-in-out;
}

.sidebar-item__label:hover,
.sidebar-item__label.showOptions,
.sidebar-item__label.active,
.sidebar-item__label.router-link-active {
  border-left: 4px solid var(--blue);
}

.sidebar-item__label.showOptions {
  box-shadow: 0 4px 2px -2px #f1f1f1;
}

.sidebar-item__label .label-icon {
  flex: 0 1 8%;
  margin-right: 10px;
}

.sidebar-item__label .title {
  font-size: 16px;
  font-weight: 300;
  text-transform: capitalize;
}

.sidebar-item__label .arrow-icon {
  margin-left: auto;
  margin-right: 5px;
  transform: rotate(0deg);
  transition: transform 0.2s ease-in-out;
}

.sidebar-item__label.showOptions .arrow-icon {
  transform: rotate(90deg);
}

.sidebar-item__options {
  position: relative;
  list-style: none;
  margin: 10px 0 10px 0;
  padding: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sidebar-item__label.showOptions ~ .sidebar-item__options {
  visibility: visible;
  height: auto;
  opacity: 1;
}

.sidebar-item__options li {
  display: block;
}

.sidebar-item__options li a {
  display: block;
  color: inherit;
  padding: 5px 40px;
  font-size: 15px;
  font-weight: 300;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.sidebar-item__options li a.router-link-active.router-link-exact-active {
  color: var(--blue);
}

.sidebar-item__options li a:before {
  content: "\27A4   ";
  margin-right: 5px;
}

.sidebar-item__options li a:hover {
  color: var(--blue);
}
</style>
