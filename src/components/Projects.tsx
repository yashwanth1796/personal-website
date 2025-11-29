"use client";

const projects = [
  {
    title: "AI-Powered Survey Authoring Platform",
    category: "Enterprise SaaS • AI/LLM",
    description:
      "Architected and built scalable React/Next.js modules in an NX monorepo powering enterprise-grade survey authoring with integrated AI assistance for content generation, routing logic, and validation flows.",
    highlights: [
      "OpenAI Assistants API integration for intelligent routing",
      "LangChain agents for automated metadata extraction",
      "Streaming UI responses with dynamic multi-step workflows",
      "Schema-driven form generation with intelligent assistance",
    ],
    tech: ["React", "Next.js", "NX", "OpenAI", "LangChain", "TypeScript"],
    gradient: "from-accent to-teal-400",
  },
  {
    title: "Conversational Bot UI Framework",
    category: "AI/LLM • React Components",
    description:
      "Developed reusable conversational and bot-driven UI components supporting streaming responses, tool calls, fallback chains, and dynamic multi-step workflows for enterprise applications.",
    highlights: [
      "Real-time streaming response handling",
      "Function calling and tool integration",
      "Fallback chain management",
      "Accessible WCAG 2.1 compliant interface",
    ],
    tech: ["React", "TypeScript", "OpenAI", "Streaming API", "Storybook"],
    gradient: "from-secondary to-pink-400",
  },
  {
    title: "Financial Workflow Automation",
    category: "FinTech • Workflow",
    description:
      "Built Python + LangChain utilities to summarize policy documents, generate structured TFSA/RRSP input data, and automate advisor workflows with chat-style tools using embeddings for guided interactions.",
    highlights: [
      "Policy document summarization pipeline",
      "Structured data generation for financial forms",
      "Embedding-based quick data lookup",
      "Schema-driven validation automation",
    ],
    tech: ["Vue 3", "Python", "LangChain", "OpenAI", "PostgreSQL"],
    gradient: "from-amber-500 to-orange-400",
  },
  {
    title: "Enterprise Dashboard Rebuild",
    category: "Banking • React",
    description:
      "Rebuilt workflow dashboards with automated routing, validation checkpoints, and agent-support features. Integrated LLM utilities for classification, summarization, and workflow audit insights.",
    highlights: [
      "Multi-step approval flow optimization (25% efficiency increase)",
      "LangChain-powered classification system",
      "Secure API integrations with caching layers",
      "Redux architecture for complex state management",
    ],
    tech: ["React", "Redux", "Python", "LangChain", "PostgreSQL"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Micro-Frontend Architecture",
    category: "Telecom • Full Stack",
    description:
      "Designed and implemented micro-frontend React/Next.js modules for internal provisioning workflows and customer management systems with IaC using Terraform and Ansible.",
    highlights: [
      "Module federation for scalable architecture",
      "Real-time operations dashboards",
      "Infrastructure as Code implementation",
      "Mobile-optimized responsive design",
    ],
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Terraform", "Ansible"],
    gradient: "from-emerald-500 to-green-400",
  },
  {
    title: "Healthcare Workflow Platform",
    category: "Healthcare • Enterprise",
    description:
      "Developed healthcare workflow modules with form-heavy UI flows, high-performance AWS deployments, and comprehensive accessibility compliance for global healthcare providers.",
    highlights: [
      "Complex multi-step form workflows",
      "High-availability AWS infrastructure",
      "WCAG accessibility compliance",
      "Agile development practices",
    ],
    tech: ["Vue", "Angular", "AWS EC2", "Nginx", "Node.js"],
    gradient: "from-rose-500 to-red-400",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-obsidian relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm tracking-wider mb-4 uppercase">Featured Work</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Projects & <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in React, AI/LLM integrations, 
            and enterprise-scale application development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative p-6 rounded-2xl border border-slate-medium bg-slate-dark/30 hover:border-slate-light transition-all hover:scale-[1.02] ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              
              <div className={index === 0 ? "md:flex md:gap-8" : ""}>
                <div className={index === 0 ? "md:flex-1" : ""}>
                  {/* Category */}
                  <p className="text-text-muted text-sm font-mono mb-2">{project.category}</p>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className={index === 0 ? "md:flex-1" : ""}>
                  {/* Highlights */}
                  <ul className="space-y-2 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-midnight/50 rounded-lg text-xs text-text-muted border border-slate-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI/LLM Expertise Banner */}
        <div className="mt-12 p-8 bg-gradient-to-br from-accent/10 via-secondary/5 to-accent/10 rounded-2xl border border-accent/20">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">AI/LLM Integration Specialist</h4>
              <p className="text-text-secondary">
                Experienced in integrating LLMs and agent-based automation directly into production UIs using 
                <span className="text-accent"> OpenAI APIs</span>, <span className="text-accent">LangChain</span>, 
                <span className="text-accent"> embeddings</span>, <span className="text-accent">RAG</span>, and 
                <span className="text-accent"> schema-driven conversational workflows</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

