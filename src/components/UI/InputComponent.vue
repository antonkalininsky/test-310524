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
  },
  type: {
    type: String,
    default: 'text'
  },
  isError: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="input">
    <div
      v-if="props.label?.length"
      class="input__label"
      :class="{ 'input__label--error': props.isError }"
    >
      {{ props.label }}
    </div>
    <input
      v-model="model"
      class="input__field"
      :class="{ 'input__field--error': props.isError }"
      :type="props.type"
      :placeholder="props.placeholder"
    />
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
    &--error {
      color: red;
    }
  }
  &__field {
    padding: 4px 6px;
    border-radius: 4px;
    border: 1px solid var(--color-hard-gray);
    font-size: 16px;
    line-height: 21.86px;
    &--error {
      border: 1px solid red;
    }
  }
}
</style>
