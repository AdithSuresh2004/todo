import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import { useSendLogoutMutation } from "../store/slices/api/authApiSlice";
import { useGetTodosQuery } from "../store/slices/api/todoApiSlice";
import Loader from "./Loader";

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logout] = useSendLogoutMutation();
  const { refetch: refetchTodos, isLoading } = useGetTodosQuery();

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      refetchTodos();
    }
  }, [isAuthenticated, refetchTodos]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="h-16 bg-white shadow-md flex items-center p-5">
      <Link to="/" className="flex items-center">
        <img
          src="https://cdn-icons-png.freepik.com/256/11207/11207691.png"
          alt="logo"
          draggable={false}
          className="h-11 w-11"
        />
        <h1 className="ml-2 font-bold text-2xl text-blue-600 hover:text-blue-700 drop-shadow-md">
          ToDo
        </h1>
      </Link>
      <div className="ml-auto">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="bg-blue-500 text-white text-lg p-2 rounded-md cursor-pointer drop-shadow-md hover:bg-blue-600">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="text-blue-500 text-lg p-2 ml-2 rounded-md cursor-pointer drop-shadow-md hover:text-blue-600">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div onClick={handleLogout}>
            <button className="bg-blue-500 text-white text-lg p-2 rounded-md cursor-pointer drop-shadow-md hover:bg-blue-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
