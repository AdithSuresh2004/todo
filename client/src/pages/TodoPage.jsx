import { useTodo } from "../hooks/useTodo";
import Loader from "../components/Loader";
import CreateTodoModal from "../components/todos/modal/CreateTodoModal";
import DeleteTodoModal from "../components/todos/modal/DeleteTodoModal";
import UpdateTodoModal from "../components/todos/modal/UpdateTodoModal";
import TodoList from "../components/todos/TodoList";

const TodoPage = () => {
  const {
    todos,
    isLoading,
    createOpen,
    deleteOpen,
    updateOpen,
    selectedTodoId,
    handleCreateTodo,
    handleDelete,
    handleUpdate,
    handleCreateCancel,
    handleDeleteCancel,
    handleUpdateCancel,
    handleCreateSuccess,
    handleDeleteSuccess,
    handleUpdateSuccess,
    updateTodo,
    createTodo,
    deleteTodo,
  } = useTodo();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 min-h-[calc(92vh-3rem)]">
      <CreateTodoModal
        open={createOpen}
        handleCancel={handleCreateCancel}
        onCreateSuccess={handleCreateSuccess}
        createTodo={createTodo}
      />
      <DeleteTodoModal
        open={deleteOpen}
        handleCancel={handleDeleteCancel}
        todoId={selectedTodoId}
        onDeleteSuccess={handleDeleteSuccess}
        deleteTodo={deleteTodo}
      />
      <UpdateTodoModal
        open={updateOpen}
        handleCancel={handleUpdateCancel}
        todoId={selectedTodoId}
        onUpdateSuccess={handleUpdateSuccess}
        updateTodo={updateTodo}
      />
      <h1 className="text-3xl font-semibold mb-6">All Todos</h1>
      {todos.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-xl">No Todos Available</h1>
        </div>
      )}
      <TodoList todos={todos} onUpdateTodo={handleUpdate} onDeleteTodo={handleDelete} />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 fixed bottom-8 right-8 flex items-center justify-center text-2xl"
        onClick={handleCreateTodo}
      >
        +
      </button>
    </div>
  );
};

export default TodoPage;
