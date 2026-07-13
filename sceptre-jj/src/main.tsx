import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { AppV2 } from './v2/AppV2'

// Lightweight path-based routing — /v2 serves the V2 landing page, everything
// else serves the main LP. Vercel already rewrites all routes to index.html.
const isV2 = window.location.pathname.replace(/\/+$/, '') === '/v2'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isV2 ? <AppV2 /> : <App />}
  </StrictMode>,
)
