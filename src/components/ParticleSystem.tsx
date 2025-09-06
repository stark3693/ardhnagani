import { Heart, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  type: 'heart' | 'sparkle' | 'star';
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  delay: number;
}

export function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      particleArray.push({
        id: i,
        type: ['heart', 'sparkle', 'star'][Math.floor(Math.random() * 3)] as 'heart' | 'sparkle' | 'star',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 24 + 16,
        speed: Math.random() * 20 + 10,
        opacity: Math.random() * 0.6 + 0.2,
        rotation: Math.random() * 360,
        delay: Math.random() * 10,
      });
    }
    setParticles(particleArray);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
        id: Date.now(),
      };
      
      setMouseTrail(prev => [...prev.slice(-5), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ParticleIcon = ({ particle }: { particle: Particle }) => {
    switch (particle.type) {
      case 'heart':
        return <Heart className="particle-icon" fill="currentColor" />;
      case 'sparkle':
        return <Sparkles className="particle-icon" />;
      case 'star':
        return <Star className="particle-icon" fill="currentColor" />;
    }
  };

  return (
    <>
      {/* Main Particle System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-primary/30 floating-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: `rotate(${particle.rotation}deg)`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.speed}s`,
            }}
          >
            <ParticleIcon particle={particle} />
          </div>
        ))}
      </div>

      {/* Mouse Trail */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {mouseTrail.map((trail, index) => (
          <div
            key={trail.id}
            className="absolute w-2 h-2 bg-primary/40 rounded-full animate-ping"
            style={{
              left: `${trail.x}%`,
              top: `${trail.y}%`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}