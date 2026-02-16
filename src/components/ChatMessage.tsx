import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  if (role === "user") {
    return (
      <div className="text-xs leading-relaxed text-right">
        <span className="inline-block bg-primary/10 text-primary px-3 py-2 rounded-lg max-w-[85%] text-left">
          {content}
        </span>
      </div>
    );
  }

  return (
    <div className="text-xs leading-relaxed">
      <div className="bg-secondary/50 rounded-lg p-3 text-foreground prose prose-xs prose-neutral dark:prose-invert max-w-none
        prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5
        prose-table:text-xs prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1
        prose-table:border-collapse prose-th:border prose-th:border-border/50 prose-td:border prose-td:border-border/50
        prose-th:bg-secondary/50 prose-strong:text-foreground prose-headings:text-foreground prose-headings:text-xs prose-headings:mt-2 prose-headings:mb-1">
        <ReactMarkdown>{content}</ReactMarkdown>
        {isStreaming && (
          <span className="inline-block w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
