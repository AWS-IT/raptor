import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';

/** Главная страница: логотип → направления с работами → обо мне → контакты. */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
