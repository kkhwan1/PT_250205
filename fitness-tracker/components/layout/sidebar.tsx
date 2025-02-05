import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  BarChart,
  Dumbbell,
  ClipboardList,
  Users,
  Settings,
  User,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
    role?: string[]
  }[]
}

export function Sidebar({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const filteredItems = items.filter((item) => {
    if (!item.role) return true
    return session?.user.role && item.role.includes(session.user.role)
  })

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {filteredItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2',
            pathname === item.href
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent hover:text-accent-foreground',
            className
          )}
        >
          {item.icon}
          <span className="ml-2">{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

export const defaultNavItems = [
  {
    href: '/dashboard',
    title: '대시보드',
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    href: '/workouts',
    title: '운동 계획',
    icon: <Dumbbell className="h-4 w-4" />,
  },
  {
    href: '/exercises',
    title: '운동 기록',
    icon: <ClipboardList className="h-4 w-4" />,
  },
  {
    href: '/clients',
    title: '회원 관리',
    icon: <Users className="h-4 w-4" />,
    role: ['TRAINER', 'ADMIN'],
  },
  {
    href: '/profile',
    title: '프로필',
    icon: <User className="h-4 w-4" />,
  },
  {
    href: '/settings',
    title: '설정',
    icon: <Settings className="h-4 w-4" />,
  },
] 