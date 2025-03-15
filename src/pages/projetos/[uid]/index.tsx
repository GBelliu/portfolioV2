import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjetoByUid } from '../../../services/projeto';
import { IProjeto, IProjetoItem } from '../../../components/Projetos';
import { ProjetoContainer } from '../../../styles/ProjetoStyles';
import { Helmet } from 'react-helmet';
import { Header } from '../../../components/Header';
import BannerProjeto from '../../../components/BannerProjeto';


const ProjetoPage: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [projeto, setProjeto] = useState<IProjeto>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid) {
          const data = await fetchProjetoByUid(uid);
          const formattedProjeto = data.results.map((item: IProjetoItem) => ({
            id: item.id,
            uid: item.uid,
            title: item.data.teste.title.value,
            type: item.data.teste.type.value,
            description: item.data.teste.description.value,
            link: item.data.teste.link.value.url,
            thumbnail: item.data.teste.thumbnail.value.main.url,
          }));
          setProjeto(formattedProjeto[0]);
        }
      } catch (error) {
        console.error('Failed to load projetos:', error);
      }
    };

    fetchData();
  }, [uid]);


  if (!projeto) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <ProjetoContainer>
      <Helmet>
        <title>{projeto.title} | Portfólio</title>

        <meta name="description" content={projeto.description} />
        <meta property="og:image" content={projeto.thumbnail} />
        <meta property="og:image:secure_url" content={projeto.thumbnail} />
        <meta name="twitter:image" content={projeto.thumbnail} />
        <meta name="twitter:image:src" content={projeto.thumbnail} />
        <meta property="og:description" content={projeto.description} />
      </Helmet>
      <Header />
      <BannerProjeto
        title={projeto.title}
        type={projeto.type}
        imgUrl={projeto.thumbnail}
      />
      <main>
        <p>{projeto.description}</p>

        <button type="button">
          <a href={projeto.link} target='_blank'>Ver projeto online</a>
        </button>
      </main>
    </ProjetoContainer>
  );
};

export default ProjetoPage;