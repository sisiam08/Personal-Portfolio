"use client";

import { useEffect, useState, useRef } from "react";

interface HeroCodeAnimationProps {
  name: string;
  bio: string;
}

type TokenType = "tag" | "attr" | "value" | "text" | "punct" | "plain" | "nameText";

interface Token {
  text: string;
  type: TokenType;
}

// Each line is an array of tokens — makes line-number rendering trivial
function buildLines(name: string, bio: string): Token[][] {
  return [
    [
      { text: "<", type: "punct" },
      { text: "section", type: "tag" },
      { text: " ", type: "plain" },
      { text: "class", type: "attr" },
      { text: "=", type: "punct" },
      { text: '"hero"', type: "value" },
      { text: ">", type: "punct" },
    ],
    [
      { text: "  ", type: "plain" },
      { text: "<", type: "punct" },
      { text: "h1", type: "tag" },
      { text: ">", type: "punct" },
      { text: name, type: "nameText" },
      { text: "</", type: "punct" },
      { text: "h1", type: "tag" },
      { text: ">", type: "punct" },
    ],
    [
      { text: "  ", type: "plain" },
      { text: "<", type: "punct" },
      { text: "p", type: "tag" },
      { text: ">", type: "punct" },
      { text: bio, type: "text" },
      { text: "</", type: "punct" },
      { text: "p", type: "tag" },
      { text: ">", type: "punct" },
    ],
    [
      { text: "</", type: "punct" },
      { text: "section", type: "tag" },
      { text: ">", type: "punct" },
    ],
  ];
}

const STYLE_MAP: Record<TokenType, { cls: string; shadow: string }> = {
  tag: { cls: "text-[#4a8c57]", shadow: "none" }, // dark muted green
  attr: { cls: "text-[#ffab70]", shadow: "0 0 10px rgba(255,171,112,0.45)" }, // orange
  value: { cls: "text-[#a5d6ff]", shadow: "0 0 10px rgba(165,214,255,0.4)" }, // light blue
  nameText: { cls: "text-[#a5d6ff] font-bold", shadow: "0 0 6px rgba(165,214,255,0.4)" }, // highlighted string values
  text: { cls: "text-[#8d96a0]", shadow: "none" }, // muted slate
  punct: { cls: "text-[#8b949e]", shadow: "none" }, // muted grey
  plain: { cls: "text-transparent", shadow: "none" },
};

interface FlatChar {
  char: string;
  type: TokenType;
  lineIndex: number;
}

interface HeroCodeAnimationProps {
  name: string;
  bio: string;
  onComplete?: () => void;
}

export default function HeroCodeAnimation({
  name,
  bio,
  onComplete,
}: HeroCodeAnimationProps) {
  const lines = buildLines(name, bio);

  // Flatten all chars while keeping track of which line each belongs to
  const allChars: FlatChar[] = lines.flatMap((lineTokens, lineIndex) =>
    lineTokens.flatMap((token) =>
      token.text
        .split("")
        .map((char) => ({ char, type: token.type, lineIndex })),
    ),
  );

  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setVisibleCount(indexRef.current);
        if (indexRef.current >= allChars.length) {
          clearInterval(interval);
          setDone(true);
          if (onComplete) onComplete();
        }
      }, 65);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(startTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine which line the cursor is currently on
  const activeLine = done
    ? lines.length - 1
    : (allChars[Math.max(0, visibleCount - 1)]?.lineIndex ?? 0);

  // Build per-line rendered segments from visible chars
  type Segment = { text: string; type: TokenType };
  const renderedLines: Segment[][] = lines.map(() => []);

  for (const { char, type, lineIndex } of allChars.slice(0, visibleCount)) {
    const lineSegs = renderedLines[lineIndex];
    if (lineSegs.length > 0 && lineSegs[lineSegs.length - 1].type === type) {
      lineSegs[lineSegs.length - 1].text += char;
    } else {
      lineSegs.push({ text: char, type });
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div className="px-0 py-5">
        {lines.map((_, lineIndex) => {
          const segs = renderedLines[lineIndex];
          const isActive = lineIndex === activeLine;
          const lineNumber = lineIndex + 1;

          return (
            <div
              key={lineIndex}
              className="flex items-start leading-[1.85] transition-colors duration-200"
              style={{
                background: isActive ? "rgba(192,193,255,0.04)" : "transparent",
                borderLeft: isActive
                  ? "2px solid rgba(192,193,255,0.5)"
                  : "2px solid transparent",
              }}
            >
              {/* Line number */}
              <span
                className="select-none text-right font-mono shrink-0 px-4"
                style={{
                  color: isActive
                    ? "rgba(192,193,255,0.6)"
                    : "rgba(255,255,255,0.18)",
                  fontSize: "0.9rem",
                  minWidth: "2.5rem",
                  paddingTop: "0",
                  lineHeight: "1.7",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {lineNumber}
              </span>

              {/* Divider */}
              <span
                className="shrink-0 self-stretch"
                style={{
                  width: "1px",
                  background: "rgba(255,255,255,0.06)",
                  marginRight: "1rem",
                }}
              />

              {/* Code content */}
              <pre
                className="font-mono whitespace-pre-wrap break-words flex-1 pr-4"
                style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
              >
                {segs.map((seg, i) => (
                  <span
                    key={i}
                    className={STYLE_MAP[seg.type].cls}
                    style={{ textShadow: STYLE_MAP[seg.type].shadow }}
                  >
                    {seg.type === "plain"
                      ? "\u00A0".repeat(seg.text.length)
                      : seg.text}
                  </span>
                ))}

                {/* Cursor on the active line, after all typed chars */}
                {segs.length > 0 && isActive && (
                  <span
                    className="inline-block w-[2.5px] h-[1.1em] bg-[#c0c1ff] align-middle ml-[1px] animate-blink-cursor"
                    style={{ boxShadow: "0 0 8px rgba(192,193,255,0.9)" }}
                  />
                )}

                {/* Empty line still shows cursor */}
                {segs.length === 0 && isActive && (
                  <span
                    className="inline-block w-[2.5px] h-[1.1em] bg-[#c0c1ff] align-middle animate-blink-cursor"
                    style={{ boxShadow: "0 0 8px rgba(192,193,255,0.9)" }}
                  />
                )}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
