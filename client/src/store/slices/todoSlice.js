import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTodos, setTasks } = todoSlice.actions;

export default todoSlice.reducer;
