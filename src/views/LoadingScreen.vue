<template>
  <div class="row w-100 justify-content-center">
    <div style="margin-top: 30vh">
      <p class="text-default opacity-7 text-center mb--6 display-4">
        {{ message }}
      </p>
      <img
        class="img-center"
        style="height: 30vh"
        src="../assets/images/load.gif"
        alt=""
        srcset=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style>
</style>