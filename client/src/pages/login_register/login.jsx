import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const userLoggedIn = Auth.loggedIn();

    if (userLoggedIn) {
      window.location.assign("/dashboard");
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        Auth.login(data.token);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
      setLoginError(error.message);
    }
  };

  const onChange = (event) => {
    setLoginError(null);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser(formData.email, formData.password);
  };

  return (
    <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#eae2b7] rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center underline dark:text-[#fdf8ad]">
          Login
        </h1>
        <form onSubmit={onSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 bg-[#e4e2d8] dark:bg-gray-700 dark:text-slate-200 border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 bg-[#e4e2d8] dark:bg-gray-700 border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            to="/forgot_pass"
            className="text-xs text-blue-400 hover:text-blue-700 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-[#2a9d8f] rounded-md hover:bg-[#2d5564] focus:outline-none focus:bg-[#264653]"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700 dark:text-[#fdf8ad]">
          {" "}
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-blue-400 hover:text-blue-700 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {loginError && (
          <p className="text-center mt-4 font-bold text-red-600">
            {loginError}
          </p>
        )}
      </div>
    </div>
  );
}
