"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    company: "SurveyMonkey",
    role: "Senior Software Engineer",
    location: "Canada",
    period: "October 2023 – Present",
    description: "Leading front-end architecture for enterprise survey platform with AI integrations.",
    highlights: [
      "Architected scalable React/Next.js modules in NX monorepo powering enterprise-grade survey authoring and workflow features",
      "Integrated OpenAI Assistants API and LangChain agents for automated routing, content generation, and validation flows",
      "Developed conversational bot-driven UI components with streaming responses and multi-step workflows",
      "Implemented Python-based LangChain pipelines for summarization and internal agent automation",
      "Deployed LLM microservices using Terraform and AWS, improving developer speed and stability",
      "Delivered WCAG 2.1-compliant interfaces used globally with rigorous accessibility testing",
    ],
    tech: ["React", "Next.js", "NX", "OpenAI", "LangChain", "Python", "Terraform", "AWS"],
    current: true,
  },
  {
    company: "Canada Life Digital Hub",
    role: "Application Developer",
    location: "Canada",
    period: "March 2023 – September 2023",
    description: "Migrated financial workflows to modern Vue 3 architecture with AI-powered tools.",
    highlights: [
      "Migrated financial workflow modules to Vue 3 using composables and Pinia",
      "Built Python + LangChain utilities for policy document summarization and structured data generation",
      "Created internal chat-style tools using OpenAI and embeddings for guided user interactions",
      "Integrated SQL and NoSQL stores for optimized load and form session recovery",
    ],
    tech: ["Vue 3", "Pinia", "Python", "LangChain", "OpenAI", "PostgreSQL", "MongoDB"],
    current: false,
  },
  {
    company: "CITI Bank",
    role: "Senior Software Engineer",
    location: "Canada",
    period: "August 2022 – March 2023",
    description: "Rebuilt enterprise dashboards with advanced workflow automation.",
    highlights: [
      "Rebuilt workflow dashboards in React with automated routing and validation checkpoints",
      "Integrated Python-based LLM utilities using LangChain for classification and summarization",
      "Enhanced Redux architecture for multi-step approval flows, increasing efficiency by 25%",
      "Delivered secure API integrations and reporting modules using PostgreSQL",
    ],
    tech: ["React", "Redux", "Python", "LangChain", "PostgreSQL", "REST APIs"],
    current: false,
  },
  {
    company: "Telus",
    role: "Frontend/Full Stack Developer",
    location: "Canada",
    period: "May 2021 – August 2022",
    description: "Built micro-frontend architecture for internal provisioning workflows.",
    highlights: [
      "Built micro-frontend React/Next.js modules for internal provisioning workflows",
      "Developed Node.js/MongoDB services for automation tooling and real-time dashboards",
      "Implemented IaC using Terraform and Ansible for environment provisioning",
      "Delivered mobile-optimized, accessible interfaces",
    ],
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Terraform", "Ansible"],
    current: false,
  },
  {
    company: "FactSet",
    role: "Software Engineer II",
    location: "India",
    period: "November 2020 – May 2021",
    description: "Modernized legacy applications with improved workflow navigation.",
    highlights: [
      "Modernized UI from AngularJS to Vue/Angular hybrids with improved navigation",
      "Automated environment configuration with Ansible and AWS EC2 deployment pipelines",
      "Improved accessibility and performance across global financial products",
    ],
    tech: ["Vue", "Angular", "Ansible", "AWS EC2"],
    current: false,
  },
  {
    company: "Hughes Systique",
    role: "Software Engineer",
    location: "India",
    period: "June 2019 – November 2020",
    description: "Delivered high-traffic applications with CI/CD integration.",
    highlights: [
      "Delivered React/Angular interfaces for workflow visualization and automation",
      "Built backend APIs using Node.js and Loopback, integrating MongoDB for analytics",
      "Improved cross-browser performance using Bootstrap and Angular Material",
    ],
    tech: ["React", "Angular", "Node.js", "Loopback", "MongoDB"],
    current: false,
  },
  {
    company: "Kellton Tech Solutions",
    role: "Software Engineer",
    location: "India",
    period: "February 2017 – June 2019",
    description: "Developed enterprise healthcare solutions with Vue/Angular.",
    highlights: [
      "Developed healthcare workflow modules using Vue/Angular with form-heavy UI flows",
      "Managed AWS EC2 deployments with Nginx tuning for high-performance delivery",
      "Collaborated in Agile processes including sprints and retrospectives",
    ],
    tech: ["Vue", "Angular", "AWS EC2", "Nginx"],
    current: false,
  },
];

function ExperienceCard({ exp, index, isVisible }: { exp: typeof experiences[0]; index: number; isVisible: boolean }) {
  return (
    <div 
      className={`relative pl-20 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
    >
      {/* Timeline dot */}
      <div className={`absolute left-6 top-1 w-5 h-5 rounded-full border-4 transition-all duration-500 ${
        exp.current 
          ? "bg-accent border-accent/30 animate-pulse-glow" 
          : "bg-slate-dark border-slate-medium"
      } ${isVisible ? "scale-100" : "scale-0"}`}
        style={{ transitionDelay: isVisible ? `${index * 150 + 200}ms` : "0ms" }}
      />

      {/* Content card */}
      <div className={`p-6 rounded-2xl border transition-all card-hover ${
        exp.current
          ? "bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/30"
          : "bg-slate-dark/50 border-slate-medium hover:border-slate-light"
      }`}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              {exp.company}
              {exp.current && (
                <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full font-medium">
                  Current
                </span>
              )}
            </h3>
            <p className="text-accent font-medium">{exp.role}</p>
          </div>
          <div className="text-right">
            <p className="text-text-secondary text-sm font-mono">{exp.period}</p>
            <p className="text-text-muted text-sm">{exp.location}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-4">{exp.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {exp.highlights.slice(0, index === 0 ? 6 : 3).map((highlight, i) => (
            <li 
              key={i} 
              className={`flex items-start gap-2 text-sm text-text-secondary transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150 + 300 + i * 50}ms` : "0ms" }}
            >
              <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((tech, techIndex) => (
            <span
              key={tech}
              className={`px-2 py-1 bg-midnight/50 rounded text-xs text-text-muted border border-slate-medium hover:border-accent/50 hover:text-accent transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150 + 500 + techIndex * 30}ms` : "0ms" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-accent font-mono text-sm tracking-wider mb-4 uppercase">Career Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div ref={timelineRef as React.RefObject<HTMLDivElement>} className="relative">
          {/* Timeline line */}
          <div 
            className={`absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary to-slate-dark transition-all duration-1000 ease-out origin-top ${
              timelineVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`} 
          />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={`${exp.company}-${exp.period}`} 
                exp={exp} 
                index={index}
                isVisible={timelineVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
