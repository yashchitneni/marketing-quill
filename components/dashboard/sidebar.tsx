'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Home,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Archive,
  Trash2,
  Linkedin,
  BookOpen,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: Home,
    id: 'home'
  },
  {
    title: 'My Drafts',
    href: '/dashboard?status=draft',
    icon: FileText,
    id: 'all-drafts'
  },
  {
    title: 'Published',
    href: '/dashboard?status=published',
    icon: CheckCircle,
    id: 'published'
  },
  {
    title: 'Templates',
    href: '/templates',
    icon: BookOpen,
    id: 'templates'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
    id: 'analytics'
  },
  {
    title: 'Published',
    href: '/dashboard?status=published',
    icon: BarChart3,
    id: 'published'
  },
  {
    title: 'Archived',
    href: '/dashboard?status=archived',
    icon: Archive,
    id: 'archived'
  }
]

const bottomItems = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    id: 'settings'
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle,
    id: 'help'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-gray-50 border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
            <Linkedin className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-xl font-bold">LinkedIn</span>
              <span className="text-xl font-light ml-1">Writer</span>
            </div>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          // Build current URL for comparison
          const currentSearch = searchParams.toString()
          const currentUrl = currentSearch ? `${pathname}?${currentSearch}` : pathname
          
          // Check if we're on the home page
          const isHomePage = pathname === '/dashboard' && !currentSearch
          
          // Determine if this item is active
          const isActive = 
            (item.id === 'home' && isHomePage) ||
            (item.id !== 'home' && item.href === currentUrl)
            
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
              collapsed && "justify-center"
            )}
            title={collapsed ? item.title : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 h-6 w-6 rounded-full border bg-white shadow-md hover:shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}