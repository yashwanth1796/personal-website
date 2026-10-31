import experiences from "@/data/experiences.json";

export default function Experience() {
  return (
    <section id="experience" className="section-space">
      <div className="shell">
        <div className="section-heading"><div><p className="section-label">02 / Experience</p><h2 className="section-title">A decade of building.<br />Always moving forward.</h2></div><a href="/Resume - FullStack.pdf" download className="text-link">Download full-stack resume <span aria-hidden="true">↓</span></a></div>
        <div className="career-list">{experiences.map(exp => (
          <article className="career-row" key={exp.company}>
            <div className="career-period"><p>{exp.period}</p><span>{exp.location}</span>{exp.current && <span className="current-badge">Current role</span>}</div>
            <div className="career-content"><h3>{exp.company}</h3><p className="career-role">{exp.role}</p><p className="career-description">{exp.description}</p><details open={exp.current}><summary>Contributions <span aria-hidden="true">+</span></summary><ul>{exp.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></details><div className="tag-list">{exp.tech.map(tech => <span key={tech}>{tech}</span>)}</div></div>
          </article>
        ))}</div>
      </div>
    </section>
  );
}
