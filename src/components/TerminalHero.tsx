import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "help-row";
  text: string;
  helpCmd?: string;
  helpDesc?: string;
}

const SCRIPT_LINES = [
  { command: "whoami", output: "Daniel Santiago Silva Fonseca" },
  { command: "cat role.txt", output: "Backend Engineer" },
  { command: "cat stack.json | jq '.main'", output: '"Node.js, NestJS, TypeScript, Go"' },
  { command: "echo $CLOUD", output: "GCP · AWS · Docker" },
  { command: "cat passion.md", output: "AI integration · Chatbots · LLM · Automation" },
];

const HELP_ROWS: { cmd: string; desc: string }[] = [
  { cmd: "ls", desc: "List available portfolio sections" },
  { cmd: "cd <section>", desc: "Navigate to a section (e.g., cd about)" },
  { cmd: "cat about.md", desc: "Show a brief summary" },
  { cmd: "clear", desc: "Clear terminal output" },
  { cmd: "init", desc: "Replay the welcome animation" },
  { cmd: "help", desc: "Show this message" },
];

const SECTIONS = ["about", "experience", "projects", "skills", "education", "contact"];

const DEFAULT_ABOUT_TEXT = [
  "# about.md",
  "",
  "Backend Engineer con experiencia en el diseño y",
  "desarrollo de soluciones backend escalables, APIs",
  "RESTful y arquitecturas de microservicios.",
  "",
  "Especializado en Node.js, NestJS, TypeScript y",
  "ecosistemas cloud (GCP, AWS). Apasionado por la",
  "integración de IA en productos reales.",
  "",
  "Ubicación: Sogamoso, Colombia",
  "Disponible para trabajo remoto",
];

const PROMPT_PREFIX = "daniel@portfolio ~ % ";

interface Props {
  lang?: string;
  ctaLabel?: string;
  downloadLabel?: string;
  aboutText?: string;
}

export default function TerminalHero({ ctaLabel, downloadLabel, aboutText }: Props) {
  const aboutLines = aboutText ? aboutText.split("\n") : DEFAULT_ABOUT_TEXT;
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [showTypingOutput, setShowTypingOutput] = useState(false);
  const [typingOutputText, setTypingOutputText] = useState("");
  const [scriptIndex, setScriptIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [history, currentTyping, showTypingOutput, scrollToBottom]);

  // Typing animation sequence
  useEffect(() => {
    if (scriptIndex >= SCRIPT_LINES.length) {
      setAnimationDone(true);
      setTimeout(() => setShowButtons(true), 300);
      return;
    }

    const line = SCRIPT_LINES[scriptIndex];
    let charIdx = 0;
    setCurrentTyping("");
    setShowTypingOutput(false);
    setTypingOutputText("");

    const typeInterval = setInterval(() => {
      if (charIdx < line.command.length) {
        setCurrentTyping(line.command.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTypingOutputText(line.output);
          setShowTypingOutput(true);
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              { type: "command", text: line.command },
              { type: "output", text: line.output },
            ]);
            setCurrentTyping("");
            setShowTypingOutput(false);
            setTypingOutputText("");
            setScriptIndex((i) => i + 1);
          }, 400);
        }, 250);
      }
    }, 42);

    return () => clearInterval(typeInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptIndex, animationKey]);

  // Focus input when animation completes
  useEffect(() => {
    if (animationDone) inputRef.current?.focus();
  }, [animationDone]);

  const replayAnimation = () => {
    setHistory([]);
    setCurrentTyping("");
    setShowTypingOutput(false);
    setTypingOutputText("");
    setScriptIndex(0);
    setAnimationDone(false);
    setInputValue("");
    setAnimationKey((k) => k + 1);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: "command", text: cmd }];

    if (trimmed === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    }

    if (trimmed === "init") {
      replayAnimation();
      return;
    }

    if (trimmed === "help") {
      newLines.push({ type: "output", text: "Available commands:" });
      HELP_ROWS.forEach((r) =>
        newLines.push({
          type: "help-row",
          text: "",
          helpCmd: r.cmd,
          helpDesc: r.desc,
        })
      );
    } else if (trimmed === "ls") {
      newLines.push({ type: "output", text: SECTIONS.join("  ") });
    } else if (trimmed.startsWith("cd ")) {
      const target = trimmed.slice(3).trim();
      const section = SECTIONS.find((s) => s === target);
      if (section) {
        newLines.push({ type: "output", text: `Navigating to ${section}...` });
        setTimeout(() => {
          const el = document.getElementById(section);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        newLines.push({ type: "output", text: `cd: no such section: ${target}` });
        newLines.push({ type: "output", text: `Try: ${SECTIONS.join(", ")}` });
      }
    } else if (trimmed === "cat about.md") {
      aboutLines.forEach((l) => newLines.push({ type: "output", text: l }));
    } else if (trimmed === "") {
      // empty command
    } else {
      newLines.push({ type: "output", text: `command not found: ${trimmed}` });
      newLines.push({ type: "output", text: 'Type "help" for available commands.' });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const cursor = (
    <span
      className={`inline-block w-[8px] h-[18px] ml-0.5 align-middle transition-opacity duration-100 ${
        cursorVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "var(--color-terminal-cursor)" }}
    />
  );

  const renderLine = (line: TerminalLine, i: number) => {
    if (line.type === "command") {
      return (
        <div className="flex gap-2">
          <span className="terminal-prompt shrink-0">❯</span>
          <span className="terminal-cmd">{line.text}</span>
        </div>
      );
    }
    if (line.type === "help-row") {
      return (
        <div className="pl-3 flex" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="terminal-help-cmd shrink-0" style={{ width: "14ch", display: "inline-block" }}>
            {line.helpCmd}
          </span>
          <span className="terminal-output" style={{ opacity: 0.5, marginRight: "0.5rem" }}>-</span>
          <span className="terminal-output">{line.helpDesc}</span>
        </div>
      );
    }
    return <div className="terminal-output pl-5">{line.text}</div>;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal window */}
      <div className="terminal-window rounded-xl border overflow-hidden">
        {/* macOS title bar — adapts to theme */}
        <div className="terminal-frame flex items-center gap-2 px-4 py-3 border-b select-none">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-xs font-mono opacity-60">
            daniel@portfolio — zsh
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="p-4 font-mono text-sm leading-relaxed overflow-y-auto terminal-body"
          style={{ minHeight: "280px", maxHeight: "420px" }}
          onClick={() => animationDone && inputRef.current?.focus()}
        >
          {/* Rendered history */}
          <AnimatePresence>
            {history.map((line, i) => (
              <motion.div
                key={`h-${animationKey}-${i}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                {renderLine(line, i)}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Currently typing line (during animation) */}
          {!animationDone && scriptIndex < SCRIPT_LINES.length && (
            <div className="flex items-center gap-2">
              <span className="terminal-prompt shrink-0">❯</span>
              <span className="terminal-cmd flex items-center">
                {currentTyping}
                {!showTypingOutput && cursor}
              </span>
            </div>
          )}

          {/* Typing output reveal */}
          {!animationDone && showTypingOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="terminal-output pl-5"
            >
              {typingOutputText}
            </motion.div>
          )}

          {/* Interactive input (post-animation) */}
          {animationDone && (
            <div className="flex items-start gap-0 mt-1">
              <span className="terminal-prompt-full shrink-0 select-none">
                {PROMPT_PREFIX}
              </span>
              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none font-mono text-sm terminal-cmd caret-transparent"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
                {/* Custom cursor overlay */}
                <span
                  className="absolute top-0 left-0 pointer-events-none font-mono text-sm terminal-cmd whitespace-pre"
                  aria-hidden="true"
                >
                  {inputValue}
                  {cursor}
                </span>
              </div>
            </div>
          )}

          {/* Blinking cursor during animation end (brief moment) */}
          {!animationDone && scriptIndex >= SCRIPT_LINES.length && (
            <div className="flex items-center gap-2">
              <span className="terminal-prompt">❯</span>
              {cursor}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons — fade in after animation */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#experience"
              className="liquid-btn liquid-btn-primary rounded-full px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
              {ctaLabel || "Ver experiencia"}
            </a>
            <a
              href="https://github.com/DANIELSSF"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-btn liquid-btn-ghost rounded-full px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="/Daniel_Silva_CV.pdf"
              download
              className="liquid-btn liquid-btn-ghost rounded-full px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloadLabel || "Descargar CV"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
