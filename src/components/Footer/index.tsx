import {
  AiFillInstagram,
  AiOutlineGithub,
  AiFillLinkedin
} from 'react-icons/ai';
import { Container } from './styles';

export default function Footer() {
  function handleRedirect(url: string) {
    window.open(url);
  }

  function handleScrollTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <Container>
      <div className="container">
        <button type="button" onClick={handleScrollTop}>
          Voltar ao topo
        </button>
        <section>
          <AiOutlineGithub
            onClick={() => handleRedirect('https://github.com/GBelliu')}
          />
          <AiFillLinkedin
            onClick={() => handleRedirect('https://www.linkedin.com/in/guilhermebellissimobarbosa/')}
          />
          <AiFillInstagram
            onClick={() =>
              handleRedirect('https://www.instagram.com/guibellissimo/')
            }
          />
          {/* <RiTwitchFill
            onClick={() => handleRedirect('https://www.twitch.tv/gbelliu')}
          /> */}
        </section>
      </div>
    </Container>
  );
}
