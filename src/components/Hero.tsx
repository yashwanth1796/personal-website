const outcomes = [
  { value: "30%", label: "less code redundancy", company: "SurveyMonkey", href: "#work-surveymonkey" },
  { value: "40%", label: "fewer defects", company: "Canada Life", href: "#work-canada-life-digital-hub" },
  { value: "25%", label: "workflow efficiency gain", company: "CITI Bank", href: "#work-citi-bank" },
];
export default function Hero() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro-top"><span className="section-label">ARCHITECTURE / PRODUCT / PEOPLE</span><span className="intro-note">10 YEARS OF EXPERIENCE</span></div>
      <h2 id="intro-title">I make complex software<br /><span>work better for people.</span></h2>
      <p className="intro-description">I’m a hands-on engineer working across interfaces, APIs, and the systems that connect them. At <a href="#experience">SurveyMonkey</a>, I build shared front-end foundations and bring AI into production workflows.</p>
      <p className="intro-secondary">My focus: clear architecture, accessible experiences, and helping engineers ship with confidence.</p>
      <div className="intro-actions"><a className="intro-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a><a className="text-link" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a></div>
      <div className="outcomes" aria-label="Selected outcomes from my experience">{outcomes.map(outcome => <a key={outcome.company} href={outcome.href}><strong>{outcome.value}</strong><p>{outcome.label}</p><span>{outcome.company} <span aria-hidden="true">↗</span></span></a>)}</div>
    </section>
  );
}
