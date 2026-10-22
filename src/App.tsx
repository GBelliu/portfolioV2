import { useCallback, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { Loader } from './components/Loader/Loader';
import { Header } from './components/Header/Header';
import { Stage } from './components/Stage/Stage';
import { Services } from './components/Services/Services';
import { Projects } from './components/Projects/Projects';
import { Career } from './components/Career/Career';
import { Process } from './components/Process/Process';
import { Stack } from './components/Stack/Stack';
import { Terminal } from './components/Terminal/Terminal';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Marquee } from './components/ui/Marquee';

const strip = ['landing pages', 'sites institucionais', 'e-commerce', 'tracking', 'SEO técnico', 'animações'];

export function App() {
  const [ready, setReady] = useState(false);

  const onLoaded = useCallback(() => {
    setReady(true);
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Loader onDone={onLoaded} />
      <Header />
      <main>
        <Stage ready={ready} />
        <Services />
        <Marquee className="strip" items={strip} separator="✦" />
        <Projects />
        <Career />
        <Process />
        <Stack />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
