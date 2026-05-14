export type FeaturePackPermissionScope = 'tenant' | 'platform'
export type FeaturePackWidgetOutlet = 'dashboard' | 'detail_sidebar'

export interface FeaturePackRoute {
  id: string
  path: string
  componentKey: string
  title?: string
  requiredPermissions?: readonly string[]
  requiredFeatures?: readonly string[]
}

export interface FeaturePackMenuItem {
  id: string
  label: string
  routeId?: string
  parentId?: string
  icon?: string
  order?: number
  requiredPermissions?: readonly string[]
  requiredFeatures?: readonly string[]
}

export interface FeaturePackPermission {
  code: string
  name: string
  scope: FeaturePackPermissionScope
  description?: string
}

export interface FeaturePackWidget {
  id: string
  outlet: FeaturePackWidgetOutlet | string
  componentKey: string
  order?: number
  requiredPermissions?: readonly string[]
  requiredFeatures?: readonly string[]
}

export interface FeaturePackManifest {
  code: string
  name: string
  version: string
  description?: string
  routes?: readonly FeaturePackRoute[]
  menu?: readonly FeaturePackMenuItem[]
  permissions?: readonly FeaturePackPermission[]
  widgets?: readonly FeaturePackWidget[]
}

export interface FeaturePackRegistration {
  manifest: FeaturePackManifest
  registerRoutes: () => readonly FeaturePackRoute[]
  registerMenu: () => readonly FeaturePackMenuItem[]
  registerPermissions: () => readonly FeaturePackPermission[]
  registerWidgets: () => readonly FeaturePackWidget[]
}

const identifierPattern = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/
const routePathPattern = /^\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]*$/
const semverPattern = /^v?[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$/

export function defineFeaturePack<T extends FeaturePackRegistration>(featurePack: T): T {
  const manifest = buildFeaturePackManifest(featurePack)
  const errors = validateFeaturePackManifest(manifest)
  if (errors.length > 0) {
    throw new Error(`Invalid feature pack manifest: ${errors.join('; ')}`)
  }
  return featurePack
}

export function buildFeaturePackManifest(featurePack: FeaturePackRegistration): FeaturePackManifest {
  return {
    ...featurePack.manifest,
    routes: featurePack.registerRoutes(),
    menu: featurePack.registerMenu(),
    permissions: featurePack.registerPermissions(),
    widgets: featurePack.registerWidgets(),
  }
}

export function validateFeaturePackManifest(manifest: FeaturePackManifest): string[] {
  const errors: string[] = []
  pushIdentifierError(errors, 'code', manifest.code)
  if (!manifest.name?.trim()) errors.push('name is required')
  if (!semverPattern.test(manifest.version?.trim() ?? '')) {
    errors.push('version must be semantic version')
  }

  const routes = manifest.routes ?? []
  const menu = manifest.menu ?? []
  const permissions = manifest.permissions ?? []
  const widgets = manifest.widgets ?? []
  if (routes.length === 0 && menu.length === 0 && widgets.length === 0) {
    errors.push('manifest must define at least one route, menu item, or widget')
  }

  const routeIds = new Set<string>()
  const menuIds = new Set<string>()
  const permissionCodes = new Set<string>()
  const widgetIds = new Set<string>()

  for (const permission of permissions) {
    pushIdentifierError(errors, 'permission code', permission.code)
    pushUniqueError(errors, permissionCodes, permission.code, 'permission code')
    if (!permission.name?.trim()) errors.push('permission name is required')
    if (permission.scope !== 'tenant' && permission.scope !== 'platform') {
      errors.push(`permission scope ${permission.scope} is not supported`)
    }
  }

  for (const route of routes) {
    pushIdentifierError(errors, 'route id', route.id)
    pushUniqueError(errors, routeIds, route.id, 'route id')
    if (!routePathPattern.test(route.path?.trim() ?? '') || route.path.includes('//')) {
      errors.push(`route path ${route.path} must be a console-relative absolute path`)
    }
    if (!route.componentKey?.trim()) errors.push('route componentKey is required')
    pushIdentifierListErrors(errors, 'route requiredPermissions', route.requiredPermissions)
    pushIdentifierListErrors(errors, 'route requiredFeatures', route.requiredFeatures)
  }

  for (const item of menu) {
    pushIdentifierError(errors, 'menu id', item.id)
    pushUniqueError(errors, menuIds, item.id, 'menu id')
    if (!item.label?.trim()) errors.push('menu label is required')
    if (item.routeId) {
      pushIdentifierError(errors, 'menu routeId', item.routeId)
      if (!routeIds.has(item.routeId)) {
        errors.push(`menu routeId ${item.routeId} does not reference a route`)
      }
    }
    if (item.parentId) pushIdentifierError(errors, 'menu parentId', item.parentId)
    pushIdentifierListErrors(errors, 'menu requiredPermissions', item.requiredPermissions)
    pushIdentifierListErrors(errors, 'menu requiredFeatures', item.requiredFeatures)
  }

  for (const item of menu) {
    if (item.parentId && !menuIds.has(item.parentId)) {
      errors.push(`menu parentId ${item.parentId} does not reference a menu item`)
    }
  }

  for (const widget of widgets) {
    pushIdentifierError(errors, 'widget id', widget.id)
    pushUniqueError(errors, widgetIds, widget.id, 'widget id')
    pushIdentifierError(errors, 'widget outlet', widget.outlet)
    if (!widget.componentKey?.trim()) errors.push('widget componentKey is required')
    pushIdentifierListErrors(errors, 'widget requiredPermissions', widget.requiredPermissions)
    pushIdentifierListErrors(errors, 'widget requiredFeatures', widget.requiredFeatures)
  }

  return errors
}

function pushIdentifierError(errors: string[], field: string, value: string | undefined): void {
  if (!identifierPattern.test(value?.trim() ?? '')) {
    errors.push(`${field} must be a stable lowercase identifier`)
  }
}

function pushIdentifierListErrors(
  errors: string[],
  field: string,
  values: readonly string[] | undefined,
): void {
  for (const value of values ?? []) {
    pushIdentifierError(errors, field, value)
  }
}

function pushUniqueError(
  errors: string[],
  seen: Set<string>,
  value: string,
  label: string,
): void {
  const key = value?.trim()
  if (!key) return
  if (seen.has(key)) errors.push(`duplicate ${label} ${key}`)
  seen.add(key)
}
