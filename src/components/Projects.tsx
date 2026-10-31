import projects from "@/data/projects.json";

const summaries: Record<string, { title: string; description: string }> = {
  SurveyMonkey: { title: "Better tools for building surveys", description: "Shared React components and AI assistance for survey authors." },
  "Canada Life Digital Hub": { title: "Investment forms that work better", description: "Rebuilt retirement and investment forms in Vue, with better validation and recovery." },
  "CITI Bank": { title: "Simpler banking workflows", description: "Rebuilt dashboards and approval flows in React." },
};

export default function Projects() {
  return (
    <section id="projects" className="section-space work-section">
      <div className="section-heading"><h2 className="section-title">A few things I’ve worked on.</h2></div>
      <div className="work-grid">{projects.filter(project => project.outcome).map(project => (
        <article className="work-card" id={`work-${project.company.toLowerCase().replaceAll(" ", "-")}`} key={project.title}>
          <div className="work-card-top"><span>{project.company}</span></div>
          <h3>{summaries[project.company].title}</h3>
          <p className="work-description">{summaries[project.company].description}</p>
          <p className="work-result">{project.outcome}</p>
          <details className="work-details">
            <summary>How I built it <span aria-hidden="true">+</span></summary>
            <ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <div className="tag-list">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
          </details>
        </article>
      ))}</div>
    </section>
  );
}
