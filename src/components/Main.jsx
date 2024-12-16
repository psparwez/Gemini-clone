import { useContext } from "react";

import { FaCircleUser } from "react-icons/fa6";
import { Context } from "../context/Context";

import geminiImage from "../assets/gemini_icon.png";
import Navbar from "./Navbar";
import Cards from "./Cards";
import SearchBox from "./SearchBox";

const Main = () => {
  const { recentPrompt, showResult, loading, resultData } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative  ">
      <Navbar />
      <div className="max-w-[900px] m-auto ">
        {!showResult ? (
          <>
            <div className="mb-5 mt-5 text-5xl  sm:text-[56px] text-[#c4c7c5] font-[500] p-[20px] px-4 md:px-0">
              <p>
                <span className="gradientText font-Syne">Hello, Dev.</span>
              </p>
              <p className="text-5xl font-Syne">How can I help you today?</p>
            </div>

            <Cards />
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll chatScroll ">
            <div className="py-[40px] px-0 flex items-center gap-[20px] dark:text-[#98b4d3] ">
              <span>
                <FaCircleUser className="w-10 text-2xl " />
              </span>
              <p>{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-[20px] dark:text-[#98b4d3] ">
              <img src={geminiImage} className="w-10" alt="Gemini image" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  className="text-[17px] font-light leading-[1.7] "
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </div>
        )}

        <SearchBox />
      </div>
    </div>
  );
};

export default Main;
