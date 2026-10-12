import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { publicUrl } from './publicUrl'
import './index.css'

document.documentElement.style.setProperty(
  '--workspace-bg',
  `url(${publicUrl('cyberpunk-workspace.png')})`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
