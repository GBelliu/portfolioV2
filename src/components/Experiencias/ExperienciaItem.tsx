import { ItemContainer } from './styles';

interface ExperienciaProps {
  year: string;
  title: string;
  description: string;
}

export default function ExperienciaItem({
  year,
  title,
  description
}: ExperienciaProps) {
  return (
    <ItemContainer data-aos="fade-up" target='_blank' href='https://www.linkedin.com/in/guilhermebellissimobarbosa/details/experience/'>
      <div>
        <h1>{year}</h1>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </ItemContainer>
  );
}
