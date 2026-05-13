import type { ReactNode } from 'react'

export interface LayoutProps {
  brand?: ReactNode
  sidebar?: ReactNode
  children?: ReactNode
}

export function Layout({ brand, sidebar, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header
        className="flex min-h-14 items-center border-b border-gray-200 px-4 py-2"
        data-testid="layout-header"
      >
        {brand ?? <span className="font-semibold">Console</span>}
      </header>
      <div className="flex flex-1">
        {sidebar ? (
          <aside
            className="w-56 border-r border-gray-200 p-4"
            data-testid="layout-sidebar"
          >
            {sidebar}
          </aside>
        ) : null}
        <main className="flex-1 p-6" data-testid="layout-main">
          {children}
        </main>
      </div>
    </div>
  )
}
