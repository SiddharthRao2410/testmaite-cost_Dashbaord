/**
 * Usage Chart Component
 * =====================
 * Line/area chart showing monthly test executions trend.
 * Uses Chart.js for rendering.
 */

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

/**
 * @param {HTMLElement} container
 * @param {object} usageOverTime - { labels: string[], data: number[] }
 */
export function renderUsageChart(container, usageOverTime) {
  const el = document.createElement('div');
  el.className = 'glass-card chart-card fade-in-up stagger-4';
  el.id = 'usage-chart-card';
  el.innerHTML = `
    <div class="chart-card__header">
      <h3 class="chart-card__title">📈 Usage Over Time</h3>
      <div class="chart-card__legend">
        <div class="chart-card__legend-item">
          <span class="chart-card__legend-dot" style="background: #6366f1;"></span>
          Test Executions
        </div>
      </div>
    </div>
    <div class="chart-card__canvas-wrapper">
      <canvas id="usage-chart-canvas" height="280"></canvas>
    </div>
  `;

  container.appendChild(el);

  // Create chart after DOM insert
  requestAnimationFrame(() => {
    const canvas = document.getElementById('usage-chart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.06)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: usageOverTime.labels,
        datasets: [
          {
            label: 'Test Executions',
            data: usageOverTime.data,
            borderColor: '#6366f1',
            backgroundColor: gradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#4f46e5',
            pointHoverBorderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            titleColor: '#1e293b',
            bodyColor: '#64748b',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            borderWidth: 1,
            cornerRadius: 10,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (ctx) => `${ctx.parsed.y.toLocaleString()} executions`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.06)',
              drawBorder: false,
            },
            ticks: {
              color: '#64748b',
              font: { family: "'Inter', sans-serif", size: 12 },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.06)',
              drawBorder: false,
            },
            ticks: {
              color: '#64748b',
              font: { family: "'Inter', sans-serif", size: 12 },
              callback: (value) => {
                if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
                return value;
              },
            },
          },
        },
        animation: {
          duration: 1200,
          easing: 'easeOutQuart',
        },
      },
    });
  });

  return el;
}
