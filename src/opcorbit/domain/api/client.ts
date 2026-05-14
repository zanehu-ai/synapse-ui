import { AxiosHeaders, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { createClient } from '../../../api/createClient'

export interface CreateDomainClientOptions {
  baseURL: string
  timeout?: number
  withCredentials?: boolean
  getAccessToken?: () => string | null | undefined
  getTenantId?: () => string | number | null | undefined
  tokenHeader?: string
  tenantHeader?: string
}

export function createDomainClient(opts: CreateDomainClientOptions): AxiosInstance {
  const client = createClient(opts)
  client.interceptors.request.use((config) => applyDomainHeaders(config, opts))
  return client
}

function applyDomainHeaders(
  config: InternalAxiosRequestConfig,
  opts: CreateDomainClientOptions,
): InternalAxiosRequestConfig {
  const headers = AxiosHeaders.from(config.headers)
  const token = opts.getAccessToken?.()
  const tenantId = opts.getTenantId?.()

  if (token) headers.set(opts.tokenHeader ?? 'Authorization', `Bearer ${token}`)
  if (tenantId !== undefined && tenantId !== null && tenantId !== '') {
    headers.set(opts.tenantHeader ?? 'X-Tenant-ID', String(tenantId))
  }

  config.headers = headers
  return config
}
