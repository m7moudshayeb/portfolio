import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/calendly', label: 'Book a call' },
]

export function NavRecruiter() {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className="font-serif font-bold text-foreground">
        Mahmoud Shayeb
      </Link>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
