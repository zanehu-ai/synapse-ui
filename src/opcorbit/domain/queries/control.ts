import type { AxiosInstance } from 'axios'
import { queryOptions } from '@tanstack/react-query'
import {
  getBillingAggregate,
  getMyCapabilities,
  getTenant,
  listApiKeys,
  listNotifications,
  listTenants,
  listVoucherBatches,
} from '../../control'
import { domainQueryKeys } from './keys'

export function adminTenantsQuery(client: AxiosInstance) {
  return queryOptions({
    queryKey: domainQueryKeys.admin.tenants(),
    queryFn: () => listTenants(client),
  })
}

export function adminTenantQuery(client: AxiosInstance, tenantId: string | number) {
  return queryOptions({
    queryKey: domainQueryKeys.admin.tenant(tenantId),
    queryFn: () => getTenant(client, tenantId),
  })
}

export function consoleCapabilitiesQuery(client: AxiosInstance) {
  return queryOptions({
    queryKey: domainQueryKeys.console.capabilities(),
    queryFn: () => getMyCapabilities(client),
  })
}

export function consoleNotificationsQuery(
  client: AxiosInstance,
  principalId: string | number | undefined,
) {
  return queryOptions({
    queryKey: domainQueryKeys.console.notifications(principalId),
    queryFn: () => listNotifications(client),
    enabled: principalId !== undefined && principalId !== '',
  })
}

export function consoleVoucherBatchesQuery(
  client: AxiosInstance,
  tenantId: string | number | undefined,
) {
  return queryOptions({
    queryKey: domainQueryKeys.console.voucherBatches(tenantId),
    queryFn: () => listVoucherBatches(client, { tenantId: tenantId ?? '' }),
    enabled: tenantId !== undefined && tenantId !== '',
  })
}

export function consoleBillingQuery(
  client: AxiosInstance,
  opts: {
    tenantId: string | number | undefined
    meterCode: string
    from: string
    to: string
  },
) {
  return queryOptions({
    queryKey: domainQueryKeys.console.billing(opts.tenantId, opts.meterCode, opts.from, opts.to),
    queryFn: () =>
      getBillingAggregate(client, {
        tenantId: opts.tenantId ?? '',
        meterCode: opts.meterCode,
        from: opts.from,
        to: opts.to,
      }),
    enabled: opts.tenantId !== undefined && opts.tenantId !== '',
  })
}

export function consoleApiKeysQuery(
  client: AxiosInstance,
  tenantId: string | number | undefined,
) {
  return queryOptions({
    queryKey: domainQueryKeys.console.apiKeys(tenantId),
    queryFn: () => listApiKeys(client, { tenantId }),
    enabled: tenantId !== undefined && tenantId !== '',
  })
}
