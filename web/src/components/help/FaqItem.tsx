import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-xl bg-card transition-all hover:border-violet-200 dark:hover:border-violet-800 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-4">
        <h3 className="font-medium text-sm md:text-base">{question}</h3>
        {isOpen ? (
          <ChevronUp size={18} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={18} className="text-muted-foreground" />
        )}
      </div>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-muted-foreground animate-in slide-in-from-top-2 fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}
