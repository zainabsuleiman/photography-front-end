<template>
  <div class="statistic-card text-center">
    <h4 class="statistic-card__title">{{ title }}</h4>
    <span class="statistic-card__number">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="css" scoped>
.statistic-card {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: all 0.3s ease;
}

.statistic-card:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.statistic-card__title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
}

.statistic-card__number {
  font-size: 18px;
  font-weight: 400;
  color: var(--blue);
}
</style>
