import { useState, useEffect } from "react";
import { Heart, Calendar, Clock } from "lucide-react";

export function AnniversaryCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isAnniversary, setIsAnniversary] = useState(false);

  useEffect(() => {
    // Set anniversary date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = tomorrow.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsAnniversary(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isAnniversary) {
    return (
      <div className="memory-card p-8 text-center max-w-2xl mx-auto mb-8">
        <div className="celebration-animation mb-6">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="love-text text-4xl font-bold text-foreground mb-4">
            Happy Anniversary! 💕
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Today marks another beautiful chapter in our love story!
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart 
                key={i}
                className="h-6 w-6 text-primary love-pulse animate-bounce" 
                fill="currentColor"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-card p-8 text-center max-w-4xl mx-auto mb-8">
      <div className="mb-6">
        <Calendar className="h-8 w-8 mx-auto mb-4 text-primary" />
        <h2 className="love-text text-3xl font-bold text-foreground mb-2">
          Anniversary Countdown
        </h2>
        <p className="text-muted-foreground">
          Every second brings us closer to celebrating our special day! 💖
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
          <div 
            key={item.label}
            className="bg-gradient-sunset p-4 rounded-lg text-white"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-3xl font-bold mb-1 countdown-number">
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-medium opacity-90">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Until our special anniversary moment arrives</span>
      </div>
    </div>
  );
}