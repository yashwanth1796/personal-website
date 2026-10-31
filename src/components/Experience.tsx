import experiences from "@/data/experiences.json";

function Role({ exp }: { exp: typeof experiences[number] }) {
  return (
    <article className="career-row">
      <div className="career-period"><p>{exp.period}</p></div>
      <div className="career-content">
        <h3>{exp.company}</h3><p className="career-role">{exp.role}</p>
        <details><summary>What I worked on <span aria-hidden="true">+</span></summary>
          <p className="career-description">{exp.description}</p>
          <ul>{exp.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
          <div className="tag-list">{exp.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
        </details>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-space">
      <div className="section-heading"><h2 className="section-title">Where I’ve been.</h2></div>
      <div className="career-list">{experiences.slice(0, 3).map(exp => <Role key={exp.company} exp={exp} />)}</div>
      <details className="additional-work"><summary>Earlier roles <span aria-hidden="true">+</span></summary>
        {experiences.slice(3).map(exp => <Role key={exp.company} exp={exp} />)}
      </details>
    </section>
  );
}
