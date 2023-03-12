import { useState, useContext, useEffect } from "react";
import control from "../assets/control.png";
import Switcher from "./Switcher";
import UserContext from "../context/UserContext";

import {
  AiOutlineDashboard,
  AiOutlineCalendar,
  AiOutlineSearch,
  AiOutlineLineChart,
  AiOutlineSetting
} from "react-icons/ai";
import { BiLogOut, BiUser, BiFile, BiLogIn, BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideNav = () => {
  const { getUserData, logout } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const Menus = [
    {
      title: "Dashboard",
      route: "/dashboard",
      src: <AiOutlineDashboard size={24} />
    },
    {
      title: "Account",
      route: "/account",
      src: <BiUser size={24} />,
      gap: true
    },
    {
      title: "Analytics",
      route: "/analytics",
      src: <AiOutlineLineChart size={24} />
    },
    {
      title: "Upload CSV",
      route: "/upload_csv",
      src: <BiFile size={24} />,
    }
  ];

  useEffect(() => {
    let user_data = getUserData();
    setUserData(user_data);
  }, []);

  async function logout_user() {
    logout();
  }

  return (
    <>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } dark:bg-gray-800 bg-[#2a9d8f] h-full p-5 pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmM8TZRdq1HY6C85NVNymKK8m6BqHBs0VkVRn2EVE&s"
            className={`cursor-pointer duration-500 rounded-full max-w-10 max-h-10 ${
              open && "rotate-[360deg] max-w-14 max-h-14"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {userData ? <span>{userData.username}</span> : <span>Hello</span>}
          </h1>
        </div>
        <ul className="pt-6">
          {userData ? (
            <>
              {Menus.map((Menu, index) => (
                <Link to={Menu.route}>
                  <li
                    key={index}
                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#144b44] hover:text-gray-200 dark:hover:text-gray-800 dark:hover:bg-gray-300 dark:text-gray-200 text-md items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                      index === 0 && "bg-light-white"
                    } `}
                  >
                    {Menu.src}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                  </li>
                </Link>
              ))}

              <li
                onClick={logout_user}
                className="flex mt-9 rounded-md p-2 cursor-pointer hover:bg-[#144b44] hover:text-gray-200 dark:hover:text-gray-800 dark:hover:bg-gray-300 dark:text-gray-200 text-md items-center gap-x-4 "
              >
                <BiLogOut size={24} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <li className="flex mt-9 rounded-md p-2 cursor-pointer hover:bg-[#144b44] hover:text-gray-200 dark:hover:text-gray-800 dark:hover:bg-gray-300 dark:text-gray-200 text-md items-center gap-x-4 ">
                  <BiLogIn size={24} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Login
                  </span>
                </li>
              </Link>
              <Link to={"/register"}>
                <li className="flex rounded-md p-2 cursor-pointer hover:bg-[#144b44] hover:text-gray-200 dark:hover:text-gray-800 dark:hover:bg-gray-300 dark:text-gray-200 text-md items-center gap-x-4 ">
                  <BiPencil size={24} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Register
                  </span>
                </li>
              </Link>
            </>
          )}
        </ul>
        <Switcher />
      </div>
    </>
  );
};
export default SideNav;
