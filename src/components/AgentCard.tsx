import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Send, MessageSquare, X } from "lucide-react";
import type { Agent, AgentStatus } from "@/data/mockData";
import { agentConversations } from "@/data/mockData";

const statusConfig: Record<AgentStatus, { label: string; dotClass: string; bgClass: string }> = {
  monitoring: { label: "Monitoring", dotClass: "bg-success", bgClass: "bg-success/10 text-success" },
  alert: { label: "Alert", dotClass: "bg-warning", bgClass: "bg-warning/10 text-warning" },
  acting: { label: "Acting", dotClass: "bg-primary", bgClass: "bg-primary/10 text-primary" },
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

function streamRealistic(
  text: string,
  onChunk: (partial: string) => void,
  onDone: () => void
) {
  let i = 0;
  let started = false;

  const tick = () => {
    if (!started) {
      started = true;
      setTimeout(tick, 300 + Math.random() * 500);
      return;
    }

    const char = text[i] || "";
    let chunkSize = Math.floor(Math.random() * 5) + 2;
    if (char === "\n" || char === "." || char === ":" || char === "|") chunkSize = 1;

    i += chunkSize;
    if (i >= text.length) {
      i = text.length;
      onChunk(text);
      onDone();
      return;
    }

    onChunk(text.slice(0, i));

    let delay = 8 + Math.random() * 12;
    if (text[i - 1] === "\n" && text[i] === "\n") delay = 80 + Math.random() * 120;
    else if (text[i - 1] === "\n") delay = 30 + Math.random() * 50;
    else if (text[i - 1] === "." || text[i - 1] === ":") delay = 20 + Math.random() * 30;

    setTimeout(tick, delay);
  };

  tick();
}

export interface AgentCardHandle {
  openWithContext: (context: string) => void;
}

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = forwardRef<AgentCardHandle, AgentCardProps>(({ agent }, ref) => {
  const [executing, setExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [pendingContext, setPendingContext] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const config = statusConfig[agent.status];

  useImperativeHandle(ref, () => ({
    openWithContext: (context: string) => {
      setMessages([]);
      setPendingContext(context);
      setChatOpen(true);
    },
  }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatOpen || messages.length > 0) return;

    const conv = agentConversations[agent.id];
    if (!conv) return;

    if (pendingContext) {
      // Open with alert context: show alert as user message, then contextual response
      const contextMsg = pendingContext;
      setPendingContext(null);
      setMessages([{ role: "user", content: `🚨 Alert: ${contextMsg}` }]);
      setStreaming(true);

      const contextualIntro = `I see this alert just came in. Let me investigate immediately.\n\n`;
      const greeting = conv.greeting;
      const fullResponse = contextualIntro + greeting;

      streamRealistic(fullResponse, (partial) => {
        setMessages((prev) => {
          if (prev.length === 1) return [...prev, { role: "assistant", content: partial }];
          return prev.map((m, idx) => (idx === prev.length - 1 ? { ...m, content: partial } : m));
        });
      }, () => setStreaming(false));
    } else {
      setStreaming(true);
      streamRealistic(conv.greeting, (partial) => {
        setMessages([{ role: "assistant", content: partial }]);
      }, () => setStreaming(false));
    }
  }, [chatOpen]);

  const handleExecute = () => {
    setExecuting(true);
    setTimeout(() => { setExecuting(false); setExecuted(true); }, 2000);
  };

  const handleSend = () => {
    if (!input.trim() || streaming) return;
    const userMsg = input.trim().toLowerCase();
    const displayMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: displayMsg }]);
    setStreaming(true);

    const conv = agentConversations[agent.id];
    let response = conv?.responses.default || "I'm analyzing your request across our operational data. Let me pull the relevant information together.";
    if (conv) {
      for (const [key, val] of Object.entries(conv.responses)) {
        if (key !== "default" && userMsg.includes(key)) { response = val; break; }
      }
    }

    streamRealistic(response, (partial) => {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, idx) => (idx === prev.length - 1 ? { ...m, content: partial } : m));
        }
        return [...prev, { role: "assistant", content: partial }];
      });
    }, () => setStreaming(false));
  };

  const sendChip = (key: string) => {
    const conv = agentConversations[agent.id];
    const response = conv?.responses[key] || conv?.responses.default || "";
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    setMessages((prev) => [...prev, { role: "user", content: label }]);
    setStreaming(true);
    setInput("");
    streamRealistic(response, (partial) => {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, idx) => (idx === prev.length - 1 ? { ...m, content: partial } : m));
        }
        return [...prev, { role: "assistant", content: partial }];
      });
    }, () => setStreaming(false));
  };

  return (
    <>
      <div className={`glass-card-hover p-5 flex flex-col gap-3 ${agent.status === "alert" ? "border-warning/30" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{agent.icon}</span>
            <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
          </div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1.5 ${config.bgClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass} ${agent.status === "alert" ? "animate-pulse" : ""}`} />
            {config.label}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{agent.insight}</p>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground">Confidence</span>
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${agent.confidence}%` }} />
          </div>
          <span className="font-mono text-foreground font-medium">{agent.confidence}%</span>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-xs">
          <div className="text-muted-foreground mb-1">Recommended Action</div>
          <div className="text-foreground font-medium">{agent.action}</div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs">
            <span className="text-muted-foreground">Impact: </span>
            <span className="font-mono font-semibold text-success">{agent.impact}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => { setMessages([]); setPendingContext(null); setChatOpen(true); }} className="text-[11px] font-medium px-2.5 py-1.5 rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Chat
            </button>
            <button onClick={handleExecute} disabled={executing || executed} className={`text-[11px] font-medium px-3 py-1.5 rounded-md transition-all ${executed ? "bg-success/20 text-success cursor-default" : executing ? "bg-primary/20 text-primary animate-pulse cursor-wait" : "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"}`}>
              {executed ? "✓ Executed" : executing ? "Executing..." : "Execute →"}
            </button>
          </div>
        </div>
      </div>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-slide-up">
          <div className="w-full max-w-lg mx-4 glass-card border border-border/50 flex flex-col max-h-[80vh] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">{agent.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${config.bgClass}`}>{config.label} • {agent.confidence}% confidence</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1"><X className="w-4 h-4" /></button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={`text-xs leading-relaxed ${msg.role === "user" ? "text-right" : ""}`}>
                  {msg.role === "user" ? (
                    <span className="inline-block bg-primary/10 text-primary px-3 py-2 rounded-lg max-w-[85%] text-left">{msg.content}</span>
                  ) : (
                    <div className="bg-secondary/50 rounded-lg p-3 whitespace-pre-wrap text-foreground">
                      {msg.content}
                      {streaming && i === messages.length - 1 && <span className="inline-block w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse" />}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {messages.length <= 2 && !streaming && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {Object.keys(agentConversations[agent.id]?.responses || {}).filter((k) => k !== "default").map((key) => (
                  <button key={key} onClick={() => sendChip(key)} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors capitalize">{key}</button>
                ))}
              </div>
            )}
            <div className="p-3 border-t border-border/50">
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder={`Ask ${agent.name} anything...`} className="flex-1 bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-lg border border-border/50 focus:outline-none focus:border-primary/50 transition-colors" />
                <button onClick={handleSend} disabled={!input.trim() || streaming} className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-40"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

AgentCard.displayName = "AgentCard";

export default AgentCard;
