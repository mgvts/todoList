<script setup lang="ts">
import {defineProps, defineEmits, watch} from 'vue';
import type {TodoItem} from '@/stores/todo.store';

const props = defineProps<{ item: TodoItem }>();
const emits = defineEmits(['remove', 'toggle-completion', 'update']);

const handleRemove = () => {
  emits('remove', props.item.id);
};

const handleToggleCompletion = () => {
  emits('toggle-completion', props.item.id);
}

watch(
    () => props.item.text,
    (newValue: string) => {
      emits('update', props.item.id, newValue);
    }
);
</script>

<template>
  <div class="todo-item-wrap">
    <div class="todo-item">
      <input
          class="check-box"
          type="checkbox"
          :checked="item.completed"
          @change="handleToggleCompletion"
      />
      <input v-model="item.text" class="text-content" :class="{completed: item.completed}"/>
      <button @click="handleRemove" class="delete-button">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.todo-item-wrap:first-child {
  border-top: none;

}

.todo-item-wrap {
  border-top: thin solid lightblue;
}

.todo-item {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.todo-item.text-content {
  width: 80%;
}

.todo-item:hover .delete-button {
  left: 0;
}

.todo-item:hover .check-box {
  right: 0;
}

.delete-button {
  position: relative;
  left: 70px;
  transition: all 0.3s ease;
}

.check-box {
  position: relative;
  right: 50px;
  transition: all 0.3s ease;
}

.text-content {
  border: none;
}

.text-content:focus {
  outline: none;
}
.text-content.completed {
  text-decoration: line-through;
}

button {
  margin-left: 10px;
}
</style>
