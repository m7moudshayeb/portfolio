import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { WelcomePage } from '@/pages/WelcomePage'
import { HomePage } from '@/pages/HomePage'
import { ContactPage } from '@/pages/ContactPage'
import { BlogListPage } from '@/pages/BlogListPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { CalendlyPage } from '@/pages/CalendlyPage'
import { WhiteboardPage } from '@/pages/WhiteboardPage'

/** First-time visitors (no persona chosen) go to welcome; returning go to app. */
function personaGuard() {
  const stored = localStorage.getItem('portfolio-persona')
  if (!stored) return null
  try {
    const { state } = JSON.parse(stored)
    if (state?.hasChosenPersona && state?.currentId) return state.currentId
  } catch {
    // ignore
  }
  return null
}

function rootLoader() {
  const hasPersona = personaGuard()
  if (!hasPersona) return redirect('/welcome')
  return null
}

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/',
    element: <AppShell />,
    loader: rootLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'calendly', element: <CalendlyPage /> },
      { path: 'whiteboard-session', element: <WhiteboardPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/welcome" replace /> },
])
