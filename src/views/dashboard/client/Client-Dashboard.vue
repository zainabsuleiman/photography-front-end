<template>
  <div class="mt-4 card shadow w-100 p-4 text-center">
      <h3>Available Phototgraphers</h3>
    <client/>
  </div>
</template>

<script>
import Client from './client.vue';
// @ is an alias to /src
// import Photographers from "./photographer/photographers.vue"

export default {
  name: "Client-Dashboard",
  components: {
    Client
    // Photographers
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  mounted() {},
};
</script>
