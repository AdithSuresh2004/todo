import { apiSlice } from "./apiSlice";
import { setTasks, addTask, removeTask, updateTask } from "../taskSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (todoId) => ({
        url: `/tasks?todoId=${todoId}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setTasks(response.data.tasks));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    createTask: builder.mutation({
      query: ({ body, todoId, completed }) => ({
        url: "/tasks",
        method: "POST",
        body: { body, completed, todoId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(addTask(response.data.task));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeTask(arg));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({taskId, updatedTask}) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: updatedTask,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(updateTask(response.data.task));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApiSlice;
