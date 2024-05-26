<template>
  <!-- <input
      type="text"
      name="search"
      class="form-control form-control-alternative"
      placeholder="search ..."
      v-model="search"
    />
    <router-link :to="{ name: 'SearchView', query: { search: search } }">
      <button class="btn btn-icon btn-default">
        <em class="fas fa-search"></em>
      </button>
    </router-link>
  </div> -->
  <div class="form-group rounded-pill border-default bg-white shadow-lg mt-2 mb-2">
    <div class="input-group input-group-merge">
      <input
        style="width: 30vw"
        type="text"
        name="search"
        v-model="search"
        class="form-control rounded-pill border-0 py-0"
        placeholder="search ..."
        aria-describedby="basic-addon2"
        @keyup.enter="searchFn"
      />
      <div style="z-index: 1030;" @click="searchFn" class="input-group-append rounded-circle border-0 py-0 hover-cursor">
        <span id="basic-addon2" class="input-group-text rounded-circle border-0">
          <em class="fas text-white bg-default rounded-circle p-2 fa-search mt--1"></em>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      search: null,
    };
  },

  methods: {
    searchFn: function () {
      if (this.search) {
        this.$router.push({
          name: "SearchView",
          query: { search: this.search },
        });
      }
    },
  },
};
</script>
<style lang="css" scoped>
/* .box input[type="text"] {
  padding: 0px 25px;
  border: 0.5px solid #192b3e;
  width: 30vw;
  height: 40px;
  outline: none;
  background: white;
}
/* #search-input::-webkit-input-placeholder { 
font-family: FontAwesome;
} */
/* .box input[type="submit"] {
  position: relative;
  height: 40px;
  width: 10vw;
  border: 1px solid #192b3e;
  outline: none;
  cursor: pointer;
  background: #192b3e;
  color: white;
  left: -5px;
} */
/* @media (max-width: 768px) {
  .box input[type="text"] {
    padding: 0px 25px;
    border: 1px solid #192b3e;
    width: 200px;
    height: 30px;
    outline: none;
    background: white;
  }
  .box input[type="submit"] {
    position: relative;
    height: 30px;
    width: 80px;
    border: 1px solid #192b3e;
    outline: none;
    cursor: pointer;
    background: #192b3e;
    color: white;
    left: -5px; */
/* } */
/* } */
</style>