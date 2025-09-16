import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './styles/index.css'
import '98.css'
import F1DataProject from './components/F1DataProject.tsx'
import Bookshelf from './components/Bookshelf.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/f1-data-viz" Component={F1DataProject} />
        <Route path="/3fiber" Component={Bookshelf} />
      </Routes>
    </Router>
  </StrictMode>,
)
