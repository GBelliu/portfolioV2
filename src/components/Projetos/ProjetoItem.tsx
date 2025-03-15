import { AiOutlineRightCircle } from 'react-icons/ai';
import { ProjetoContainer } from './styles';

interface ProjetoProps {
  title: string;
  type: string;
  uid: string;
  img: string;
}

export default function ProjetoItem({ title, type, uid, img }: ProjetoProps) {
  return (
    <ProjetoContainer imgUrl={img} data-aos="fade-up">
      <section>
        <div className="overlay" />
        <div className="text">
          <h1># {title}</h1>
          <h2>- {type}</h2>
        </div>
      </section>
      <button type="button">
        <a href={`/projetos/${uid}`}>
          <p>
            Ver mais <AiOutlineRightCircle />
          </p>
        </a>
      </button>
    </ProjetoContainer>
  );
}
