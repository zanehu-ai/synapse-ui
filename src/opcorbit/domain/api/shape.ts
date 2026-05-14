export interface DomainPageResult<T> {
  data: T[]
  total: number
  note?: string
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function camelizeDeep<T = unknown>(value: unknown): T {
  if (Array.isArray(value)) return value.map((item) => camelizeDeep(item)) as T
  if (!isRecord(value)) return value as T
  const out: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(value)) {
    const camelKey = key.replace(/_([a-z])/g, (_m, ch: string) => ch.toUpperCase())
    out[camelKey] = camelizeDeep(item)
  }
  return out as T
}

export function snakeizeShallow(input: object): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (value === undefined) continue
    const snakeKey = key.replace(/[A-Z]/g, (ch) => `_${ch.toLowerCase()}`)
    out[snakeKey] = value
  }
  return out
}

export function unwrapDomainList<T>(body: unknown): T[] {
  if (Array.isArray(body)) return body.map((item) => camelizeDeep<T>(item))
  if (isRecord(body) && Array.isArray(body.data)) {
    return body.data.map((item) => camelizeDeep<T>(item))
  }
  return []
}

export function unwrapDomainPage<T>(body: unknown): DomainPageResult<T> {
  if (Array.isArray(body)) {
    const data = unwrapDomainList<T>(body)
    return { data, total: data.length }
  }
  if (isRecord(body)) {
    const data = unwrapDomainList<T>(body.data)
    return {
      data,
      total: typeof body.total === 'number' ? body.total : data.length,
      note: typeof body.note === 'string' ? body.note : undefined,
    }
  }
  return { data: [], total: 0 }
}
