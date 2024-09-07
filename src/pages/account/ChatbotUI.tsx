import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import chatbot from "../../assets/images/chatbot.png";
import { GEMINI_API_KEY } from "../../config/constants";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatbotUI = () => {
  const [prompt, setPrompt] = useState("Tell me more about sports.");
  const [response, setResponse] = useState("AI is thinking...");

  const sendPrompt = () => {
    AskGemini(prompt);
  };

  const AskGemini = async (prompt) => {
    console.log("Ask Gemini function called", prompt);

    // Reset response to show loading message
    setResponse("AI is thinking...");

    try {
      // Prepare query with user preferences

      // Stream the AI response
      const updatedprompt = `Imagine you are an assistant for a sports news and articles dashboard application. 
      Your job is to provide concise  information about the sports, 
      relevant summary or key points in 50 words or less based on.${prompt}`;
      const result = await model.generateContentStream(updatedprompt);

      let newResponse = ""; // Temporary variable to accumulate response
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        newResponse += chunkText; // Append new text
        setResponse(newResponse.trim());
        setPrompt(""); // Clear the prompt after sending
      }
    } catch (error) {
      console.error("Error fetching response from AI:", error);
      setResponse("Error fetching response from AI.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-blue-200 text-slate-700">
        <h1 className="text-xl font-bold">ChatBot</h1>
        <img src={chatbot} alt="Send" className="h-8 w-8" />
      </div>

      {/* Chat Messages Area */}
      <div className="flex flex-col flex-grow p-4 overflow-auto bg-white space-y-4">
        {/* Example Messages */}
        <div className="self-start bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
          Hello! How can I help you today?
        </div>
        <div className="self-end bg-blue-500 text-white p-3 rounded-lg max-w-xs">
          {prompt}
        </div>
        <div className="self-start bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
          {response}
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="flex items-center p-4 bg-gray-200">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 mr-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendPrompt()}
        />
        <button
          onClick={sendPrompt}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotUI;
