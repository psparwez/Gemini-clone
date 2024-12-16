import { useContext, useState, useEffect, useRef } from "react";
import { MdMic } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";

const handleFileUpload = () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
};

const SearchBox = () => {
  const { onSent, setInput, input } = useContext(Context);

  // - handling recording
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  // Adjust the height of the textarea dynamically

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new recognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = input;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setInput(finalTranscript + interimTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    setSpeechRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, [setInput, input]);

  const handleMicClick = () => {
    if (!isRecording) {
      speechRecognition.start();
      setIsRecording(true);
    } else {
      speechRecognition.stop();
      setIsRecording(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input) {
      onSent(input);
      setInput("");
      if (isRecording) {
        speechRecognition.stop();
        setIsRecording(false);
      }
    }
  };

  return (
    <div className=" absolute -bottom-[100px] sm:bottom-0 w-full max-w-[900px] py-0 px-[20px] m-auto">
      <div
        className={`flex items-center justify-between gap-1 md:gap-[20px] bg-[#f0f4f9] py-[10px] px-[20px] focus-within:ring-gray-300 dark:bg-[#182636] transition-all duration-300 ring-1 ring-transparent dark:focus-within:ring-[#22364b] ${
          input.length > 100 ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <textarea
          ref={textareaRef}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none p-[8px] text-[18px] dark:text-[#98b5d3] md:min-h-11  chatScroll max-h-[100px] dark:placeholder:text-[#98b4d3a6] resize-none"
          placeholder="Enter a prompt here.."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          style={{ display: "none" }}
        />
        <div
          className={`${
            input.length > 70 && "self-end"
          } dark:text-[#c4c7c5] transition-all duration-300 flex items-center gap-1 md:gap-[15px]`}
        >
          <div
            onClick={handleFileUpload}
            className="cursor-pointer dark:text-[#738fab]"
          >
            <LuImagePlus size={23} className="dark:text-[#738fab]" />
          </div>
          <div className="dark:text-[#738fab]" onClick={handleMicClick}>
            <MdMic
              size={25}
              className={`dark:text-[#738fab] cursor-pointer ${
                isRecording ? "text-red-500" : ""
              }`}
            />
          </div>
          {input ? (
            <div
              className="dark:text-[#738fab] cursor-pointer"
              onClick={() => {
                onSent(input);
                setInput("");
                if (isRecording) {
                  speechRecognition.stop();
                  setIsRecording(false);
                }
              }}
            >
              <IoMdSend size={23} className="dark:text-[#738fab]" />
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-[13px] my-[15px] mx-auto text-center font-light text-gray-500 dark:text-[#98b4d37c]">
        Gemini may display inaccurate info, including about people, so double
        check its responses. Your privacy and Gemini Apps.
      </p>
    </div>
  );
};

export default SearchBox;
