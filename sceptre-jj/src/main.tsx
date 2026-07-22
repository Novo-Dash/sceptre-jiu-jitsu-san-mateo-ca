import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { AppV2 } from './v2/AppV2'
import { BackToSchoolPage } from './back-to-school/BackToSchoolPage'

// Lightweight path-based routing. Vercel already rewrites all routes to index.html.
//   /v2               → V2 landing page
//   /back-to-school   → Back to School kids landing page
//   everything else   → main LP
const path = window.location.pathname.replace(/\/+$/, '')

function Root() {
  if (path === '/v2') return <AppV2 />
  if (path === '/back-to-school') return <BackToSchoolPage />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
