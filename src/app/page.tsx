import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import OpenSource from "@/components/OpenSource";
import Testimonials from "@/components/Testimonials";
import FollowBuild from "@/components/FollowBuild";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Terminal />
        <Projects />
        <Certificates />
        <Experience />
        <Services />
        <OpenSource />
        <Testimonials />
        <FollowBuild />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
