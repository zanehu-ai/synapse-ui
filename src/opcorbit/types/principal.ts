/**
 * Principal —— 当前登录主体（Phase 1 W3-4 骨架）。
 *
 * 对应 01-foundation.md §4.4 RBAC 模型。完整字段由 backend OpenAPI 反向生成。
 */
export interface Principal {
  id: string
  /** 关联的租户 id，由 backend 颁发的 JWT 携带；前端不可硬编码 */
  tenantId: string
  phone?: string
  email?: string
  displayName?: string
  roles: string[]
}
