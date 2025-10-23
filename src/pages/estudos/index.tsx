import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import { useState } from 'react';
import Modal from '../../components/Modal';

const EstudosContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Área de seleção de blocos */
  .areas {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  .area-card {
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 0.5rem;
    padding: 1.25rem;
    background: ${({ theme }) => theme.backgroundLight};
    transition: 0.3s;
    cursor: pointer;
  }
  .area-card:hover {
    border-color: ${({ theme }) => theme.primary};
  }
  .area-card h3 {
    color: ${({ theme }) => theme.primary};
    font-size: 1.3rem;
    margin: 0 0 0.5rem 0;
  }
  .area-card p {
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
  }

  /* Cards de conteúdo */
  .card {
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 0.5rem;
    padding: 1.5rem;
    background: ${({ theme }) => theme.backgroundLight};
    transition: 0.3s;
    cursor: pointer;
  }
  .card:hover {
    border-color: ${({ theme }) => theme.primary};
  }

  .card h2 {
    color: ${({ theme }) => theme.primary};
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }

  .card p,
  .card li {
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
  }

  .card ul {
    padding-left: 1.25rem;
    display: grid;
    gap: 0.5rem;
  }

  .dicas {
    border-left: 4px solid ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.background};
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .back-btn {
    width: fit-content;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 0.4rem;
    padding: 0.5rem 0.75rem;
    background: ${({ theme }) => theme.backgroundLight};
    color: ${({ theme }) => theme.textHighlight};
    cursor: pointer;
    transition: 0.2s;
  }
  .back-btn:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

export default function Estudos() {
  const [activeArea, setActiveArea] = useState<null | 'direito'>(null);
  const [active, setActive] = useState<null | 'jusnaturalismo' | 'aristoteles' | 'maquiavel' | 'kant' | 'santomas'>(null);

  return (
    <EstudosContainer>
      <Helmet>
        <title>Estudos | Resumo de Direito - 2º semestre</title>
        <meta name="description" content="Resumo de Direito: jusnaturalismo, justiça corretiva e distributiva (Aristóteles), Maquiavel, Kant (imperativo categórico) e as leis de São Tomás." />
      </Helmet>
      <Header />
      <main className="container">
        {activeArea === null && (
          <>
            <SectionTitle title="Estudos" description="Selecione uma área" />
            <section className="areas">
              <article
                className="area-card"
                data-aos="fade-up"
                role="button"
                tabIndex={0}
                onClick={() => setActiveArea('direito')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveArea('direito')}
              >
                <h3>Direito</h3>
                <p>Resumo do 2º semestre: jusnaturalismo, Aristóteles, Maquiavel, Kant e São Tomás.</p>
              </article>
              {/* Espaço para futuras áreas: Filosofia, Economia, etc. */}
            </section>
          </>
        )}

        {activeArea === 'direito' && (
          <>
            <div className="actions">
              <SectionTitle title="Direito" description="Resumo do 2º semestre" />
              <button className="back-btn" onClick={() => setActiveArea(null)}>Voltar às áreas</button>
            </div>

            <article className="card" data-aos="fade-up" role="button" tabIndex={0} onClick={() => setActive('jusnaturalismo')} onKeyDown={(e) => e.key === 'Enter' && setActive('jusnaturalismo')}>
              <h2>Jusnaturalismo</h2>
              <ul>
                <li>Doutrina do direito natural: existem normas morais e jurídicas universais, conhecidas pela razão, anteriores e superiores ao direito positivo.</li>
                <li>Fundamentos: natureza humana e racionalidade; ideia de justiça como medida da validade das leis.</li>
                <li>Autores: estoicos; na Idade Média, São Tomás de Aquino; na modernidade, Grotius e Locke.</li>
                <li>Características: universalidade, imutabilidade relativa, vínculo com moral; o direito positivo deve conformar-se ao natural.</li>
                <li>Críticas: positivismo jurídico (Kelsen), que separa validade jurídica de conteúdo moral.</li>
              </ul>
            </article>

            <article className="card" data-aos="fade-up" role="button" tabIndex={0} onClick={() => setActive('aristoteles')} onKeyDown={(e) => e.key === 'Enter' && setActive('aristoteles')}>
              <h2>Aristóteles: justiça distributiva e corretiva</h2>
              <ul>
                <li>Justiça distributiva: distribui bens e encargos conforme mérito/posição, buscando proporcionalidade geométrica.</li>
                <li>Justiça corretiva: corrige desequilíbrios em transações e delitos, restaura igualdade aritmética entre as partes.</li>
                <li>Finalidade: preservar a equidade; o juiz aplica proporção/igualação conforme o caso.</li>
                <li>Exemplos: distributiva em repartição de recursos públicos; corretiva em indenizações.</li>
              </ul>
            </article>

            <article className="card" data-aos="fade-up" role="button" tabIndex={0} onClick={() => setActive('maquiavel')} onKeyDown={(e) => e.key === 'Enter' && setActive('maquiavel')}>
              <h2>Maquiavel</h2>
              <ul>
                <li>Realismo político: análise do poder como ele é, separando moral privada da razão de Estado.</li>
                <li>Virtù e fortuna: capacidade de agir com eficácia e de aproveitar circunstâncias.</li>
                <li>Meios e fins: a estabilidade do Estado pode justificar meios duros (tema polêmico e contextual).</li>
                <li>Relevância jurídica: legitimação institucional e manutenção da ordem; aproximações com positivismo e pragmatismo.</li>
              </ul>
            </article>

            <article className="card" data-aos="fade-up" role="button" tabIndex={0} onClick={() => setActive('kant')} onKeyDown={(e) => e.key === 'Enter' && setActive('kant')}>
              <h2>Kant: imperativo categórico</h2>
              <ul>
                <li>Primeira formulação: aja segundo máximas que possam valer como lei universal.</li>
                <li>Segunda formulação: trate a humanidade sempre como fim, nunca apenas como meio.</li>
                <li>Reino dos fins e autonomia: dignidade humana como base da normatividade moral.</li>
                <li>Direito para Kant: regula liberdades externas por meio de coação legítima, distinguindo-se da moral (que opera na intenção).</li>
                <li>Aplicações: teste de universalização, respeito à dignidade, limites ao utilitarismo puro.</li>
              </ul>
            </article>

            <article className="card" data-aos="fade-up" role="button" tabIndex={0} onClick={() => setActive('santomas')} onKeyDown={(e) => e.key === 'Enter' && setActive('santomas')}>
              <h2>São Tomás de Aquino: tipos de lei</h2>
              <ul>
                <li>Lex aeterna: razão divina que governa o universo.</li>
                <li>Lex naturalis: participação da criatura racional na lei eterna; princípios de justiça inscritos na natureza humana.</li>
                <li>Lex humana: leis positivas humanas, devem derivar da lei natural; se injustas, não obrigam no foro íntimo.</li>
                <li>Lex divina: revelada (Antigo e Novo Testamento), aperfeiçoa a lei natural.</li>
                <li>Hierarquia e prudência: o legislador deve aproximar a lei humana da justiça natural.</li>
              </ul>
            </article>
          </>
        )}
      </main>

      {/* Modais detalhados da área de Direito */}
      <Modal isOpen={active === 'jusnaturalismo'} title="Jusnaturalismo" onClose={() => setActive(null)}>
        <p>O jusnaturalismo sustenta que há princípios de justiça válidos universalmente, anteriores e superiores ao direito positivo, discerníveis pela razão humana. Ele orienta a avaliação da legitimidade das leis, pedindo sua conformidade com padrões morais racionais.</p>
        <h4>Marcos históricos</h4>
        <ul>
          <li>Antiguidade: estoicos concebem uma lei comum a todos (logos).</li>
          <li>Medieval: São Tomás integra lei natural na ordem divina (lex aeterna).</li>
          <li>Moderno: Grotius e Locke secularizam e associam a direitos individuais.</li>
        </ul>
        <h4>Debate contemporâneo</h4>
        <p>O positivismo jurídico (Kelsen) separa validade formal de conteúdo moral. Correntes pós-positivistas reaproximam direito e moral com princípios (Dworkin) e proporcionalidade.</p>
      </Modal>

      <Modal isOpen={active === 'aristoteles'} title="Aristóteles: justiça" onClose={() => setActive(null)}>
        <p>A justiça, para Aristóteles, visa manter a equidade nas relações sociais.</p>
        <h4>Distributiva</h4>
        <p>Distribui bens/encargos conforme mérito, função ou necessidade, usando proporcionalidade geométrica. Evita favorecimentos arbitrários.</p>
        <h4>Corretiva</h4>
        <p>Restaura igualdade aritmética em trocas e delitos: repara o dano, reequilibra as partes, sem considerar méritos prévios.</p>
        <h4>Exemplos</h4>
        <ul>
          <li>Distributiva: bolsas estudantis conforme critérios transparentes.</li>
          <li>Corretiva: indenização por danos materiais/morais proporcional ao prejuízo.</li>
        </ul>
      </Modal>

      <Modal isOpen={active === 'maquiavel'} title="Maquiavel" onClose={() => setActive(null)}>
        <p>Maquiavel analisa o poder politicamente, destacando a autonomia da razão de Estado em relação à moral privada.</p>
        <h4>Virtù e fortuna</h4>
        <p>Virtù: capacidade do governante de agir com eficácia. Fortuna: circunstâncias externas. O bom governo combina ambos.</p>
        <h4>Direito e instituições</h4>
        <p>Instituições fortes sustentam estabilidade. Medidas duras podem ser justificadas pela preservação do Estado, tema que exige controle jurídico e limites republicanos.</p>
      </Modal>

      <Modal isOpen={active === 'kant'} title="Kant: imperativo categórico" onClose={() => setActive(null)}>
        <p>Normas morais são universais e derivam da razão prática. O imperativo categórico fornece critérios de avaliação das máximimas.</p>
        <h4>Formulações</h4>
        <ul>
          <li>Universalização: agir por máximas que possam ser lei universal.</li>
          <li>Dignidade: tratar a humanidade sempre como fim, nunca só como meio.</li>
          <li>Autonomia: agentes racionais como legisladores de si mesmos.</li>
        </ul>
        <h4>Direito em Kant</h4>
        <p>O direito regula liberdades externas por meio de coação legítima, distinto da moral (que opera sobre a intenção). Impacta direitos fundamentais e limites ao utilitarismo.</p>
      </Modal>

      <Modal isOpen={active === 'santomas'} title="São Tomás de Aquino: leis" onClose={() => setActive(null)}>
        <p>Estrutura quadri-partida das leis no pensamento tomista, com hierarquia entre lei eterna, natural, humana e divina.</p>
        <ul>
          <li><strong>Lex aeterna</strong>: razão divina que ordena a criação.</li>
          <li><strong>Lex naturalis</strong>: participação da criatura racional na lei eterna.</li>
          <li><strong>Lex humana</strong>: normas positivas derivadas da lei natural; quando gravemente injustas, perdem obrigatoriedade moral.</li>
          <li><strong>Lex divina</strong>: revelação que aperfeiçoa a lei natural.</li>
        </ul>
        <p>O legislador prudente aproxima a lei humana dos princípios de justiça natural, assegurando bem comum e legitimidade.</p>
      </Modal>

      <Footer />
    </EstudosContainer>
  );
}