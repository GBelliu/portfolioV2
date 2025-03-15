import { Container } from './styles';

interface ProjetoItemProps {
  title: string;
  type: string;
  imgUrl: string;
  uid: string;
}

export default function ProjetoItem({
  title,
  type,
  imgUrl,
  uid
}: ProjetoItemProps) {
  return (
    <Container imgUrl={imgUrl}>
      <a href={`/projetos/${uid}`}>
        <>
          <div className="overlay" />
          <section>
            <h1>{title}</h1>
            <h2>{type}</h2>
          </section>
        </>
      </a>
    </Container>
  );
}
