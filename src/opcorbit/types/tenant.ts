/**
 * Tenant —— 多租户上下文（Phase 1 W3-4 骨架）。
 *
 * 字段命名对齐 01-foundation.md §4.4。完整定义在 backend 主线 W5-6 落地后由
 * OpenAPI schema 反向生成，本文件届时会被移除或重写。
 */
export interface Tenant {
  id: string
  code: string
  name: string
  displayName: string
  /** 业务线，如 cargo / gaming / opcorbit-saas，避免使用具体租户名 */
  line: string
  domain?: string | null
  status?: string | number
  planCode?: string
  ownerPrincipalId?: string | number
  quota?: unknown
  templateCodes?: string[]
  createdAt?: string
  updatedAt?: string
}
