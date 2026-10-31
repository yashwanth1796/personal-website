export default function Hero() {
  return (
    <section className="hero px-6" aria-labelledby="hero-title">
      <div className="max-w-6xl mx-auto">
        <div className="hero-topline">
          <p>YASHWANTH KUMAR VANDANAPU</p>
          <p className="availability"><span aria-hidden="true" /> Available for opportunities</p>
        </div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Senior software engineer · Toronto, Canada</p>
            <h1 id="hero-title">Thoughtful code.<br /><em>Lasting impact.</em></h1>
            <p className="hero-description">I build accessible web experiences and intelligent tools that make complex work feel simple.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#projects" className="primary-link">Explore my work <span aria-hidden="true">↗</span></a>
              <a href="#contact" className="secondary-link">Let’s talk <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside className="hero-note" aria-label="Areas of expertise">
            <span className="note-index">01 / THE PRACTICE</span>
            <p>From the interface<br />to the intelligence<br /><em>behind it.</em></p>
            <ul>
              <li><span>01</span> Front-end architecture</li>
              <li><span>02</span> Full-stack platforms</li>
              <li><span>03</span> AI & LLM integrations</li>
            </ul>
            <a href="#experience" className="note-footer">7+ years building for the web <span aria-hidden="true">↓</span></a>
          </aside>
        </div>
        <div className="hero-bottomline"><span>REACT / NEXT.JS / TYPESCRIPT / AI</span><a href="#about">A little about me <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
