import projects from "@/data/projects.json";

export default function Projects() {
  const featured = projects.filter(project => project.outcome);
  const additional = projects.filter(project => !project.outcome);
  return (
    <section id="projects" className="section-space work-section">
      <div className="shell">
        <div className="section-heading"><div><p className="section-label">01 / Selected work</p><h2 className="section-title">From architecture to impact.</h2></div><span className="section-aside">THREE SELECTED ENGAGEMENTS</span></div>
        <div className="work-grid">{featured.map((project, index) => (
          <article className="work-card" key={project.title}>
            <div className="work-card-top"><span>{project.company}</span><span>0{index + 1}</span></div>
            <h3>{project.title}</h3><p className="work-description">{project.description}</p>
            <div className="project-scope" aria-label="Technical scope">{project.scope?.map((item, i) => <span key={item}><small>0{i + 1}</small>{item}</span>)}</div>
            <dl className="project-summary"><div><dt>My focus</dt><dd>{project.focus}</dd></div><div><dt>Outcome</dt><dd className="project-outcome">{project.outcome}</dd></div></dl>
            <details className="work-details"><summary>Implementation details <span aria-hidden="true">+</span></summary><ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul><div className="tag-list">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div></details>
          </article>
        ))}</div>
        <details className="additional-work"><summary>More work across SaaS, telecom & healthcare <span aria-hidden="true">+</span></summary>{additional.map(project => <article key={project.title}><p className="work-category">{project.company}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div></article>)}</details>
      </div>
    </section>
  );
}
