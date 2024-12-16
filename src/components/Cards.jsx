import { LiaCompassSolid } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { FiMessageSquare } from "react-icons/fi";
import { FaCode } from "react-icons/fa6";
import { useContext } from "react";
import { Context } from "../context/Context";

const cardItems = [
  {
    description: "Suggest beutiful places to see on an upcoming road trip.",
    icon: <LiaCompassSolid />,
  },
  {
    description: "Briefly summarize this concept: Urban Planning.",
    icon: <HiOutlineLightBulb />,
  },
  {
    description:
      "   If you could have dinner with any historical figure, who wouldit be and why?.",
    icon: <FiMessageSquare />,
  },
  {
    description: "Optimize the readability of the following code snippet.",
    icon: <FaCode />,
  },
];

const Cards = () => {
  const { setInput } = useContext(Context);

  return (
    <div className="cards">
      {cardItems.map((card, index) => (
        <div
          onClick={() => setInput(card.description)}
          className="w-full dark:bg-[#182636] dark:hover:bg-[#202e43]  dark:border dark:active:bg-[#182636] dark:border-[#273a51b4] hover:bg-[#dfe4ea]  h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer transition-all duration-300 select-none"
          key={index}
        >
          <p className="leading-[1.5] text-[17px] dark:text-[#738fab] ">
            {card.description}
          </p>
          <span className="bg-white w-[35px] p-[5px] absolute bottom-[15px]  flex items-center justify-center  dark:border cardIcon  right-[15px]  h-[35px] dark:shadow-[0px_0px_20px_rgba(0,0,0,0.1)] dark:bg-[#253a51]  dark:border-[#304764] dark:text-[#738fab]  rounded-[1rem_1rem_0px]">
            {card.icon}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Cards;
