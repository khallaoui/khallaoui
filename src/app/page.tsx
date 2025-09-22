import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Education from '@/components/sections/education';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Certifications from '@/components/sections/certifications';
import Hobbies from '@/components/sections/hobbies';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
