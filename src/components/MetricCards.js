/**
 * Metric Cards Component
 * =======================
 * Four KPI cards: Test Executions, Test Cases, Test Runs, Execution Time
 */

/**
 * Format a number with locale-aware commas.
 */
function fmt(n) {
  return typeof n === 'number' ? n.toLocaleString() : n;
}

/**
 * @param {HTMLElement} container
 * @param {object} data
 */
export function renderMetricCards(container, data) {
  const { executions, testCases, testRuns, executionTime } = data;

  const grid = document.createElement('div');
  grid.className = 'metrics-grid';
  grid.id = 'metrics-grid';

  // Card 1: Test Executions
  grid.innerHTML += `
    <div class="glass-card kpi-card kpi-card--indigo fade-in-up stagger-2" id="card-executions">
      <div class="kpi-card__header">
        <span class="kpi-card__label">Test Executions</span>
        <div class="kpi-card__icon kpi-card__icon--indigo">🧪</div>
      </div>
      <div class="kpi-card__value">${fmt(executions.used)}</div>
      <div class="kpi-card__sub">of ${fmt(executions.total)} this month</div>
      <div class="kpi-card__breakdown">
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Passed</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-success)">${fmt(executions.passed)}</span>
        </div>
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Failed</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-error)">${fmt(executions.failed)}</span>
        </div>
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Remaining</span>
          <span class="kpi-card__breakdown-value" style="color: var(--accent-cyan)">${fmt(executions.remaining)}</span>
        </div>
      </div>
    </div>
  `;

  // Card 2: Test Cases
  grid.innerHTML += `
    <div class="glass-card kpi-card kpi-card--cyan fade-in-up stagger-3" id="card-test-cases">
      <div class="kpi-card__header">
        <span class="kpi-card__label">Test Cases</span>
        <div class="kpi-card__icon kpi-card__icon--cyan">📋</div>
      </div>
      <div class="kpi-card__value">${fmt(testCases.total)}</div>
      <div class="kpi-card__sub">Total test cases</div>
      <div class="kpi-card__breakdown">
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Active</span>
          <span class="kpi-card__breakdown-value" style="color: var(--accent-indigo-light)">${fmt(testCases.active)}</span>
        </div>
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Passed</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-success)">${fmt(testCases.passed)}</span>
        </div>
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Failed</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-error)">${fmt(testCases.failed)}</span>
        </div>
      </div>
    </div>
  `;

  // Card 3: Test Runs
  grid.innerHTML += `
    <div class="glass-card kpi-card kpi-card--emerald fade-in-up stagger-4" id="card-test-runs">
      <div class="kpi-card__header">
        <span class="kpi-card__label">Test Runs</span>
        <div class="kpi-card__icon kpi-card__icon--emerald">▶️</div>
      </div>
      <div class="kpi-card__value">${fmt(testRuns.total)}</div>
      <div class="kpi-card__sub">Total runs this period</div>
      <div class="kpi-card__breakdown">
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Successful</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-success)">${fmt(testRuns.successful)}</span>
        </div>
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Failed</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-error)">${fmt(testRuns.failed)}</span>
        </div>
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Retried</span>
          <span class="kpi-card__breakdown-value" style="color: var(--color-warning)">${fmt(testRuns.retried)}</span>
        </div>
      </div>
    </div>
  `;

  // Card 4: Execution Time
  grid.innerHTML += `
    <div class="glass-card kpi-card kpi-card--amber fade-in-up stagger-5" id="card-exec-time">
      <div class="kpi-card__header">
        <span class="kpi-card__label">Execution Time</span>
        <div class="kpi-card__icon kpi-card__icon--amber">⏱️</div>
      </div>
      <div class="kpi-card__value">${fmt(executionTime.totalHours)}<span style="font-size: 0.5em; color: var(--text-muted); font-weight: 400; margin-left: 4px;">hrs</span></div>
      <div class="kpi-card__sub">Total execution time</div>
      <div class="kpi-card__breakdown">
        <div class="kpi-card__breakdown-item">
          <span class="kpi-card__breakdown-label">Avg Duration</span>
          <span class="kpi-card__breakdown-value" style="color: var(--accent-amber)">${executionTime.averageDuration}</span>
        </div>
      </div>
    </div>
  `;

  container.appendChild(grid);
  return grid;
}
