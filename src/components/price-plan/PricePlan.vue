<template>
  <div
    class="price-plan"
    :class="{
      basic: index === 0,
      standard: index === 1,
      premium: index === 2
    }"
  >
    <div class="price-plan__label" v-if="index === 1">Most Popular</div>
    <div class="price-plan__details">
      <h2 class="price-plan__details--subtitle">{{ title }}</h2>
      <span class="price-plan__details--title">$ {{ price }}</span>
      <ul class="price-plan__details--list">
        <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
      </ul>
      <button class="btn btn-dark btn-block btn-action rounded-0" type="button">
        Get Plan
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    features: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.price-plan {
  position: relative;
  padding: 50px;
  margin: 0 auto;
  margin-bottom: 30px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  border: transparent;
  max-width: 320px;
}

.price-plan__label {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  background: var(--success);
  border-radius: 20px;
}

.price-plan.basic {
  border-top: 6px solid var(--light);
}

.price-plan.standard {
  border-top: 6px solid var(--success);
}

.price-plan.premium {
  border-top: 6px solid var(--blue);
}

.price-plan:hover {
  box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.1);
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

.price-plan__details--subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
}

.price-plan__details--title {
  display: inline-block;
  font-size: 28px;
  font-weight: 400;
  color: #808080;
}

.price-plan__details--list {
  list-style: none;
  margin-top: 35px;
  margin-bottom: 35px;
  padding: 0;
}

.price-plan__details--list li {
  font-size: 13px;
  font-weight: 400;
  color: #505050;
  line-height: 1.4;
  margin-bottom: 8px;
}
</style>
