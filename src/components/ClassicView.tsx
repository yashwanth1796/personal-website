import Image from "next/image";
import Link from "next/link";
import { lanes, minorSideProjects, projectList, sideProjects, SIDE_COLOR, stations } from "@/lib/transit";
import CopyButton from "./CopyButton";
import ViewToggle from "./ViewToggle";

const firstYear = Math.min(...stations.map(s => Number(s.period.match(/\d{4}/)?.[0] ?? 9999)));
const years = new Date().getFullYear() - firstYear;
const results = projectList.filter(p => p.outcome).map(p => ({ outcome: p.outcome!, company: p.company }));
const laneCounts = lanes.map(l => ({ ...l, count: stations.filter(s => s.lanes.includes(l.id)).length }));
const FEATURED = "pennytogether";

function Chev() {
  return <svg className="chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Arrow() {
  return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M5.5 3.5h7v7M12.5 3.5l-9 9" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ClassicView({ showWriting }: { showWriting: boolean }) {
  const roles = [...stations].reverse();
  const featured = sideProjects.find(p => p.id === FEATURED);
  const others = sideProjects.filter(p => p.id !== FEATURED).reverse();

  return (
    <div className="classic">
      <header className="classic-top">
        <div className="id">
          <h1>Yashwanth Kumar Vandanapu</h1>
          <p>Senior Software Engineer, Toronto</p>
        </div>
        <nav aria-label="Links" className="hud-links">
          <ViewToggle />
          {showWriting && <Link href="/blog" prefetch={false} className="hud-secondary">Writing</Link>}
          <a className="hud-secondary" href="https://github.com/yashwanth1796" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="hud-secondary" href="https://linkedin.com/in/Yashwanth-Vandanapu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="hud-resume" href="/Resume - Frontend.pdf" download>Resume</a>
          <a className="cta" href="#contact">Contact</a>
        </nav>
      </header>

      <section className="intro" aria-labelledby="intro-title">
        <h2 id="intro-title">I build React and Next.js products for large teams: shared UI foundations, accessible interfaces, and AI features that ship.</h2>
        <p className="intro-facts"><span>{years}+ years</span><span>{stations.length} companies</span><span>Canada and India</span><span>Mentors engineers</span></p>
        <p className="intro-ai">Works AI-first every day with Claude Code, Codex, Cursor and GitHub Copilot.</p>
        <ul className="intro-results" aria-label="Results">
          {results.map(r => (
            <li key={r.outcome}><strong>{r.outcome}</strong><span>{r.company}</span></li>
          ))}
        </ul>
        <div className="intro-actions">
          <a className="btn-primary" href="mailto:yashwanth.vandanapu@gmail.com">Email me</a>
          <CopyButton value="yashwanth.vandanapu@gmail.com" label="Copy email" className="copy-btn copy-btn-pill" />
          <a className="btn-secondary" href="/Resume - Frontend.pdf" download>Download resume</a>
          <a className="text-alt" href="/Resume - FullStack.pdf" download>Full-stack version</a>
        </div>
      </section>

      <div className="classic-body">
        <aside className="classic-side-nav" aria-label="On this page">
          <nav>
            <a href="#experience">Experience</a>
            <a href="#side-projects">Side projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="line-key">
            <p>Lines</p>
            <ul>
              {laneCounts.map(l => (
                <li key={l.id} style={{ "--c": l.color } as React.CSSProperties}>
                  <span className="swatch" aria-hidden="true" />{l.label}<span className="count">{l.count} {l.count === 1 ? "role" : "roles"}</span>
                </li>
              ))}
              <li style={{ "--c": SIDE_COLOR } as React.CSSProperties}>
                <span className="swatch" aria-hidden="true" />Side projects<span className="count">{sideProjects.length}</span>
              </li>
            </ul>
          </div>
        </aside>

        <div className="classic-main">
          <section id="experience" className="block" aria-labelledby="experience-title">
            <h2 id="experience-title" className="block-title">Experience</h2>
            <ol className="tl">
              {roles.map(role => (
                <li key={role.id} className="tl-item" data-current={role.current || undefined}>
                  <span className="tl-stop" aria-hidden="true">
                    {lanes.filter(l => role.lanes.includes(l.id)).map(l => <i key={l.id} style={{ background: l.color }} />)}
                  </span>
                  <div className="tl-head">
                    <h3>{role.company}</h3>
                    {role.current && <span className="tag-now">Now</span>}
                    <p className="tl-years">{role.years.replace("–", " – ")}</p>
                  </div>
                  <p className="tl-role">{role.role}, {role.region}{role.employment && <span className="tag-contract">{role.employment}</span>}</p>
                  <p className="tl-summary">{role.summary}</p>
                  <ul className="chips" aria-label="Technologies">
                    {lanes.filter(l => role.lanes.includes(l.id)).map(l => (
                      <li key={l.id} style={{ "--c": l.color } as React.CSSProperties}>{l.label}</li>
                    ))}
                  </ul>
                  {role.projects.length > 0 && (
                    <ul className="tl-projects" aria-label={`Projects at ${role.company}`}>
                      {role.projects.map(project => (
                        <li key={project.id}>
                          <details>
                            <summary>
                              <span className="p-dot" aria-hidden="true" />
                              <span className="p-title">{project.title}</span>
                              {project.outcome && <span className="p-outcome">{project.outcome}</span>}
                              <Chev />
                            </summary>
                            <div className="p-body">
                              <p>{project.description}</p>
                              {project.caseStudy && (
                                <dl className="case-study">
                                  <div><dt>Problem</dt><dd>{project.caseStudy.problem}</dd></div>
                                  <div><dt>My role</dt><dd>{project.caseStudy.role}</dd></div>
                                  <div><dt>Key decisions</dt><dd><ul>{project.caseStudy.decisions.map(item => <li key={item}>{item}</li>)}</ul></dd></div>
                                  <div><dt>Result</dt><dd>{project.caseStudy.result}</dd></div>
                                </dl>
                              )}
                              <p className="p-tech">{project.tech.join(", ")}</p>
                            </div>
                          </details>
                        </li>
                      ))}
                    </ul>
                  )}
                  <details className="tl-more">
                    <summary>What I did <Chev /></summary>
                    <ul>{role.highlights.map(item => <li key={item}>{item}</li>)}</ul>
                  </details>
                </li>
              ))}
            </ol>
          </section>

          <section id="side-projects" className="block" aria-labelledby="side-title">
            <h2 id="side-title" className="block-title">Side projects</h2>
            {featured && (
              <article className="featured">
                <div>
                  <h3>{featured.title} <span className="tag-featured">Featured</span></h3>
                  <p className="sp-years">{featured.years}</p>
                  <p className="sp-desc">{featured.description}</p>
                  {featured.images && featured.images.length > 0 && (
                    <div className="shots">{featured.images.map(img => <Image key={img.src} src={img.src} alt={img.alt} width={1600} height={830} sizes="(max-width: 720px) 80vw, 340px" />)}</div>
                  )}
                  {(featured.problem || featured.how) && (
                    <dl className="explain">
                      {featured.problem && <div><dt>The problem</dt><dd>{featured.problem}</dd></div>}
                      {featured.how && <div><dt>How it works</dt><dd>{featured.how}</dd></div>}
                    </dl>
                  )}
                  <ul className="featured-points">{featured.highlights.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="featured-foot">
                  <p className="sp-tech">{featured.tech.join(", ")}</p>
                  <a className="btn-primary" href={featured.link} target="_blank" rel="noopener noreferrer">{featured.linkLabel} <Arrow /></a>
                </div>
              </article>
            )}
            <ul className="sp-grid">
              {others.map(item => (
                <li key={item.id}>
                  {(() => {
                    const body = (
                      <>
                        <h3>{item.title}{item.ai && <span className="tag-ai">AI</span>}{item.link && <Arrow />}</h3>
                        <p className="sp-years">{item.years}</p>
                        <p className="sp-desc">{item.description}</p>
                        {(item.problem || item.how) && (
                          <dl className="explain explain-compact">
                            {item.problem && <div><dt>The problem</dt><dd>{item.problem}</dd></div>}
                            {item.how && <div><dt>How it works</dt><dd>{item.how}</dd></div>}
                          </dl>
                        )}
                        {item.tech.length > 0 && <p className="sp-tech">{item.tech.join(", ")}</p>}
                        {item.link ? <span className="sr-only">{item.linkLabel}</span> : <p className="sp-private">Private repository. Demo on request.</p>}
                      </>
                    );
                    return item.link
                      ? <a className="sp-card" href={item.link} target="_blank" rel="noopener noreferrer">{body}</a>
                      : <div className="sp-card sp-card-static">{body}</div>;
                  })()}
                </li>
              ))}
            </ul>
            {minorSideProjects.length > 0 && (
              <details className="archive">
                <summary>Earlier experiments ({minorSideProjects.length}) <Chev /></summary>
                <ul>
                  {minorSideProjects.map(item => (
                    <li key={item.id}>
                      <a href={item.link} target="_blank" rel="noopener noreferrer"><strong>{item.title}</strong></a>
                      <span>{item.years}. {item.description}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        </div>
      </div>

      <section id="contact" className="terminus-band" aria-labelledby="contact-title">
        <div className="terminus-inner">
          <h2 id="contact-title">Next stop: your team</h2>
          <p>Hiring a senior front-end or full-stack engineer? Let’s talk.</p>
          <div className="intro-actions">
            <a className="btn-primary btn-invert" href="mailto:yashwanth.vandanapu@gmail.com">Email me</a>
            <a className="btn-secondary btn-ghost" href="/Resume - Frontend.pdf" download>Download resume</a>
            <a className="text-alt text-alt-invert" href="/Resume - FullStack.pdf" download>Full-stack version</a>
          </div>
          <p className="terminus-email">yashwanth.vandanapu@gmail.com</p>
          <div className="copy-row copy-row-invert">
            <CopyButton value="yashwanth.vandanapu@gmail.com" label="Copy email" />
            <CopyButton value="https://linkedin.com/in/Yashwanth-Vandanapu" label="Copy LinkedIn" />
            <CopyButton value="https://github.com/yashwanth1796" label="Copy GitHub" />
          </div>
          <p className="terminus-links">
            <a href="https://linkedin.com/in/Yashwanth-Vandanapu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/yashwanth1796" target="_blank" rel="noopener noreferrer">GitHub</a>
            {showWriting && <Link href="/blog" prefetch={false}>Writing</Link>}
          </p>
        </div>
      </section>
    </div>
  );
}
