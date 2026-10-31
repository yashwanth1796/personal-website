export default function Hero() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="section-label">Hi, I’m Yashwanth.</p>
      <h2 id="intro-title">I build web apps.<br /><span>And make them easier to use.</span></h2>
      <p className="intro-description">Currently at <a href="#experience">SurveyMonkey</a>, building the tools people use to create surveys.</p>
      <div className="intro-actions"><a className="intro-primary" href="#projects">See my work <span aria-hidden="true">↘</span></a><a className="text-link" href="#contact">Get in touch <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
