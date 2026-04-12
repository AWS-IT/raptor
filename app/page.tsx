import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Hero />
      <About />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-bg-quaternary">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} WebRaptor. Все права защищены.
          </p>
        </div>
      </footer>
    </main>
  );
}
