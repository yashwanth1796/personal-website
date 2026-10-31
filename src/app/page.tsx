import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="portfolio-layout">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
