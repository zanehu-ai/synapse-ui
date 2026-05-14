export const CAP = {
  fundingPayment: 'funding.payment',
  fundingWithdrawal: 'funding.withdrawal',
  fundingRefund: 'funding.refund',
  fundingReconciliation: 'funding.reconciliation',
  growthInvite: 'growth.invite',
  growthReferral: 'growth.referral',
  notificationEmail: 'notification.email',
  notificationSms: 'notification.sms',
  notificationWechat: 'notification.wechat',
  voucherCenter: 'voucher.center',
  integrationsWebhook: 'integrations.webhook',
  integrationsApiKey: 'integrations.api_key',
} as const

export type FeatureCode = (typeof CAP)[keyof typeof CAP]

export function capabilitySet(codes: readonly string[] | ReadonlySet<string>): ReadonlySet<string> {
  return codes instanceof Set ? codes : new Set(codes)
}

export function hasAny(caps: readonly string[] | ReadonlySet<string>, codes: readonly string[]): boolean {
  const set = capabilitySet(caps)
  return codes.some((code) => set.has(code))
}

export function hasAll(caps: readonly string[] | ReadonlySet<string>, codes: readonly string[]): boolean {
  const set = capabilitySet(caps)
  return codes.every((code) => set.has(code))
}
