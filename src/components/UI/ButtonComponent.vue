<script setup lang="ts">
// setups
const props = defineProps({
  isCross: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

// methods
function handleClick(e: any) {
  e.stopPropagation()
  emits('click', e)
}
</script>

<template>
  <button @click="handleClick" class="button" :class="{ box: props.isCross }">
    <img v-if="props.isCross" class="button__icon" src="/cross.svg" alt="" srcset="" />
    <span v-else class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.button {
  cursor: pointer;
  background-color: var(--color-primary);
  border: 0;
  padding: 4px;
  border-radius: 2px;
  &.box {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    padding: 0;
  }
  &__text {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-white);
    line-height: 21.86px;
  }
  &:active {
    opacity: 0.8;
  }
  &__icon {
    width: 15px;
    height: 15px;
  }
}
</style>
