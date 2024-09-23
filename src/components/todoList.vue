<script setup lang="ts">
import { useTodoStore } from "@/stores/todo.store";
import TodoItem from "@/components/todoItem.vue";
import {computed, onMounted} from "vue";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.loadItems();
});



const items = computed(() => todoStore.items)
const addItem = () => todoStore.addItem("New Item")
const removeItem = (id: number) => todoStore.removeItem(id)
const updateItem = (id: number, text: string) => {
  console.log(id, text);
  todoStore.updateItem(id, text)
}
const toggleCompletion = (id: number) => todoStore.toggleCompletion(id)
</script>

<template>
  <div class="card-wrap">
    <div class="card-header">
      <div>
        Todo List
      </div>
      <div>
        <button @click="addItem" class="add-item-btn">+</button>
      </div>
    </div>
    <div class="card-body">
      <todo-item
          v-for="item in items"
          :key="item.id"
          :item="item"
          @remove="removeItem"
          @toggle-completion="toggleCompletion"
          @update="updateItem"
      />
    </div>
  </div>
</template>

<style scoped>
.card-wrap {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border: thin solid lightblue;
}

.card-header {
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: thin solid lightblue;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.add-item-btn {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .card-wrap {
    width: 100%;
    padding: 10px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>
