import Aos from 'aos';
import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Projetos from './pages/projetos';
import ProjetoPage from './pages/projetos/[uid]';

function App() {

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path='/projetos/:uid' element={<ProjetoPage />} />
      {/* <Route path="/estudos" element={<Estudos />} /> */}
    </Routes>
  )
}

export default App
