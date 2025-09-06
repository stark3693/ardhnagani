import { useEffect, useState } from "react";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LoveMessage {
  id: string;
  message: string;
  sender_name: string;
  mood: string;
  created_at: string;
}

const moodEmojis = {
  happy: "💕",
  romantic: "🌹",
  grateful: "🙏",
  excited: "✨",
  loving: "💖",
};

export function LoveMessagesDisplay() {
  const [messages, setMessages] = useState<LoveMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('love_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching love messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel('love-messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'love_messages'
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <Heart className="h-5 w-5 animate-pulse text-primary" />
          <span>Loading love messages...</span>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No Love Messages Yet</h3>
        <p className="text-muted-foreground">
          Be the first to leave a beautiful love message! 💕
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="love-text text-3xl font-bold text-foreground mb-2">
          Our Love Letters
        </h2>
        <p className="text-muted-foreground">
          Beautiful messages from the heart 💖
        </p>
      </div>

      <div className="grid gap-6">
        {messages.map((message, index) => (
          <div 
            key={message.id}
            className="memory-card p-6 hover:scale-[1.02] transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <span className="text-xl">
                    {moodEmojis[message.mood as keyof typeof moodEmojis] || "💕"}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {message.sender_name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(message.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <Heart className="h-5 w-5 text-primary love-pulse" fill="currentColor" />
            </div>
            
            <blockquote className="text-foreground/90 italic text-lg leading-relaxed">
              "{message.message}"
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}