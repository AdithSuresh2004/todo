import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeOpen from "../assets/eyeopen.svg";
import EyeClose from "../assets/eyeclose.svg";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../store/slices/api/authApiSlice";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const isAuthenicated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenicated) {
      navigate("/");
    }
  });

  const validateForm = (username, password, confirmPassword) => {
    if (!username || !password || !confirmPassword) {
      toast.error("All Fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords must match.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm(username, password, confirmPassword)) {
      try {
        const response = await register({ username, password });

        if (response.error) {
          toast.error(response.error.data.error);
        } else {
          toast.success("Account created succesfully.");
          navigate("/login");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleRegister(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="h-[calc(92vh-2rem)] flex items-center justify-center">
      <form className="bg-white w-full md:w-[50%] mx-5 h-fit rounded-md p-5">
        <h1 className="text-4xl font-medium text-stone-700 mb-6">Register</h1>
        <div className="mb-6">
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
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute top-2 right-3"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? (
                <img src={EyeOpen} alt="showpassword" className="h-5 w-5" />
              ) : (
                <img src={EyeClose} alt="textpassword" className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mb-4 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleRegister}
          >
            Sign In
          </button>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-500">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
