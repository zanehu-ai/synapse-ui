import type { Tenant } from './types/tenant'

/**
 * useTenant —— 当前租户上下文 hook（占位）。
 *
 * Phase 1 W3-4：返回 null（未实现租户上下文）。
 * Phase 1 W5-6：将由 TenantProvider 提供，从后端 `/api/v1/me/tenant` 解析当前 tenant，
 * 见 01-foundation.md §4.4「多租户隔离原则」。
 *
 * 不要在这里写任何 tenant_id 比较或硬编码（lint-tenant-hardcode.sh 会阻断）。
 */
export function useTenant(): Tenant | null {
  return null
}
