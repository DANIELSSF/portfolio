import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { prompt: "~", command: "whoami", output: "Daniel Santiago Silva Fonseca" },
  { prompt: "~", command: "cat role.txt", output: "Full Stack Engineer" },
  {
    prompt: "~",
    command: "cat stack.json | jq '.main'",
    output: '"Node.js, NestJS, TypeScript, Go"',
  },
  {
    prompt: "~",
    command: "echo $CLOUD",
    output: "GCP · AWS · Docker",
  },
  {
    prompt: "~",
    command: "cat passion.md",
    output: "AI integration · Chatbots · LLM · Automation",
  },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleLines >= lines.length) return;

    const line = lines[visibleLines];
    let charIndex = 0;
    setCurrentText("");
    setShowOutput(false);

    const typeInterval = setInterval(() => {
      if (charIndex < line.command.length) {
        setCurrentText(line.command.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setVisibleLines((v) => v + 1);
          }, 400);
        }, 300);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl border border-border bg-surface-elevated backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-tag">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-xs text-text-accent-soft font-mono">
            daniel@portfolio — zsh
          </span>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm leading-relaxed min-h-[260px] bg-[#1a1b26] text-slate-300">
          <AnimatePresence>
            {lines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                <div className="flex gap-2">
                  <span className="text-emerald-400">❯</span>
                  <span className="text-slate-300">{line.command}</span>
                </div>
                <div className="pl-5 text-emerald-400/80">{line.output}</div>
              </motion.div>
            ))}
          </AnimatePresence>

        {/* Currently typing line */}
        {visibleLines < lines.length && (
          <div className="mb-2 flex items-center gap-2">
            <span className="text-emerald-400">❯</span>
            <span className="text-slate-300 flex items-center">
              {currentText}
              <span
                className={`inline-block w-[10px] h-[16px] ml-1 bg-slate-300 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </div>
        )}
        {visibleLines < lines.length && showOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pl-5 text-emerald-400/80 mb-2"
          >
            {lines[visibleLines].output}
          </motion.div>
        )}

          {/* Final cursor */}
          {visibleLines >= lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-emerald-400">❯</span>
              <span
                className={`inline-block w-[10px] h-[16px] ml-1 bg-slate-300 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
