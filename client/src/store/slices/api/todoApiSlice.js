import { apiSlice } from "./apiSlice";
import { setTodos } from "../todoSlice";
import { logOut } from "../authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    todo: builder.query({
      query: () => ({
        url: "/todo",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setTodos(response.data));
        } catch (err) {
          console.error(err);
          dispatch(logOut());
        }
      },
    }),
    createTodo: builder.mutation({
      query: (title) => ({
        url: "/createtodo",
        method: "POST",
        body: { title: title },
      }),
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: "/deletetodo",
        method: "POST",
        body: { todoId: todoId },
      }),
    }),
  }),
});

export const { useTodoQuery, useCreateTodoMutation, useDeleteTodoMutation } =
  authApiSlice;
