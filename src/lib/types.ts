export interface Persona {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar?: string;
}

export interface WorkMode {
  id: string;
  name: string;
  description: string;
  instructions: string;
  maxTokens?: number;
  temperature?: number;
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

export interface ChatHistory {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ApiRequest {
  persona: string;
  func: string;
  message: string;
  history: ChatHistory[];
}

export interface ApiResponse {
  message: string;
  error?: string;
}
