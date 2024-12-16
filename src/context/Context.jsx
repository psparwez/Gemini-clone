import { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // - Utility function to display words with delay
  const delayPara = (text) => {
    const words = text.split(" ");
    words.forEach((word, index) => {
      setTimeout(() => {
        setResultData((prev) => prev + word + " ");
      }, 75 * index);
    });
  };

  // - Reset chat state
  const newChat = () => {
    setShowResult(false);
    setLoading(false);
    setResultData("");
    setInput("");
  };

  // - Handle sending prompt
  const onSent = async (prompt = input) => {
    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);

      // - Update prompt history
      setPrevPrompts((prev) => [...prev, prompt]);
      setRecentPrompt(prompt);

      const response = await run(prompt);

      const formattedResponse = formatResponse(response);
      delayPara(formattedResponse);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const formatResponse = (response) => {
    return response
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/^\s*title:\s*(.*)/gim, "<strong>$1</strong>")
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/^\*\s*(.*)/gm, "<br/>$1")
      .replace(/\n{2,}/g, "<br/>")
      .replace(/\n/g, "<br/>")
      .trim();
  };

  // - Context values
  const contextValue = {
    input,
    setInput,
    recentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
    newChat,
    isMenuOpen,
    setIsMenuOpen,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
