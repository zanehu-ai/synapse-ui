export interface FieldIssue {
  field: string
  message: string
}

export type FieldRule = (value: unknown) => string | undefined

export function required(message = 'Required'): FieldRule {
  return (value) => {
    if (value === undefined || value === null) return message
    if (typeof value === 'string' && value.trim() === '') return message
    return undefined
  }
}

export function matches(pattern: RegExp, message: string): FieldRule {
  return (value) => {
    if (value === undefined || value === null || value === '') return undefined
    return pattern.test(String(value)) ? undefined : message
  }
}

export function validateFields(
  input: Record<string, unknown>,
  schema: Record<string, readonly FieldRule[]>,
): FieldIssue[] {
  const issues: FieldIssue[] = []
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const message = rule(input[field])
      if (message) {
        issues.push({ field, message })
        break
      }
    }
  }
  return issues
}

export const domainSchemas = {
  tenantCode: [required(), matches(/^[a-z][a-z0-9-]{1,62}$/, 'Use lowercase letters, numbers, and hyphens')],
  featureCode: [
    required(),
    matches(/^[a-z][a-z0-9]*(?:\.[a-z0-9]+)+$/, 'Use dot-separated lowercase feature code'),
  ],
} as const
