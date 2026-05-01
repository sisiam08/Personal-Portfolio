"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "Full Stack Developer",
  "Product Builder",
  "Scalable System Thinker",
  "Business-Oriented Developer",
];

export default function TypewriterRole({ startAnimation = true }: { startAnimation?: boolean }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    if (!startAnimation) return;

    let timer: NodeJS.Timeout;

    const handleType = () => {
      const i = loopNum % ROLES.length;
      const fullText = ROLES[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        timer = setTimeout(handleType, 400);
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, startAnimation]);

  return (
    <div 
      className={`flex items-center gap-3 text-xl md:text-2xl font-medium text-on-surface-variant mb-8 transition-opacity duration-1000 ${
        startAnimation ? "opacity-100" : "opacity-0"
      }`}
    >

  {/* Static */}
  <span className="text-on-surface-variant/70">I am a</span>

  {/* Animated */}
  <span className="relative font-bold tracking-wide">
    
    <span className="bg-gradient-to-r from-primary via-secondary to-primary-container bg-clip-text text-transparent animate-gradient-text">
      {text}
    </span>

    {/* Cursor */}
    <span className="ml-1 inline-block w-[2px] h-[1.2em] bg-primary animate-cursor-soft" />
  </span>

</div>
  );
}