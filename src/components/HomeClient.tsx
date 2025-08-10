"use client";

import { useState } from "react";
import { personas } from "../lib/personas";
import Chat from "./Chat";
import SwimmingDuck from "./SwimmingDuck";

export default function HomeClient() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  if (selectedPersona) {
    const persona = personas.find((p) => p.id === selectedPersona);

    if (persona) {
      return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 p-4 bg-white border-b">
            <button
              onClick={() => setSelectedPersona(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to selection
            </button>
          </div>
          <div className="flex-1">
            <Chat
              selectedPersona={persona}
              selectedWorkMode={{
                id: "none",
                name: "Standard",
                description: "",
                instructions: "",
              }}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="h-full flex flex-col items-center justify-center p-8">
        <SwimmingDuck />

        <div className="space-y-4 mt-8">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all"
              onClick={() => setSelectedPersona(persona.id)}
            >
              <h3 className="font-medium text-gray-900 mb-2">{persona.name}</h3>
              <p className="text-gray-600 text-sm">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
