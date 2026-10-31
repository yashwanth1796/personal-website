export default function Contact() {
  return (
    <section id="contact" className="section-space contact-section">
      <h2 className="section-title">Have something in mind?</h2>
      <a className="contact-email" href="mailto:yashwanth.vandanapu@gmail.com">Email me <span aria-hidden="true">↗</span></a>
      <div className="contact-social"><a href="https://linkedin.com/in/Yashwanth-Vandanapu" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/yashwanth1796" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
      <details className="additional-work"><summary>Download my resume <span aria-hidden="true">+</span></summary>
        <div className="resume-options"><a className="text-link" href="/Resume - Frontend.pdf" download>Front-end ↓</a><a className="text-link" href="/Resume - FullStack.pdf" download>Full-stack ↓</a></div>
      </details>
    </section>
  );
}
