import { create } from 'zustand';
import { Todo } from './models/Todo.ts';
import { Categories } from './models/Categories.ts';

interface State {
  todos: Todo[];
  sortingMethod: string;
}

interface Actions {
  addTodos: (newTodos: Todo[]) => void;
  setTodos: (newTodos: Todo[]) => void;
  updateTitle: (todo: Todo, newTitle: string) => void;
  updateDate: (todo: Todo, newDate: string) => void;
  updateStatus: (todo: Todo, newStatus: boolean) => void;
  updateSortingMethod: (newSortingMethod: string) => void;
}

interface Deleting {
  deleteTodo: (todo: Todo) => void;
  deleteAllTodo: () => void;
}

export const useTodoStorage = create<State & Actions & Deleting>((set) => ({
  todos: [],
  todosTemporer: [],
  setTodos: (newTodos) => {
    set(() => ({ todos: [...newTodos] }));
  },
  addTodos: (newTodos) => {
    set((state) => ({ todos: [...state.todos, ...newTodos] }));
  },
  updateTitle: (todo, newTitle) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        todo.id === t.id ? { ...t, title: newTitle } : t,
      ),
    }));
  },
  updateDate: (todo, newDate) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        todo.id === t.id ? { ...t, due_date: new Date(newDate) } : t,
      ),
    }));
  },
  updateStatus: (todo: Todo, newStatus: boolean) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        todo.id === t.id ? { ...t, done: newStatus } : t,
      ),
    }));
  },
  deleteAllTodo: () => {
    set(() => ({ todos: [] }));
  },
  deleteTodo: (todo: Todo) => {
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== todo.id),
    }));
  },
  sortingMethod: '',
  updateSortingMethod: (newSortingMethod: string) => {
    set(() => ({ sortingMethod: newSortingMethod }));
  },
}));

interface StateCategories {
  categories: Categories[];
}
interface ActionCategories {
  addCategories: (newCategories: Categories[]) => void;
  setCategories: (newCategories: Categories[]) => void;
}
interface DeletingCategories {
  deleteCategories: (categorie: Categories) => void;
  deleteAllCategories: () => void;
}

export const useCategoriesStorage = create<
  StateCategories & DeletingCategories & ActionCategories
>((set) => ({
  categories: [],
  setCategories: (newCategories) => {
    set(() => ({ categories: [...newCategories] }));
  },
  addCategories: (newCategories) => {
    set((state) => ({ categories: [...state.categories, ...newCategories] }));
  },
  deleteAllCategories: () => {
    set(() => ({ categories: [] }));
  },
  deleteCategories: (categorie: Categories) => {
    set((state) => ({
      categories: state.categories.filter((t) => t.id !== categorie.id),
    }));
  },
}));
