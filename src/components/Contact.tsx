"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "yashwanth.vandanapu@gmail.com",
    href: "mailto:yashwanth.vandanapu@gmail.com",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "416-820-5970",
    href: "tel:4168205970",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "Yashwanth Vandanapu",
    href: "https://linkedin.com/in/Yashwanth-Vandanapu",
  },
];

export default function Contact() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: resumeRef, isVisible: resumeVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.5 });

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-accent font-mono text-sm tracking-wider mb-4 uppercase">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            I&apos;m currently open to new opportunities. Whether you have a project in mind 
            or just want to connect, I&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Methods */}
        <div 
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, index) => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group p-6 bg-slate-dark/50 rounded-2xl border border-slate-medium hover:border-accent transition-all text-center card-hover ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms",
                transitionDuration: "600ms"
              }}
            >
              <div className="inline-flex p-4 bg-slate-medium rounded-xl text-text-secondary group-hover:bg-accent/20 group-hover:text-accent transition-all mb-4 group-hover:scale-110 icon-bounce">
                {method.icon}
              </div>
              <p className="text-text-muted text-sm uppercase tracking-wider mb-1">{method.label}</p>
              <p className="text-text-primary font-medium group-hover:text-accent transition-colors">
                {method.value}
              </p>
            </a>
          ))}
        </div>

        {/* Resume Downloads */}
        <div 
          ref={resumeRef as React.RefObject<HTMLDivElement>}
          className={`p-8 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl border border-accent/20 transition-all duration-700 ${
            resumeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Download My Resume</h3>
            <p className="text-text-secondary">
              Get a detailed overview of my experience and qualifications
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/Resume - Frontend.pdf"
              download
              className={`group flex items-center gap-3 px-6 py-4 bg-accent text-midnight font-semibold rounded-xl hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/20 w-full sm:w-auto justify-center btn-ripple hover:scale-105 ${
                resumeVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: resumeVisible ? "200ms" : "0ms", transitionDuration: "500ms" }}
            >
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Frontend Resume
            </a>
            <a
              href="/Resume - FullStack.pdf"
              download
              className={`group flex items-center gap-3 px-6 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-all hover:shadow-lg hover:shadow-secondary/20 w-full sm:w-auto justify-center btn-ripple hover:scale-105 ${
                resumeVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
              style={{ transitionDelay: resumeVisible ? "300ms" : "0ms", transitionDuration: "500ms" }}
            >
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Full Stack Resume
            </a>
          </div>
        </div>

        {/* CTA */}
        <div 
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`text-center mt-12 transition-all duration-700 ${
            ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <a
            href="mailto:yashwanth.vandanapu@gmail.com?subject=Let's Work Together"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-dark border border-slate-medium rounded-xl text-text-primary font-semibold hover:border-accent hover:text-accent transition-all hover:scale-105 btn-ripple group"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Me a Message
          </a>
        </div>
      </div>
    </section>
  );
}
