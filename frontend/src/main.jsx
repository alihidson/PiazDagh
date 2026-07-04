import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.rtl.min.css' // Bootstrap RTL support
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap js bundle
import './styles/global.css' // global overrides + fonts
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)