"use client";

export default function SwimmingDuck() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-4xl animate-bounce">🦆</span>
        <h1 className="text-5xl font-bold text-gray-800">Quack Up Buddy?</h1>
        <span
          className="text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🦆
        </span>
      </div>
      <p className="text-xl text-gray-600">Choose your AI companion</p>
    </div>
  );
}
