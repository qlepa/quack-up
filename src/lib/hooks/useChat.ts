import { useState, useRef, useEffect } from 'react';
import { Message, ChatHistory } from '../types';
import { API_CONFIG } from '../../config/constants';
import { generateId, formatTimestamp, isValidMessage } from '../utils';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (
    message: string,
    personaId: string,
    workModeId: string
  ) => {
    if (!isValidMessage(message) || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Filtruj tylko wiadomości użytkownika i asystenta (bez systemowych)
      // i upewnij się, że role są poprawnie mapowane
      const history: ChatHistory[] = messages
        .filter(m => m.role === "user" || m.role === "assistant")
        .map((m) => ({ 
          role: m.role === "user" ? "user" : "assistant", 
          content: m.content 
        }));

      console.log('=== CLIENT DEBUG ===');
      console.log('Sending message:', message);
      console.log('Persona ID:', personaId);
      console.log('Work Mode ID:', workModeId);
      console.log('History length:', history.length);
      console.log('History:', history.map(h => ({ role: h.role, content: h.content.substring(0, 50) + '...' })));

      const response = await fetch(API_CONFIG.endpoints.think, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          persona: personaId,
          func: workModeId,
          history,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: generateId(),
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: generateId(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    messagesEndRef,
    sendMessage,
    clearMessages,
  };
}
