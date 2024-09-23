import {defineStore} from 'pinia';

// Тип для отдельного элемента to-do
export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}


interface TodoState {
    items: TodoItem[];
}

const STORAGE_KEY = 'todo-items';

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        items: []
    }),

    actions: {
        addItem(text: string) {
            const newItem: TodoItem = {
                id: Date.now(), // unique ID
                text,
                completed: false
            };
            this.items.push(newItem)
            this.saveItems()
        },

        removeItem(id: number) {
            this.items = this.items.filter(item => item.id !== id)
            this.saveItems()
        },

        toggleCompletion(id: number) {
            const item = this.items.find(item => item.id === id)
            if (!item) return
            item.completed = !item.completed
            this.saveItems()
        },
        updateItem(id: number, text: string) {
            const item = this.items.find(item => item.id === id)
            if (!item) return
            item.text = text
            this.saveItems()
        },

        loadItems(): void {
            const storedItems = localStorage.getItem(STORAGE_KEY)
            if (storedItems) {
                this.items = JSON.parse(storedItems)
            }
            this.saveItems()
        },
        saveItems(): void {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
        },
    }
});
