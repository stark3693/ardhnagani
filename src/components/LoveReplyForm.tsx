import { useState } from "react";
import { Heart, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LoveReplyFormProps {
  onMessageAdded?: () => void;
}

export function LoveReplyForm({ onMessageAdded }: LoveReplyFormProps) {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("My Love");
  const [mood, setMood] = useState("happy");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('love_messages')
        .insert([
          {
            message: message.trim(),
            sender_name: senderName.trim() || "My Love",
            mood,
          }
        ]);

      if (error) throw error;

      setMessage("");
      setSenderName("My Love");
      setMood("happy");
      
      toast({
        title: "Love message sent! 💕",
        description: "Your beautiful message has been added to our love story.",
      });

      onMessageAdded?.();
    } catch (error) {
      console.error('Error sending love message:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try sending your love message again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="memory-card p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-rose-gold twinkle" />
          <h2 className="love-text text-2xl font-bold text-foreground">
            Leave a Love Note
          </h2>
          <Sparkles className="h-6 w-6 text-sunset-pink twinkle" style={{ animationDelay: "1s" }} />
        </div>
        <p className="text-muted-foreground">
          Share your thoughts about our love story and this special website 💖
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="senderName" className="text-foreground/80">Your Name</Label>
            <Input
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary/50"
              placeholder="My Love"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mood" className="text-foreground/80">Mood</Label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-3 py-2 bg-background/50 border border-primary/20 rounded-md focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="happy">💕 Happy</option>
              <option value="romantic">🌹 Romantic</option>
              <option value="grateful">🙏 Grateful</option>
              <option value="excited">✨ Excited</option>
              <option value="loving">💖 Loving</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground/80">Your Love Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary/50 min-h-[120px]"
            placeholder="Write your heart out... Tell me what you think about this website, our love, or anything that makes you smile 💕"
            required
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting || !message.trim()}
          className="w-full love-button text-white border-0"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
              Sending Love...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" fill="currentColor" />
              Send Love Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}