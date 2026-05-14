import { hasAny } from '../permissions/capabilities'

export interface DomainColumn<T> {
  id: string
  header: string
  accessor?: keyof T | ((row: T) => unknown)
  requiredPermissions?: readonly string[]
  width?: number
}

export function visibleColumns<T>(
  columns: readonly DomainColumn<T>[],
  permissions: readonly string[] | ReadonlySet<string>,
): DomainColumn<T>[] {
  return columns.filter(
    (column) =>
      !column.requiredPermissions ||
      column.requiredPermissions.length === 0 ||
      hasAny(permissions, column.requiredPermissions),
  )
}
