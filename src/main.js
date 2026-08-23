/**
 * Testmaite Cost Dashboard — Main Entry Point
 * =============================================
 * Orchestrates all dashboard components.
 */

import './styles/index.css';
import { fetchDashboardData } from './services/api.js';
import { renderPlanBanner } from './components/PlanBanner.js';
import { renderMetricCards } from './components/MetricCards.js';
import { renderUsageChart } from './components/UsageChart.js';
import { renderAutomationBreakdown } from './components/AutomationBreakdown.js';
import { renderCreditsPanel } from './components/CreditsPanel.js';
import { showToast } from './components/Toast.js';

const app = document.getElementById('app');

/**
 * Render loading skeleton while data loads.
 */
function renderSkeleton() {
  app.innerHTML = `
    <div class="dashboard">
      <div class="dashboard-header">
        <div class="dashboard-header__logo">
          <div class="dashboard-header__logo-icon">T</div>
          <div>
            <div class="dashboard-header__title">Testmaite</div>
            <div class="dashboard-header__subtitle">Usage Dashboard</div>
          </div>
        </div>
      </div>
      <div class="skeleton skeleton-banner"></div>
      <div class="metrics-grid">
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
      </div>
      <div class="charts-grid">
        <div class="skeleton skeleton-chart"></div>
        <div class="skeleton skeleton-card" style="height: 350px;"></div>
      </div>
    </div>
  `;
}

/**
 * Render the full dashboard with data.
 */
function renderDashboard(data) {
  app.innerHTML = '';

  const dashboard = document.createElement('div');
  dashboard.className = 'dashboard';

  // ---- Header ----
  const header = document.createElement('div');
  header.className = 'dashboard-header fade-in';
  header.innerHTML = `
    <div class="dashboard-header__logo">
      <div class="dashboard-header__logo-icon">T</div>
      <div>
        <div class="dashboard-header__title">Testmaite</div>
        <div class="dashboard-header__subtitle">Usage Dashboard</div>
      </div>
    </div>
    <div class="dashboard-header__actions">
      <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--text-muted);">
        <span class="status-dot status-dot--live"></span>
        Live
      </div>
      <button class="btn btn--ghost" id="btn-refresh" title="Refresh data">🔄 Refresh</button>
    </div>
  `;
  dashboard.appendChild(header);

  // ---- Plan Banner ----
  renderPlanBanner(dashboard, data);

  // ---- Metric Cards ----
  renderMetricCards(dashboard, data);

  // ---- Charts Row: Usage Chart + Automation Breakdown ----
  const chartsRow = document.createElement('div');
  chartsRow.className = 'charts-grid';
  renderUsageChart(chartsRow, data.usageOverTime);
  renderAutomationBreakdown(chartsRow, data.automationUsage);
  dashboard.appendChild(chartsRow);

  // ---- Bottom Row: Credits Panel ----
  const bottomRow = document.createElement('div');
  bottomRow.className = 'bottom-grid';
  renderCreditsPanel(bottomRow, data.credits);

  // Recent Activity placeholder
  const activityCard = document.createElement('div');
  activityCard.className = 'glass-card fade-in-up stagger-6';
  activityCard.style.padding = 'var(--space-6)';
  activityCard.id = 'recent-activity';
  activityCard.innerHTML = `
    <div class="chart-card__header" style="margin-bottom: var(--space-5);">
      <h3 class="chart-card__title">🕐 Recent Activity</h3>
    </div>
    <div style="display: flex; flex-direction: column; gap: var(--space-3);">
      ${generateRecentActivity()}
    </div>
  `;
  bottomRow.appendChild(activityCard);

  dashboard.appendChild(bottomRow);

  // ---- Footer ----
  const footer = document.createElement('div');
  footer.style.cssText = 'text-align: center; padding: 3rem 1rem 2rem; font-size: 0.75rem; color: var(--text-muted);';
  footer.innerHTML = `
    <p>Testmaite by Qualiquest &bull; Usage resets monthly &bull; Contact admin for plan changes</p>
  `;
  dashboard.appendChild(footer);

  app.appendChild(dashboard);

  // Bind refresh button
  document.getElementById('btn-refresh')?.addEventListener('click', () => {
    showToast('info', 'Refreshing dashboard data...');
    init();
  });

  // Bind upgrade button
  document.getElementById('btn-request-upgrade')?.addEventListener('click', () => {
    showToast('info', 'Your upgrade request has been sent to the admin. You will be notified once processed.');
  });
}

/**
 * Generate recent activity items (mock data).
 */
function generateRecentActivity() {
  const activities = [
    { icon: '✅', text: 'Regression suite completed', time: '2 hours ago', status: 'success' },
    { icon: '❌', text: '3 API tests failed in Suite #412', time: '4 hours ago', status: 'error' },
    { icon: '🔄', text: 'Web test batch retried', time: '6 hours ago', status: 'warning' },
    { icon: '📩', text: 'Credits request approved by admin', time: '1 day ago', status: 'info' },
    { icon: '✅', text: 'Full regression run passed', time: '2 days ago', status: 'success' },
  ];

  return activities
    .map(
      (a) => `
    <div style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; background: var(--bg-glass); border: 1px solid var(--border-glass);">
      <span style="font-size: 1rem;">${a.icon}</span>
      <div style="flex: 1;">
        <div style="font-size: 0.8125rem; color: var(--text-primary);">${a.text}</div>
        <div style="font-size: 0.6875rem; color: var(--text-muted);">${a.time}</div>
      </div>
      <span class="badge badge--${a.status}" style="font-size: 0.625rem;">${a.status}</span>
    </div>
  `
    )
    .join('');
}

/**
 * Main initialization — fetch data and render.
 */
async function init() {
  renderSkeleton();

  try {
    const data = await fetchDashboardData();
    renderDashboard(data);
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
    app.innerHTML = `
      <div class="dashboard" style="display: flex; align-items: center; justify-content: center; min-height: 60vh;">
        <div style="text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <h2 style="color: var(--text-primary); margin-bottom: 0.5rem;">Unable to Load Dashboard</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Please check your connection and try again.</p>
          <button class="btn btn--primary" onclick="location.reload()">Retry</button>
        </div>
      </div>
    `;
  }
}

// Boot
init();
