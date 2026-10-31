const capabilities = [
  { title: "Front-end systems", description: "Modular interfaces and reusable components.", skills: ["React", "Next.js", "TypeScript", "Vue", "Redux", "Nx", "Storybook"] },
  { title: "APIs & data", description: "The services behind the experience.", skills: ["Node.js", "Python", "Express", "REST", "GraphQL", "PostgreSQL", "MongoDB"] },
  { title: "Quality & accessibility", description: "Confidence in every release.", skills: ["Jest", "React Testing Library", "Cypress", "WCAG 2.1", "NVDA", "VoiceOver"] },
  { title: "Infrastructure & delivery", description: "Repeatable builds and reliable deployments.", skills: ["AWS", "Terraform", "Ansible", "Docker", "GitHub Actions", "Jenkins"] },
  { title: "AI integration", description: "Production work at SurveyMonkey.", skills: ["OpenAI APIs", "LangChain", "RAG", "Embeddings", "Tool calling", "Streaming UX"] },
  { title: "Technical leadership", description: "Better systems through stronger teams.", skills: ["Architecture", "Mentoring", "Code quality", "Cross-functional delivery", "Agile"] },
];

export default function Skills() {
  return <section id="skills" className="section-space skills-section"><div className="shell"><p className="section-label">04 / Capabilities</p><h2 className="section-title">Depth where it matters.<br />Range to connect the pieces.</h2><div className="capability-grid">{capabilities.map((item, index) => <article key={item.title}><span className="capability-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><div className="tag-list">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></div></section>;
}
