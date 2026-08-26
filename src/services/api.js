/**
 * Testmaite API Service Layer
 * =============================
 * All data-fetching and mutations go through this module.
 *
 * CURRENT STATE: Mock data matching the spec document.
 * INTEGRATION:   Replace the mock implementations with real fetch() calls.
 *                Only this file needs to change — no UI code modifications.
 */

// Simulated network delay for realistic UX
const simulateDelay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch the complete dashboard data payload.
 * TODO: Replace with real endpoint — e.g. GET /api/dashboard
 */
export async function fetchDashboardData() {
  await simulateDelay(800);

  return {
    plan: {
      name: 'Professional',
      tier: 'professional', // 'starter' | 'professional' | 'enterprise'
      resetDate: '2026-09-01',
    },

    executions: {
      used: 12450,
      total: 20000,
      remaining: 7550,
      monthlyLimit: 20000,
      passed: 11820,
      failed: 630,
    },

    testCases: {
      total: 1240,
      active: 1100,
      passed: 980,
      failed: 120,
    },

    testRuns: {
      total: 3420,
      successful: 2890,
      failed: 380,
      retried: 150,
    },

    executionTime: {
      totalHours: 486,
      averageDuration: '2m 18s',
      averageSeconds: 138,
    },

    automationUsage: [
      { type: 'Web Tests', count: 12450, color: '#6366f1' },
    ],

    usageOverTime: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      data: [1800, 2400, 3200, 2800, 3600, 4100, 3800, 4200],
    },

    credits: {
      design: {
        used: 340,
        total: 500,
        remaining: 160,
      },
      execution: {
        used: 12450,
        total: 20000,
        remaining: 7550,
      },
    },
  };
}

/**
 * Request additional credits from the admin.
 * The user CANNOT add credits on their own — this sends a request.
 *
 * TODO: Replace with real endpoint — e.g. POST /api/credits/request
 *
 * @param {'design' | 'execution'} creditType
 * @param {number} amount
 * @param {string} reason
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function requestAdditionalCredits(creditType, amount, reason) {
  await simulateDelay(1000);

  // TODO: Replace with:
  // const response = await fetch('/api/credits/request', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ creditType, amount, reason }),
  // });
  // return response.json();

  // Mock: always succeed
  return {
    success: true,
    message: `Your request for ${amount.toLocaleString()} additional ${creditType} credits has been submitted to the admin. You'll be notified once approved.`,
  };
}
