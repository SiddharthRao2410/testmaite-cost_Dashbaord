/**
 * Plan Banner Component
 * ======================
 * Top banner showing plan name, execution quota, progress bar, and actions.
 */

import { PLANS } from '../data/plans.js';

/**
 * @param {HTMLElement} container
 * @param {object} data - { plan, executions }
 */
export function renderPlanBanner(container, data) {
  const { plan, executions } = data;
  const planDef = PLANS[plan.tier] || PLANS.professional;
  const usagePct = Math.round((executions.used / executions.total) * 100);

  // Determine bar color based on usage
  let barStatus = '';
  if (usagePct >= 90) barStatus = 'critical';
  else if (usagePct >= 75) barStatus = 'warning';

  const resetDate = new Date(plan.resetDate);
  const resetFormatted = resetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const el = document.createElement('div');
  el.className = 'plan-banner glass-card fade-in-up stagger-1';
  el.id = 'plan-banner';
  el.innerHTML = `
    <div class="plan-banner__info">
      <div class="plan-banner__plan-badge">
        <span>${planDef.icon}</span>
        <span>${planDef.name} Plan</span>
      </div>
      <div class="plan-banner__exec-label">Test Executions</div>
      <div class="plan-banner__exec-value">
        ${executions.used.toLocaleString()} <span>/ ${executions.total.toLocaleString()}</span>
      </div>
    </div>

    <div class="plan-banner__progress-section">
      <div class="plan-banner__progress-header">
        <span class="plan-banner__progress-pct">${usagePct}% Used</span>
        <span class="plan-banner__progress-reset">Resets: ${resetFormatted}</span>
      </div>
      <div class="plan-banner__progress-bar">
        <div class="plan-banner__progress-fill" id="plan-progress-fill" style="width: 0%"></div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
        <span style="font-size: 0.75rem; color: var(--text-muted);">
          ${executions.remaining.toLocaleString()} remaining
        </span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">
          Limit: ${executions.monthlyLimit.toLocaleString()}/month
        </span>
      </div>
    </div>

    <div class="plan-banner__actions">
      <button class="btn btn--primary" id="btn-request-upgrade">
        <span>📩</span>
        Request Upgrade
      </button>
    </div>
  `;

  container.appendChild(el);

  // Animate progress bar fill
  requestAnimationFrame(() => {
    setTimeout(() => {
      const fill = document.getElementById('plan-progress-fill');
      if (fill) fill.style.width = `${usagePct}%`;
    }, 200);
  });

  return el;
}
