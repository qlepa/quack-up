"use client";

import { Persona, WorkMode } from "@/lib/types";
import { useChat } from "@/lib/hooks/useChat";
import { formatTimestamp } from "@/lib/utils";

interface ChatProps {
  selectedPersona: Persona;
  selectedWorkMode: WorkMode;
}

export default function Chat({ selectedPersona, selectedWorkMode }: ChatProps) {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    messagesEndRef,
    sendMessage,
  } = useChat();

  const handleSendMessage = () => {
    sendMessage(inputMessage, selectedPersona.id, selectedWorkMode.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Header - fixed height */}
      <div className="flex-shrink-0 p-6 border-b border-white/20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {selectedPersona.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                {selectedPersona.name}
              </h3>
              <p className="text-blue-100 text-sm">
                {selectedWorkMode.name} Mode
              </p>
            </div>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Messages Container - scrollable area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-white/30 min-h-0">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">
              Start a conversation with {selectedPersona.name}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Mode: {selectedWorkMode.name}
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`max-w-md lg:max-w-lg px-6 py-4 rounded-2xl shadow-lg ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-100"
              }`}
            >
              <p className="text-base leading-relaxed">{message.content}</p>
              <p
                className={`text-sm mt-3 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white border border-gray-100 text-gray-800 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-base font-medium">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - fixed height */}
      <div className="flex-shrink-0 p-6 border-t border-white/20 bg-white/50 backdrop-blur-sm">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400"
              rows={2}
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-medium flex items-center space-x-2"
          >
            <span>Send</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {/* Character count and status */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>{inputMessage.length}/1000</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Online</span>
          </span>
        </div>
      </div>
    </div>
  );
}
