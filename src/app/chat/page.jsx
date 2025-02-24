"use client";
import { useState, useRef } from "react";
import axios from "axios";
import { FiPaperclip, FiSend, FiX } from "react-icons/fi";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5000000) {
        setError("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !file) return;
    
    setLoading(true);
    setResponse("");

    const formData = new FormData();
    formData.append("message", message);
    if (file) formData.append("file", file);

    try {
      const { data } = await axios.post("https://your-backend-api.com/chat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "stream",
      });

      const reader = data.getReader();
      let resultText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        resultText += chunk;
        setResponse((prev) => prev + chunk);
      }

      setMessage("");
      setFile(null);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        {error && (
          <div className="text-red-500 text-sm mb-2 flex items-center justify-center">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-2 hover:text-red-400"
            >
              <FiX />
            </button>
          </div>
        )}

        {file && (
          <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-md mb-2 max-w-xs mx-auto">
            <FiPaperclip className="text-gray-300" />
            <span className="text-gray-200 text-sm truncate">
              {file.name}
            </span>
            <button
              onClick={() => setFile(null)}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Remove file"
            >
              <FiX />
            </button>
          </div>
        )}

        <div className="flex mt-32 items-center gap-2 bg-gray-900 p-4 rounded-lg">
          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[50px] max-h-[200px]"
              rows="1"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
              title="Attach file"
            >
              <FiPaperclip size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={loading || (!message.trim() && !file)}
            className={`p-3 rounded-full ${message.trim() || file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700"} transition-colors`}
            title="Send message"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiSend size={20} className={`${message.trim() || file ? "text-white" : "text-gray-300"}`} />
            )}
          </button>
        </div>

        {response && (
          <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg w-full max-w-2xl">
            <strong>Response:</strong>
            <p className="whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
