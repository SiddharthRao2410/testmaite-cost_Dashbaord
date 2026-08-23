/**
 * Automation Breakdown Component
 * ================================
 * Horizontal bar chart showing usage by automation type.
 */

/**
 * @param {HTMLElement} container
 * @param {Array} automationUsage - [{ type, count, color }]
 */
export function renderAutomationBreakdown(container, automationUsage) {
  const totalCount = automationUsage.reduce((sum, item) => sum + item.count, 0);

  const el = document.createElement('div');
  el.className = 'glass-card automation-card fade-in-up stagger-5';
  el.id = 'automation-breakdown';

  let listHTML = '';
  automationUsage.forEach((item, i) => {
    const pct = Math.round((item.count / totalCount) * 100);
    listHTML += `
      <div class="automation-card__item">
        <div class="automation-card__item-header">
          <span class="automation-card__item-label">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 3px; background: ${item.color};"></span>
            ${item.type}
          </span>
          <span class="automation-card__item-value">${item.count.toLocaleString()} <span style="color: var(--text-muted); font-weight: 400;">(${pct}%)</span></span>
        </div>
        <div class="automation-card__bar">
          <div class="automation-card__bar-fill" data-width="${pct}" style="width: 0%; background: ${item.color};"></div>
        </div>
      </div>
    `;
  });

  el.innerHTML = `
    <div class="chart-card__header">
      <h3 class="chart-card__title">📊 Automation Usage</h3>
      <span style="font-size: 0.75rem; color: var(--text-muted);">${totalCount.toLocaleString()} total</span>
    </div>
    <div class="automation-card__list">
      ${listHTML}
    </div>
  `;

  container.appendChild(el);

  // Animate bars after mount
  requestAnimationFrame(() => {
    setTimeout(() => {
      el.querySelectorAll('.automation-card__bar-fill').forEach((bar) => {
        bar.style.width = bar.dataset.width + '%';
      });
    }, 400);
  });

  return el;
}
