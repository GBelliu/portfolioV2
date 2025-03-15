import SectionTitle from '../SectionTitle';
// import ProjetoItem from './ProjetoItem';
import { Container } from './styles';
import { useEffect, useState } from 'react';
import { fetchProjetoData } from '../../services/projeto';
import ProjetoItem from './ProjetoItem';


export interface IProjeto {
  id: string;
  title: string;
  type: string;
  description: string;
  link: string;
  thumbnail: string;
  uid: string;
}

export interface IProjetoItem {
  id: string;
  uid: string;
  data: {
    teste: {
      title: { type: string; value: string };
      description: { type: string; value: string };
      type: { type: string; value: string };
      link: { type: string; value: { key: string; url: string } };
      thumbnail: {
        type: string;
        value: {
          main: { dimensions: { width: number; height: number }; url: string };
        };
      };
    };
  };
}

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
    <Container>
      <SectionTitle title="Ultimos projetos" />
      <section>
        {projetos.map(projeto => (
          <ProjetoItem
            key={projeto.id}
            title={projeto.title}
            type={projeto.type}
            uid={projeto.uid}
            img={projeto.thumbnail}
          />
        ))}
      </section>
      <button type="button">
        <a href="/projetos">
          <p>Ver todos os projetos</p>
        </a>
      </button>
    </Container>
  );
}
