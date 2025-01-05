import { useContext, useState } from "react";

import { FaClockRotateLeft, FaRegCircleQuestion } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import { HiPlus } from "react-icons/hi2";
import { FiMessageSquare } from "react-icons/fi";
import { Context } from "../context/Context";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompts, newChat, isMenuOpen } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`${
        isMenuOpen ? "inline-flex" : "hidden"
      }  md:inline-flex sidebar min-h-screen flex-col justify-between bg-[#f0f4f9] dark:bg-[#182636] dark:border-r dark:border-[#283b56] py-[25px] px-[15px] `}
      style={{
        minWidth: extended && "200px",
      }}
    >
      <div>
        <div className="block">
          <div
            onClick={() => setExtended((prev) => !prev)}
            className="rounded-full   inline-flex p-2 cursor-pointer dark:hover:bg-[#2c3b55] hover:bg-gray-300 border border-transparent dark:hover:border-[#2c3b55] dark:text-[#e6eaf1] active:bg-gray-200 dark:active:bg-[#374968] "
          >
            <MdOutlineMenu size={25} />
          </div>
        </div>

        <div
          onClick={newChat}
          className={`mt-[50px]  inline-flex items-center gap-[10px] py-[10px] px-[15px] rounded-[50px] text-[14px] text-gray-500 cursor-pointer dark:bg-[#26364b] bg-[#e6eaf1] select-none dark:text-[#f0f4f9] dark:hover:bg-[#30435d]  transition-all duration-300 `}
          style={{
            padding: !extended && "11px",
          }}
        >
          <div className="plus">
            <HiPlus size={25} />
          </div>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          // TODO: Add animation

          <div className="flex flex-col ">
            <p className="mt-[30px]  dark:text-[#e1ecffc1]  pl-1 select-none">
              Recent
            </p>
            <hr className="mb-[20px] bg-[#c4daff4c] border-none h-[1px] mt-3 " />

            {prevPrompts.map((prev, index) => (
              <div
                className="inline-flex items-center gap-2 resentEntry"
                key={index}
                onClick={() => loadPrompt(prev)}
              >
                <span className="dark:text-[#72869f] ">
                  <FiMessageSquare
                    size={20}
                    className="w-[22px] text-[1.2rem] "
                  />
                </span>
                <p className="text-[17px] dark:text-[#72869f] ">
                  {prev.slice(0, 18)} ...
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col ">
        {bottomItems.map((item, index) => (
          <div
            key={index}
            className={`bottomItem  recentEntry ${
              !extended &&
              "flex  items-center h-11 w-11 rounded-full justify-center group"
            }`}
          >
            <span>{item.icon}</span>
            <p className={`inline-block ${!extended && "hidden"}`}>
              {item.label}
            </p>

            {/*  tooltips  */}
            <div className=" group-hover:opacity-100 group-hover:left-[100px] transition-all duration-300 ease-in-out  opacity-0 absolute left-[80px] text-left flex items-start justify-start text-sm py-1 px-2 rounded-tr-lg rounded-br-lg bg-[#182636] shadow-lg    before:absolute before:content-[''] before:h-5 rounded-md before:w-5 before:bg-[#182636] before:-left-1.5 before:rotate-45 z-10 before:-z-10 before:top-1/2 before:-translate-y-1/2 pointer-events-none">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const bottomItems = [
  {
    label: "Help",
    icon: <FaRegCircleQuestion />,
  },
  {
    label: "Activity",
    icon: <FaClockRotateLeft size={15.5} />,
  },
  {
    label: "Settings",
    icon: <LuSettings />,
  },
];

export default Sidebar;
