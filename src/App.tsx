import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/router'
import '@/theme'

export default function App() {
  return <RouterProvider router={router} />
}
