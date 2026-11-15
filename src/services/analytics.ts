/**
 * Analítica. En desarrollo imprime en consola; en producción es no-op hasta conectar PostHog o Amplitude.
 */
export type AnalyticsEvent =
  | 'quiz_started'
  | 'quiz_completed'
  | 'result_viewed'
  | 'account_created'
  | 'onboarding_completed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'chest_opened'
  | 'level_up'
  | 'badge_unlocked'
  | 'share_card'
  | 'paywall_viewed'
  | 'trial_started'
  | 'subscription_canceled'
  | 'account_deleted'

export function track(event: AnalyticsEvent, props: Record<string, string | number | boolean> = {}): void {
  if (import.meta.env.DEV) {
    console.debug(`[analytics] ${event}`, props)
  }
}
