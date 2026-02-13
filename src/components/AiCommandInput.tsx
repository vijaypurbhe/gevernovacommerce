import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { aiResponses } from "@/data/mockData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQueries = [
  "Why did revenue decline last month?",
  "Show me conversion funnel",
  "Which segments are most profitable?",
  "Optimize my marketing budget",
  "Show me inventory risks",
  "What's the customer health?",
];

function matchResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("revenue") || q.includes("decline") || q.includes("drop")) return aiResponses.revenue;
  if (q.includes("segment") || q.includes("profitable") || q.includes("profitability")) return aiResponses.segment;
  if (q.includes("conversion") || q.includes("funnel") || q.includes("convert")) return aiResponses.conversion;
  if (q.includes("inventory") || q.includes("stock") || q.includes("sku")) return aiResponses.inventory;
  if (q.includes("customer") || q.includes("churn") || q.includes("retention") || q.includes("health")) return aiResponses.customer;
  if (q.includes("marketing") || q.includes("budget") || q.includes("roas") || q.includes("channel")) return aiResponses.marketing;
  return aiResponses.default;
}

const AiCommandInput = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => cleanupRef.current?.();
  }, []);

  const sendMessage = (text: string) => {
    if (streaming) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setStreaming(true);
    setInput("");

    const fullResponse = matchResponse(text);
    let i = 0;
    const interval = setInterval(() => {
      i += Math.floor(Math.random() * 6) + 3;
      if (i >= fullResponse.length) {
        i = fullResponse.length;
        clearInterval(interval);
        setStreaming(false);
      }
      const partial = fullResponse.slice(0, i);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, idx) => (idx === prev.length - 1 ? { ...m, content: partial } : m));
        }
        return [...prev, { role: "assistant", content: partial }];
      });
    }, 12);
    cleanupRef.current = () => clearInterval(interval);
  };

  const handleSend = () => {
    if (!input.trim() || streaming) return;
    sendMessage(input.trim());
  };

  return (
    <div className="glass-card flex flex-col h-full">
      <div className="px-5 pt-4 pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Command Center</h3>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Natural language queries across your entire commerce ecosystem</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[400px]">
        {messages.length === 0 && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <p className="text-xs text-muted-foreground mb-4">Ask anything about your commerce data</p>
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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about revenue, customers, channels, inventory..."
            className="flex-1 bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg border border-border/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={handleSend}
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
