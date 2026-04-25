import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Globe, Users } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function AboutUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
      {/* --- Section 1: Hero --- */}
      <header className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          We build things we <span className="text-primary">actually use.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          It started with a simple problem and a messy desk. Today, we’re a
          small team dedicated to making everyday tools feel a bit more like
          magic.
        </p>
      </header>

      {/* --- Section 2: Our Story --- */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl bg-muted aspect-video flex items-center justify-center overflow-hidden">
          <img
            src="https://picsum.photos/id/160/800/450"
            alt="Our office space"
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">The Origin Story</h2>
          <p className="text-muted-foreground">
            In 2024, we realized that most products were being built by
            committees, not by people. We decided to go the other way—staying
            small, moving fast, and focusing entirely on the craft.
          </p>
          <p className="text-muted-foreground">
            We don’t answer to shareholders; we answer to the people who use our
            products every single day.
          </p>
        </div>
      </section>

      {/* --- Section 3: Values Grid --- */}
      <section className="grid sm:grid-cols-3 gap-8">
        <div className="p-6 border rounded-xl space-y-3">
          <HugeiconsIcon icon={Coffee} className="h-6 w-6 text-primary" />
          <h3 className="font-bold">Human-Centric</h3>
          <p className="text-sm text-muted-foreground">
            We design for real hands, real eyes, and real workflows.
          </p>
        </div>
        <div className="p-6 border rounded-xl space-y-3">
          <HugeiconsIcon icon={Globe} className="h-6 w-6 text-primary" />
          <h3 className="font-bold">Global Reach</h3>
          <p className="text-sm text-muted-foreground">
            Operating from 4 countries with a single, shared vision.
          </p>
        </div>
        <div className="p-6 border rounded-xl space-y-3">
          <HugeiconsIcon icon={Users} className="h-6 w-6 text-primary" />
          <h3 className="font-bold">Community Led</h3>
          <p className="text-sm text-muted-foreground">
            Our roadmap is built directly from user feedback.
          </p>
        </div>
      </section>

      {/* --- Section 4: Final CTA --- */}
      <footer className="bg-secondary/30 rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Want to follow the journey?</h2>
        <p className="text-muted-foreground">
          Join 5,000+ others who get our monthly "behind the scenes" updates.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full">
            Browse the Shop{" "}
            <HugeiconsIcon icon={ArrowRight} className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Read our Blog
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default AboutUsPage;
