"use client";

const highlights = [
  { number: "7+", label: "Years Experience" },
  { number: "15+", label: "Projects Delivered" },
  { number: "5", label: "Countries Served" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <p className="text-accent font-mono text-sm tracking-wider mb-4 uppercase">About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Building Digital <span className="text-gradient">Experiences</span> That Matter
            </h2>
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                I&apos;m a Senior Software Engineer passionate about creating high-performance 
                front-end systems for enterprise SaaS applications. With expertise spanning 
                modern frameworks like <span className="text-accent">React</span>, <span className="text-accent">Next.js</span>, and <span className="text-accent">Vue</span>, 
                I build scalable, modular architectures that drive business impact.
              </p>
              <p>
                My recent focus has been on integrating <span className="text-secondary">LLMs and AI-driven workflows</span> directly 
                into production UIs, leveraging OpenAI APIs, LangChain, embeddings, and RAG 
                to create intelligent, conversational experiences.
              </p>
              <p>
                I believe in accessible design (WCAG 2.1), rigorous testing, and mentoring teams 
                to elevate code quality and developer experience across the board.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://linkedin.com/in/Yashwanth-Vandanapu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-dark rounded-lg border border-slate-medium hover:border-accent hover:text-accent transition-all"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:yashwanth.vandanapu@gmail.com"
                className="p-3 bg-slate-dark rounded-lg border border-slate-medium hover:border-accent hover:text-accent transition-all"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="tel:4168205970"
                className="p-3 bg-slate-dark rounded-lg border border-slate-medium hover:border-accent hover:text-accent transition-all"
                aria-label="Phone"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-6 bg-slate-dark/50 rounded-2xl border border-slate-medium hover:border-accent/50 transition-all group ${
                  index === 0 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
            {/* Tech Stack Preview */}
            <div className="col-span-2 p-6 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl border border-accent/20">
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "LangChain", "OpenAI", "Node.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-midnight/50 rounded-full text-sm text-text-secondary border border-slate-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

