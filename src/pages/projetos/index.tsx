import { Helmet } from 'react-helmet';
import { ProjetosContainer } from '../../styles/ProjetosStyles';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { IProjeto, IProjetoItem } from '../../components/Projetos';
import { fetchProjetoData } from '../../services/projeto';
import ProjetoItem from '../../components/ProjetoItem';



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
  const [projetos, setProjetos] = useState<IProjeto[]>([]);

  useEffect(() => {
    async function loadProjetos() {
      try {
        const data = await fetchProjetoData();
        const formattedProjetos = data.results.map((item: IProjetoItem) => ({
          id: item.id,
          uid: item.uid,
          title: item.data.teste.title.value,
          type: item.data.teste.type.value,
          description: item.data.teste.description.value,
          link: item.data.teste.link.value.url,
          thumbnail: item.data.teste.thumbnail.value.main.url,
        }));
        setProjetos(formattedProjetos);
      } catch (error) {
        console.error('Failed to load projetos:', error);
      }
    }

    loadProjetos();
  }, []);
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
        {projetos.map(projeto => (
          <ProjetoItem
            key={projeto.id}
            title={projeto.title}
            type={projeto.type}
            uid={projeto.uid}
            imgUrl={projeto.thumbnail}
          />
        ))}
      </main>
    </ProjetosContainer>
  );
}

