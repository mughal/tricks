import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cafe from './Cafe.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cafe />
  </StrictMode>,
)
