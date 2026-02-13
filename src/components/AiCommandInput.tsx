import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { aiConversations } from "@/data/mockData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AiCommandInput = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || streaming) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setStreaming(true);

    // Simulate streaming response
    const match = aiConversations.find((c) =>
      userMsg.toLowerCase().includes("revenue") || userMsg.toLowerCase().includes("decline")
    );
    const fullResponse = match?.response || `**Analysis Complete**\n\nBased on current data across 2M customers and 150K SKUs, I've identified the key factors. The primary driver is a shift in channel mix—paid search efficiency has declined 8% while organic sessions grew 12%. Recommend rebalancing budget allocation and monitoring the trend over the next 2 weeks.\n\n**Confidence:** 86%`;

    let i = 0;
    const interval = setInterval(() => {
      i += Math.floor(Math.random() * 4) + 2;
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
    }, 15);
  };

  return (
    <div className="glass-card flex flex-col h-full">
      <div className="px-5 pt-4 pb-2 border-b border-border/50">
        <h3 className="text-sm font-semibold text-foreground">AI Command Center</h3>
        <p className="text-[10px] text-muted-foreground mt-0.5">Ask anything about your commerce data</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[320px]">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">🧠</div>
            <p className="text-xs text-muted-foreground">Try: "Why did revenue decline last month?"</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`text-xs leading-relaxed ${msg.role === "user" ? "text-right" : ""}`}>
            {msg.role === "user" ? (
              <span className="inline-block bg-primary/10 text-primary px-3 py-2 rounded-lg max-w-[85%]">
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
            placeholder="Ask about revenue, customers, channels..."
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
