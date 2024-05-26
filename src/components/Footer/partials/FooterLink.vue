<template>
  <li class="footer__item">
    <router-link class="footer__link text-white" :to="link">{{
      name
    }}</router-link>
  </li>
</template>

<script>
export default {
  name: "footerLink",
  props: ["name", "link"]
};
</script>

<style>
.footer__item {
  margin-bottom: 15px;
}

.footer__link {
  text-decoration: none;
  font-size: 14px;
}
</style>
