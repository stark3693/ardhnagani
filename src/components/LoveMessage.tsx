import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoveMessageProps {
  message: string;
  author?: string;
}

export function LoveMessage({ message, author = "Your Loving Husband" }: LoveMessageProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <div className="memory-card p-8 max-w-2xl mx-auto text-center">
      <div className="relative">
        <Sparkles className="absolute -top-2 -left-2 h-6 w-6 text-rose-gold twinkle" />
        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-sunset-pink twinkle" style={{ animationDelay: "1s" }} />
        
        <blockquote className="love-text text-foreground/90 mb-6 italic">
          "{message}"
        </blockquote>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px bg-gradient-love flex-1 max-w-20"></div>
          <Heart className="h-5 w-5 text-primary love-pulse" fill="currentColor" />
          <div className="h-px bg-gradient-love flex-1 max-w-20"></div>
        </div>
        
        <p className="text-muted-foreground font-script text-xl mb-6">
          — {author}
        </p>
        
        <Button
          onClick={handleClick}
          className={`love-button text-white border-0 ${
            isClicked ? "animate-gentle-bounce" : ""
          }`}
        >
          <Heart className="mr-2 h-4 w-4" fill="currentColor" />
          Send Love Back
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}