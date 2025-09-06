import { useState } from "react";
import { Heart, Camera, Star } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  mood: string;
}

const sampleMemories: Memory[] = [
  {
    id: 1,
    title: "Our First Dance",
    description: "The moment I knew you were my forever",
    date: "A beautiful evening",
    image: "/1.png",
    mood: "magical"
  },
  {
    id: 2,
    title: "Sunset Together",
    description: "Every sunset is more beautiful with you",
    date: "Every golden hour",
    image: "/2.png",
    mood: "peaceful"
  },
  {
    id: 3,
    title: "Morning Coffee",
    description: "Our quiet moments mean everything",
    date: "Every morning",
    image: "/5.png",
    mood: "warm"
  }
];

export function MemoryGallery() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 animate-fade-in-up">
            Our Beautiful Memories
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="h-5 w-5 text-rose-gold twinkle" />
            <Camera className="h-6 w-6 text-primary" />
            <Star className="h-5 w-5 text-sunset-pink twinkle" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="love-text text-muted-foreground max-w-2xl mx-auto">
            Each photograph tells a story of our love, frozen in time like pressed flowers in the pages of our hearts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleMemories.map((memory, index) => (
            <div
              key={memory.id}
              className="memory-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-love opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Heart
                  className="absolute top-4 right-4 h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 love-pulse"
                  fill="currentColor"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                  {memory.title}
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {memory.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-script">
                    {memory.date}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {memory.mood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Memory Placeholder */}
        <div className="mt-12 text-center">
          <div className="memory-card p-12 max-w-md mx-auto group cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
            <Camera className="h-12 w-12 text-primary/60 mx-auto mb-4 group-hover:text-primary transition-colors" />
            <h3 className="text-lg font-serif text-muted-foreground group-hover:text-foreground transition-colors">
              Add New Memory
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Our story continues...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}