import { apiSlice } from "./apiSlice";
import { setTodos, removeTodo, addTodo, updateTodo } from "../todoSlice";
import { logOut } from "../authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setTodos(response.data.todos));
        } catch (err) {
          console.error(err);
          dispatch(logOut());
        }
      },
    }),
    createTodo: builder.mutation({
      query: (title) => ({
        url: "/todos",
        method: "POST",
        body: { title },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(addTodo(response.data.todo));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeTodo(arg));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    updateTodo: builder.mutation({
      query: ({ todoId, title }) => ({
        url: `/todos/${todoId}`,
        method: "PUT",
        body: { title },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(updateTodo(response.data.todo));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = authApiSlice;
