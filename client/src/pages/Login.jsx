import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/slices/api/authApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const isAuthenicated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenicated) {
      navigate("/");
    }
  });

  const validateForm = (username, password) => {
    if (!username || !password) {
      toast.error("All Fields are required.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm(username, password)) {
      try {
        const response = await login({ username, password });

        if (response.error) {
          toast.error(response.error.data.error);
        } else {
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleLogin(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="h-[calc(95vh-2rem)] flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3 mx-5">
        <h1 className="text-4xl font-medium text-stone-700 mb-6">Login</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mb-4 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:text-blue-500">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
