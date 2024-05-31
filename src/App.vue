<script setup lang="ts">
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import TaskItem from '@/components/TaskItem.vue'

</script>

<template>
  <div class="task-list">
    <div class="task-list__control">
      <InputComponent
        placeholder="поиск"
      />
      <ButtonComponent>
        добавить задачу
      </ButtonComponent>
    </div>
    <div class="task-list__items">
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-list {
  display: grid;
  row-gap: 18px;
  &__control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__items {
    display: grid;
    row-gap: 4px;
  }
}
</style>
