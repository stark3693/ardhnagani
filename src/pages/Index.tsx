import { ThemeToggle } from "@/components/ThemeToggle";
import { ParticleSystem } from "@/components/ParticleSystem";
import { LoveMessage } from "@/components/LoveMessage";
import { MemoryGallery } from "@/components/MemoryGallery";
import { AnniversaryCountdown } from "@/components/AnniversaryCountdown";
import { LoveReplyForm } from "@/components/LoveReplyForm";
import { LoveMessagesDisplay } from "@/components/LoveMessagesDisplay";
import { Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import romanticHeroBg from "@/assets/romantic-hero-bg.jpg";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMessageAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary love-pulse" fill="currentColor" />
            <span className="love-text text-2xl font-bold">Our Love Story</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Enhanced Particle System */}
      <ParticleSystem />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${romanticHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 text-rose-gold">
            <Sparkles className="h-12 w-12 twinkle" />
          </div>
          <div className="absolute -top-6 -right-6 text-sunset-pink">
            <Star className="h-10 w-10 twinkle" style={{ animationDelay: "1s" }} />
          </div>
          <div className="absolute -bottom-4 -left-4 text-dawn-peach">
            <Heart className="h-8 w-8 love-pulse" fill="currentColor" />
          </div>
          
          <h1 className="love-text text-5xl md:text-7xl font-bold mb-6 animate-fade-in typewriter">
            My Dearest Love
          </h1>
          
          <p className="text-white/90 text-xl md:text-2xl mb-8 font-light leading-relaxed animate-fade-in" style={{ animationDelay: "0.5s" }}>
            In this digital garden of memories, every pixel blooms with the essence of our love. 
            Here lies the story of us—written in starlight, painted with sunset hues, 
            and filled with all the moments that make my heart dance with yours.
          </p>
          
          <div className="text-white/80 text-lg mb-4 romantic-script animate-fade-in" style={{ animationDelay: "1s" }}>
            Forever and always,
          </div>
          <div className="love-text text-2xl font-bold animate-fade-in" style={{ animationDelay: "1.5s" }}>
            Your Loving Husband 💕
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 bg-background">
        {/* Anniversary Countdown */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <AnniversaryCountdown />
          </div>
        </section>

        {/* Love Message Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <LoveMessage 
              message="Every morning when I wake up and see your beautiful face, I'm reminded that I'm living in a fairy tale. You are my sunshine, my moon, and all my stars. This website is just a small token of the infinite love I have for you. Happy Anniversary, my darling!"
            />
          </div>
        </section>

        {/* Memory Gallery Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
          <div className="container mx-auto">
            <MemoryGallery />
          </div>
        </section>

        {/* Love Reply Form Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <LoveReplyForm onMessageAdded={handleMessageAdded} />
          </div>
        </section>

        {/* Love Messages Display Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
          <div className="container mx-auto">
            <LoveMessagesDisplay key={refreshTrigger} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-card/50 backdrop-blur-sm border-t border-border/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-6 w-6 text-primary love-pulse" fill="currentColor" />
            <span className="text-muted-foreground">Made with endless love</span>
            <Heart className="h-6 w-6 text-primary love-pulse" fill="currentColor" />
          </div>
          <p className="text-sm text-muted-foreground">
            Our love story continues with every heartbeat 💕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
