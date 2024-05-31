<script setup lang="ts">
const model = defineModel()
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="input">
    <div v-if="props.label?.length" class="input__label">
      {{ props.label }}
    </div>
    <input v-model="model" class="input__field" type="text" :placeholder="props.placeholder">
  </div>
</template>
<style scoped lang="scss">
.input {
  display: grid;
  row-gap: 2px;
  &__label {
    text-transform: uppercase;
    font-size: 10px;
    opacity: 0.5;
  }
  &__field {
    padding: 4px 6px;
    border-radius: 4px;
    border: 1px solid var(--color-hard-gray);
  }
}
</style>
