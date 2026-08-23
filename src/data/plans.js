/**
 * Testmaite Plan Definitions
 * ============================
 * Static data for the 3 customer plans.
 * Used by UI components to display plan-specific details.
 */

export const PLANS = {
  starter: {
    name: 'Starter',
    tier: 'starter',
    executionLimit: 5000,
    designCredits: 100,
    executionCredits: 5000,
    icon: '🚀',
    color: '#22d3ee',
    features: [
      'Up to 5,000 test executions/month',
      '100 design credits',
      'Basic reporting',
      'Email support',
    ],
  },
  professional: {
    name: 'Professional',
    tier: 'professional',
    executionLimit: 20000,
    designCredits: 500,
    executionCredits: 20000,
    icon: '⚡',
    color: '#6366f1',
    features: [
      'Up to 20,000 test executions/month',
      '500 design credits',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    tier: 'enterprise',
    executionLimit: 100000,
    designCredits: 2000,
    executionCredits: 100000,
    icon: '🏢',
    color: '#a78bfa',
    features: [
      'Up to 100,000 test executions/month',
      '2,000 design credits',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
    ],
  },
};
