import SectionTitle from '../SectionTitle';
// import ProjetoItem from './ProjetoItem';
import { Container } from './styles';

// interface IProjeto {
//   slug: string;
//   title: string;
//   type: string;
//   description: string;
//   link: string;
//   thumbnail: string;
// }

// interface ProjetosProps {
//   projetos: IProjeto[];
// }
export default function Projetos() {
  return (
    <Container>
      <SectionTitle title="Ultimos projetos" />
      <section>
        {/* {projetos.map(projeto => (
          <ProjetoItem
            key={projeto.slug}
            title={projeto.title}
            type={projeto.type}
            slug={projeto.slug}
            img={projeto.thumbnail}
          />
        ))} */}
      </section>
      <button type="button">
        <a href="/projetos">
          <p>Ver todos os projetos</p>
        </a>
      </button>
    </Container>
  );
}
