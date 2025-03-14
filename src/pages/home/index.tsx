
import { Helmet } from "react-helmet";

import { useRef } from "react";
import LoadingBar from 'react-top-loading-bar';
import { HomeContainer } from '../../styles/HomeStyles';
import Conhecimentos from '../../components/Conhecimentos';
import Experiencias from '../../components/Experiencias';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { HomeHero } from '../../components/HomeHero';
import theme from '../../styles/theme';
import Projetos from "../../components/Projetos";


function Home() {
  const loadingBarRef = useRef(null);

  return (

    <HomeContainer>
      <LoadingBar
        color={theme.primary}
        ref={loadingBarRef}
        height={3}
      />
      <Helmet>
        <title>Home | Portfólio</title>

        <meta
          name="description"
          content="Sou um desenvolvedor Front-end e aqui apresento alguns projetos desenvolvidos por mim!"
        />
        <meta name="author" content="Guilherme Bellissimo Barbossa" />
        <meta property="og:image" content="/ogimage.png" />
        <meta property="og:image:secure_url" content="/ogimage.png" />
        <meta name="twitter:image" content="/ogimage.png" />
        <meta name="twitter:image:src" content="/ogimage.png" />
        <meta
          property="og:description"
          content="Sou um desenvolvedor Front-end e aqui apresento alguns projetos desenvolvidos por mim!"
        />
      </Helmet>
      <Header />
      <main className="container">
        <HomeHero />
        <Experiencias />
        <Projetos />
        <Conhecimentos />

      </main>
      <Footer />
    </HomeContainer>

  )
}

export default Home
