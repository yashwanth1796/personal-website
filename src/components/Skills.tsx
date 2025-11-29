"use client";

const skillCategories = [
  {
    title: "Languages & Web",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3", "AJAX", "JSON"],
  },
  {
    title: "Frameworks & Libraries",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    skills: ["ReactJS", "Next.js", "VueJS", "Angular", "Redux", "NX Monorepo", "Storybook"],
  },
  {
    title: "AI/LLM Technologies",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: ["OpenAI APIs", "LangChain", "Embeddings", "RAG", "Vector Stores", "Function Calling", "Streaming UX"],
    highlight: true,
  },
  {
    title: "Infrastructure & DevOps",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: ["Terraform", "Ansible", "Docker", "AWS (EC2, S3, Lambda)", "GitHub Actions", "Jenkins"],
  },
  {
    title: "Backend & APIs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ["Node.js", "Express", "GraphQL", "tRPC", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Testing & Quality",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    skills: ["Jest", "React Testing Library", "Cypress", "Selenium", "Jasmine", "TDD"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-obsidian relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-wider mb-4 uppercase">Technical Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                category.highlight
                  ? "bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/30 hover:border-accent/50"
                  : "bg-slate-dark/50 border-slate-medium hover:border-slate-light"
              }`}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${
                category.highlight 
                  ? "bg-accent/20 text-accent" 
                  : "bg-slate-medium text-text-secondary"
              }`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      category.highlight
                        ? "bg-midnight/50 text-accent border border-accent/20"
                        : "bg-slate-medium/50 text-text-secondary"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Accessibility & Best Practices */}
        <div className="mt-12 p-8 bg-slate-dark/30 rounded-2xl border border-slate-medium">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Accessibility & UX First</h4>
              <p className="text-text-secondary">
                WCAG 2.1 compliant interfaces • AODA standards • NVDA, VoiceOver, TalkBack testing • 
                Scalable architectures • Componentized design patterns • Performance optimization • Test-driven development
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

