import React, { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";
import Switcher from "./Switcher";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

function Nav() {
  const { getUserData, logout } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let user_data = getUserData();
    setUserData(user_data);
  }, []);

  async function logout_user() {
    logout();
  }

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-[#2a9d8f] dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmM8TZRdq1HY6C85NVNymKK8m6BqHBs0VkVRn2EVE&s"
                alt="Workflow"
              />
            </div>
            {userData ? (<span className="ml-4 dark:text-zinc-50">{userData.username}</span>) : false}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="dark:bg-gray-900 bg-[#264653] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mr-8">
              {userData ? (
                <>
                  <Link
                    to={"/dashboard"}
                    className="dark:hover:bg-gray-700 hover:bg-[#144b44] dark:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"/#"}
                    className="dark:text-white dark:hover:bg-gray-700 hover:bg-[#144b44] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Team
                  </Link>
                  <Link
                    to={"/upload_csv"}
                    className="dark:text-white dark:hover:bg-gray-700 hover:bg-[#144b44] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Upload CSV
                  </Link>

                  <Link
                    onClick={logout_user}
                    to={"/"}
                    className="dark:text-white dark:hover:bg-gray-700 hover:bg-[#144b44] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="dark:text-white dark:hover:bg-gray-700 hover:bg-[#144b44] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="dark:text-white dark:hover:bg-gray-700 hover:bg-[#144b44] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
            <Switcher />
          </div>
        )}
      </Transition>
    </nav>
  );
}

export default Nav;

// Compare it to whats in postgres db