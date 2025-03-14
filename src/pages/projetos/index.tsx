import { Helmet } from 'react-helmet';
import { ProjetosContainer } from '../../styles/ProjetosStyles';
import { Header } from '../../components/Header';



// interface IProjeto {
//   slug: string;
//   title: string;
//   type: string;
//   description: string;
//   link: string;
//   thumbnail: string;
// }

// interface ProjetoProps {
//   projetos: IProjeto[];
// }

export default function Projetos() {
  return (
    <ProjetosContainer>
      <Helmet>
        <title>Projetos | Portfólio</title>

        <meta
          name="description"
          content="Sou um desenvolvedor Front-end e aqui apresento alguns projetos desenvolvidos por mim!"
        />
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
        {/* {projetos.map(projeto => (
          <ProjetoItem
            key={projeto.slug}
            title={projeto.title}
            type={projeto.type}
            slug={projeto.slug}
            imgUrl={projeto.thumbnail}
          />
        ))} */}
      </main>
    </ProjetosContainer>
  );
}

