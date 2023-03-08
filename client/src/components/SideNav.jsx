import { useState } from "react";
import control from "../assets/control.png";

import {AiOutlineDashboard, AiOutlineCalendar, AiOutlineSearch, AiOutlineLineChart, AiOutlineSetting} from "react-icons/ai"
import {BiChat, BiUser, BiFile} from "react-icons/bi"
const SideNav = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: <AiOutlineDashboard size={24}/> },
    { title: "Inbox", src: <BiChat size={24}/> },
    { title: "Accounts", src: <BiUser size={24}/>, gap: true },
    { title: "Schedule ", src: <AiOutlineCalendar size={24}/> },
    { title: "Search", src: <AiOutlineSearch size={24}/> },
    { title: "Analytics", src: <AiOutlineLineChart size={24}/> },
    { title: "Files ", src: <BiFile size={24}/>, gap: true },
    { title: "Setting", src: <AiOutlineSetting size={24}/> },
  ];

  return (
    <>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-500 h-screen p-5  pt-8 relative duration-300`}
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
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
               {Menu.src}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default SideNav;