<template>
  <div class="info-tag">
    <span class="info-tag__label">{{ label }}:</span>
    <span class="info-tag__value">{{ getValue }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true,
      default: "N/A"
    }
  },
  computed: {
    getValue() {
      return this.value || typeof this.value !== "undefined"
        ? this.value
        : "N/A";
    }
  },
};
</script>

<style scoped>
.info-tag {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.info-tag__label {
  display: inline-block;
  font-weight: 600;
  color: var(--default);
  margin-right: 10px;
}

.info-tag__value {
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: 2.5px;
  padding: 2.5px 10px;
  font-weight: 400;
  font-size: 14px;
  text-transform: capitalize;
  color: var(--blue);
}
</style>
