<template>
  <div class="mt-4 h-100 card shadow w-100 p-9 text-center bg-gradient-danger">
    <h1 class="text-white p-4">You are not authorized to access this page</h1>
    <button class="btn btn-warning float-left" @click="$router.go(-1)" >Go Back</button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Unauthorized",
  components: {
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
