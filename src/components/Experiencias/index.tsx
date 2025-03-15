import SectionTitle from '../SectionTitle';
import ExperienciaItem from './ExperienciaItem';
import { Container } from './styles';

function Experiencias() {
  return (
    <Container>
      <SectionTitle title="04 anos" description="de experiência" />
      <section>
        <ExperienciaItem
          year="2021 - 2022"
          title="Estagiário de Dev Web & Dev Front-end"
          description="Atuação no front-end com HTML, CSS, JS, Tailwind, Blade (PHP) e React/Next.js, incluindo criação de Landing Pages."
        />
        <ExperienciaItem
          year="2022"
          title="Dev Front-end Jr"
          description="Desenvolvimento de ferramenta para automatizar atendimento e vendas com React, Redux, TypeScript e Bootstrap."
        />
        <ExperienciaItem
          year="2022 - 2023"
          title="Dev Web"
          description="Criação e gerenciamento de protótipos (Figma), e sites (React.js | Next.js | WordPress) para clientes da agência."
        />
        <ExperienciaItem
          year="2024"
          title="Dev Web"
          description="Desenvolvimento de sites usando React.js, Next.js e TypeScript para empresas do Grupo MNGT"
        />
        <ExperienciaItem
          year="2024 - 2025"
          title="Dev Web"
          description="Desenvolvimento do front-end da plataforma de crédito solar da Desperta Energia, usando JS/TS, React, Next.js, GraphQL e demais tecnologias."
        />
      </section>
    </Container>
  );
}

export default Experiencias;
