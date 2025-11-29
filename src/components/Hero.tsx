"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
      
      {/* Floating shapes */}
      <div className="absolute top-32 right-1/4 w-4 h-4 bg-accent rounded-full animate-float opacity-60" />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-secondary rounded-full animate-float delay-300 opacity-60" />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-accent-light rounded-full animate-float delay-500 opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-dark/50 rounded-full border border-slate-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">Available for opportunities</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
          <span className="block text-text-primary">Yashwanth Kumar</span>
          <span className="block text-gradient mt-2">Vandanapu</span>
        </h1>

        {/* Title */}
        <p className="text-xl md:text-2xl text-text-secondary mb-8 animate-slide-up delay-200" style={{ fontFamily: "var(--font-family-mono)" }}>
          Senior Software Engineer • <span className="text-accent">Front-End</span> / <span className="text-secondary">Full Stack</span>
        </p>

        {/* Summary */}
        <p className="max-w-3xl mx-auto text-lg text-text-secondary leading-relaxed mb-12 animate-slide-up delay-300">
          7+ years crafting enterprise-scale platforms with{" "}
          <span className="text-text-primary font-medium">React, Next.js, TypeScript</span>, and{" "}
          <span className="text-text-primary font-medium">AI/LLM integrations</span>. 
          Specializing in scalable architectures, workflow automation, and accessible user experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-400">
          <a
            href="#projects"
            className="group px-8 py-4 bg-accent text-midnight font-semibold rounded-xl hover:bg-accent-light transition-all hover:shadow-xl hover:shadow-accent/20 flex items-center gap-2"
          >
            View My Work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-slate-medium text-text-primary font-semibold rounded-xl hover:border-accent hover:text-accent transition-all flex items-center gap-2"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-text-muted"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}

