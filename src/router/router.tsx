import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { WelcomePage } from '@/pages/welcome';
import { PersonaEntryPage } from '@/pages/persona-entry';
import { HomePage } from '@/pages/home';
import { ContactPage } from '@/pages/contact';
import { BlogListPage } from '@/pages/blog-list';
import { BlogPostPage } from '@/pages/blog-post';
import { CalendlyPage } from '@/pages/calendly';
import { WhiteboardPage } from '@/pages/white-board';

/** First-time visitors (no persona chosen) go to welcome; returning go to app. */
function personaGuard() {
  const stored = localStorage.getItem('portfolio-persona');
  if (!stored) return null;
  try {
    const { state } = JSON.parse(stored);
    if (state?.hasChosenPersona && state?.currentId) return state.currentId;
  } catch {
    // ignore
  }
  return null;
}

function rootLoader() {
  const hasPersona = personaGuard();
  if (!hasPersona) return redirect('/welcome');
  return null;
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
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
  {
    path: '/:persona',
    element: <PersonaEntryPage />,
  },
  { path: '*', element: <Navigate to='/welcome' replace /> },
]);
