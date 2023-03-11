import React, { useEffect, useState } from "react";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        console.log(data.data.user_data);
        if (response.ok) {
          setUserData({
            username: data.data.user_data.username,
            email: data.data.user_data.email
          });
          console.log(userData);
        } else throw new Error(data.error);
      } catch (error) {
        setUserError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async (username, email) => {
    try {
      console.log(username, email);
      const response = await fetch("/api/user/update/edit", {
        method: "PATCH",
        body: JSON.stringify({
          username,
          email
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        window.location.assign("/dashboard");
      } else throw new Error(data.error);
    } catch (error) {
      setUserError(error.message);
    }
  };

  const onChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    console.log(userData);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateUser(userData.username, userData.email);
  };

  return (
    <div className="relative flex flex-col justify-center h-[calc(100dvh-96px)] overflow-hidden">
      {!userData ? (
        <p className="text-4xl font-bold text-center dark:text-[#fdf8ad]">
          Loading...
        </p>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold">Account</h1>
          <form
            onSubmit={onSubmit}
            className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800"
          >
            <div className="mb-2 mt-0 text-center dark:text-[#fdf8ad]">
              <h2 className="text-2xl font-bold">User Profile</h2>
              <p>Edit your information</p>
            </div>

            <div className="mb-2 mt-4">
              <label
                for="username"
                className="block text-md font-semibold text-gray-800 dark:text-[#fdf8ad]"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                defaultValue={userData.username}
                onChange={onChange}
                required
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="email"
                className="block text-md font-semibold text-gray-800 dark:text-[#fdf8ad]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={userData.email}
                onChange={onChange}
                required
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6 max-w-sm mx-auto">
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-[#2a9d8f] rounded-md hover:bg-[#2d5564] focus:outline-none focus:bg-[#264653]"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
      {userError && <p>{userError}</p>}
    </div>
  );
};

export default Account;
