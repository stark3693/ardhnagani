import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  delay: number;
  size: number;
  position: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const heartArray: FloatingHeart[] = [];
    for (let i = 0; i < 8; i++) {
      heartArray.push({
        id: i,
        delay: Math.random() * 8,
        size: Math.random() * 20 + 16,
        position: Math.random() * 100,
      });
    }
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="floating-heart absolute text-primary/20"
          style={{
            left: `${heart.position}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            fill: "currentColor",
          }}
        />
      ))}
    </div>
  );
}