import type { ComponentType, ReactNode } from 'react'
import { cn } from '../utils/cn'

const navFocusClass =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'

export interface NavigationLinkProps {
  'aria-current'?: 'page'
  children: ReactNode
  className?: string
  to: string
}

export type NavigationLinkComponent = ComponentType<NavigationLinkProps>

export interface TopNavigationItem {
  id: string
  label: ReactNode
  to: string
}

export interface TopNavigationProps {
  activeId?: string
  ariaLabel?: string
  items: readonly TopNavigationItem[]
  LinkComponent: NavigationLinkComponent
}

export function TopNavigation({
  activeId,
  ariaLabel = 'Primary navigation',
  items,
  LinkComponent,
}: TopNavigationProps) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center gap-1">
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <LinkComponent
            aria-current={active ? 'page' : undefined}
            className={cn(
              'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors',
              navFocusClass,
              active ? 'bg-gray-950 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950',
            )}
            key={item.id}
            to={item.to}
          >
            {item.label}
          </LinkComponent>
        )
      })}
    </nav>
  )
}

export interface SidebarNavigationItem {
  children?: readonly SidebarNavigationItem[]
  end?: boolean
  label: ReactNode
  to: string
}

export interface SidebarNavigationProps {
  activePath: string
  ariaLabel?: string
  groupLabel?: ReactNode
  items: readonly SidebarNavigationItem[]
  LinkComponent: NavigationLinkComponent
  notice?: ReactNode
}

export function SidebarNavigation({
  activePath,
  ariaLabel = 'Secondary navigation',
  groupLabel,
  items,
  LinkComponent,
  notice,
}: SidebarNavigationProps) {
  return (
    <nav aria-label={ariaLabel} className="space-y-3 text-sm text-gray-700">
      <div>
        {groupLabel ? (
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {groupLabel}
          </p>
        ) : null}
        <div className="space-y-1">
          {items.map((item) => (
            <SidebarNavigationLink
              activePath={activePath}
              item={item}
              key={item.to}
              LinkComponent={LinkComponent}
            />
          ))}
        </div>
      </div>
      {notice ? (
        <p className="rounded-md bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-500">
          {notice}
        </p>
      ) : null}
    </nav>
  )
}

function SidebarNavigationLink({
  activePath,
  item,
  LinkComponent,
}: {
  activePath: string
  item: SidebarNavigationItem
  LinkComponent: NavigationLinkComponent
}) {
  const active =
    isNavigationTargetActive(activePath, item) ||
    Boolean(item.children?.some((child) => isNavigationTargetActive(activePath, child)))
  const selfActive = isNavigationTargetActive(activePath, item)
  return (
    <div>
      <LinkComponent
        aria-current={selfActive ? 'page' : undefined}
        className={cn(
          'flex min-h-9 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
          navFocusClass,
          selfActive
            ? 'bg-gray-950 text-white shadow-sm'
            : active
              ? 'bg-gray-100 text-gray-950'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-950',
        )}
        to={item.to}
      >
        {item.label}
      </LinkComponent>
      {item.children?.length ? (
        <div className="ml-3 mt-1 space-y-1 border-l border-gray-200 pl-2">
          {item.children.map((child) => {
            const childActive = isNavigationTargetActive(activePath, child)
            return (
              <LinkComponent
                aria-current={childActive ? 'page' : undefined}
                className={cn(
                  'flex min-h-8 items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  navFocusClass,
                  childActive
                    ? 'bg-gray-950 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-950',
                )}
                key={child.to}
                to={child.to}
              >
                {child.label}
              </LinkComponent>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function isNavigationTargetActive(activePath: string, item: SidebarNavigationItem): boolean {
  const currentPath = activePath.split('#')[0]
  const targetPath = pathWithoutHash(item.to)
  if (item.end) return currentPath === targetPath
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}

function pathWithoutHash(to: string): string {
  return to.split('#')[0] || '/'
}
