import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme.ts'
import { Toaster } from 'react-hot-toast'
import { BsWhatsapp } from 'react-icons/bs'
import GlobalStyles from './styles/global.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" />
        <GlobalStyles />
        <App />
        <a
          href="https://wa.me/5519999900511?text=Ol%C3%A1%21+Tudo+bem%3F"
          className="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Whatsapp"
        >
          <BsWhatsapp size={24} />
        </a>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
