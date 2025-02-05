import { Header } from './header'
import { Footer } from './footer'
import { Sidebar, defaultNavItems } from './sidebar'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          {showSidebar && (
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
              <div className="relative overflow-hidden py-6 pr-6 lg:py-8">
                <Sidebar items={defaultNavItems} />
              </div>
            </aside>
          )}
          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid-cols-[1fr_300px]">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
} 