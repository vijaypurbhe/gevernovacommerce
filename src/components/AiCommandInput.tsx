import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { aiResponses } from "@/data/mockData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQueries = [
  "How are equipment orders trending this quarter?",
  "What's the fleet health status?",
  "Show me the grid modernization pipeline",
  "Walk me through the supply chain risks",
  "How's the CSA renewal pipeline looking?",
  "Give me the executive briefing",
];

function matchResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("order") || q.includes("revenue") || q.includes("equipment") || q.includes("backlog")) return aiResponses.revenue;
  if (q.includes("fleet") || q.includes("turbine") || q.includes("health") || q.includes("outage") || q.includes("anomaly")) return aiResponses.fleet;
  if (q.includes("grid") || q.includes("ira") || q.includes("transformer") || q.includes("hvdc") || q.includes("electrification")) return aiResponses.grid;
  if (q.includes("supply") || q.includes("parts") || q.includes("inventory") || q.includes("chain") || q.includes("alloy")) return aiResponses.supply;
  if (q.includes("csa") || q.includes("renewal") || q.includes("service") || q.includes("retention") || q.includes("contract")) return aiResponses.services;
  return aiResponses.default;
}

// Simulate realistic typing with variable speed + pauses at paragraph breaks
function streamRealistic(
  text: string,
  onChunk: (partial: string) => void,
  onDone: () => void
) {
  let i = 0;
  let thinkingDone = false;

  const tick = () => {
    // Simulate initial "thinking" pause
    if (!thinkingDone && i === 0) {
      thinkingDone = true;
      setTimeout(tick, 400 + Math.random() * 600); // 400-1000ms thinking
      return;
    }

    // Variable chunk size — faster in middle of words, slower at punctuation
    const char = text[i] || "";
    let chunkSize = Math.floor(Math.random() * 5) + 2;

    // Slow down at paragraph breaks and sentence ends
    if (char === "\n" || char === "." || char === ":" || char === "|") {
      chunkSize = 1;
    }

    i += chunkSize;
    if (i >= text.length) {
      i = text.length;
      onChunk(text);
      onDone();
      return;
    }

    onChunk(text.slice(0, i));

    // Variable delay — faster normally, pauses at line breaks
    let delay = 8 + Math.random() * 12;
    if (text[i - 1] === "\n" && text[i] === "\n") delay = 80 + Math.random() * 120; // paragraph pause
    else if (text[i - 1] === "\n") delay = 30 + Math.random() * 50;
    else if (text[i - 1] === "." || text[i - 1] === ":") delay = 20 + Math.random() * 30;

    setTimeout(tick, delay);
  };

  tick();
}

const AiCommandInput = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (streaming) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setStreaming(true);
    setInput("");

    const fullResponse = matchResponse(text);

    streamRealistic(
      fullResponse,
      (partial) => {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, idx) => (idx === prev.length - 1 ? { ...m, content: partial } : m));
          }
          return [...prev, { role: "assistant", content: partial }];
        });
      },
      () => setStreaming(false)
    );
  };

  return (
    <div className="glass-card flex flex-col h-full">
      <div className="px-5 pt-4 pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Command Center</h3>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Natural language queries across GE Vernova's operational data</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[400px]">
        {messages.length === 0 && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-xs text-muted-foreground mb-4">Ask anything about GE Vernova operations</p>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {suggestedQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-[11px] px-3 py-2 rounded-lg bg-secondary/40 text-muted-foreground hover:bg-secondary/70 hover:text-foreground transition-colors border border-border/30"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`text-xs leading-relaxed ${msg.role === "user" ? "text-right" : ""}`}>
            {msg.role === "user" ? (
              <span className="inline-block bg-primary/10 text-primary px-3 py-2 rounded-lg max-w-[85%] text-left">
                {msg.content}
              </span>
            ) : (
              <div className="bg-secondary/50 rounded-lg p-3 whitespace-pre-wrap text-foreground">
                {msg.content}
                {streaming && i === messages.length - 1 && (
                  <span className="inline-block w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input.trim())}
            placeholder="Ask about orders, fleet, grid, supply chain..."
            className="flex-1 bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg border border-border/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={() => input.trim() && sendMessage(input.trim())}
            disabled={!input.trim() || streaming}
            className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiCommandInput;
