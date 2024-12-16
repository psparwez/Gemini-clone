import { useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import { Context } from "../context/Context";

const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(Context);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`flex items-center justify-between text-[22px] p-[20px] text-[#585858] `}
    >
      <p className="dark:text-[#dbe7ff] font-Syne font-medium tracking-wide select-none ">
        Gemini
      </p>
      <div className="w-10 mr-3 md:mr-0 ml-auto h-10 rounded-full flex items-center justify-center bg-[#1826360c] dark:bg-[#182636] text-[#182636] relative cursor-pointer dark:text-[#c7d6f0d2] ">
        <FaCircleUser />
      </div>

      <button
        onClick={handleMenuToggle}
        className="flex items-center justify-center w-10 h-10 text-2xl text-blue-100 transition-all duration-300 rounded-full cursor-pointer md:hidden active:bg-[#213347] hover:text-[#cee5ff] border border-[#c6e0ff0a] bg-[#182636]"
      >
        <MdOutlineMenu />
      </button>
    </div>
  );
};

export default Navbar;
