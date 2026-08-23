/**
 * Credits Panel Component
 * ========================
 * Displays design/execution credit balances.
 * Allows requesting additional credits from admin (NOT self-adding).
 */

import { createModal } from './Modal.js';
import { showToast } from './Toast.js';
import { requestAdditionalCredits } from '../services/api.js';

/**
 * @param {HTMLElement} container
 * @param {object} credits - { design: { used, total, remaining }, execution: { used, total, remaining } }
 */
export function renderCreditsPanel(container, credits) {
  const el = document.createElement('div');
  el.className = 'glass-card credits-panel fade-in-up stagger-6';
  el.id = 'credits-panel';

  const designPct = Math.round((credits.design.used / credits.design.total) * 100);
  const execPct = Math.round((credits.execution.used / credits.execution.total) * 100);

  el.innerHTML = `
    <div class="chart-card__header" style="margin-bottom: var(--space-5);">
      <h3 class="chart-card__title">💳 Credits</h3>
    </div>

    <div class="credits-panel__balances">
      <div class="credits-panel__balance-item">
        <div>
          <div class="credits-panel__balance-label">Design Credits</div>
          <div class="credits-panel__balance-value" style="color: var(--accent-purple);">
            ${credits.design.remaining.toLocaleString()}
            <span style="font-size: 0.65em; color: var(--text-muted); font-weight: 400;">/ ${credits.design.total.toLocaleString()}</span>
          </div>
          <div style="margin-top: 8px; width: 100%; height: 4px; background: rgba(0,0,0,0.06); border-radius: 99px; overflow: hidden;">
            <div style="width: ${designPct}%; height: 100%; background: linear-gradient(90deg, #8b5cf6, #6366f1); border-radius: 99px; transition: width 1s ease;"></div>
          </div>
        </div>
        <span class="badge badge--${designPct >= 80 ? 'warning' : 'info'}">${designPct}% used</span>
      </div>

      <div class="credits-panel__balance-item">
        <div>
          <div class="credits-panel__balance-label">Execution Credits</div>
          <div class="credits-panel__balance-value" style="color: var(--accent-indigo-light);">
            ${credits.execution.remaining.toLocaleString()}
            <span style="font-size: 0.65em; color: var(--text-muted); font-weight: 400;">/ ${credits.execution.total.toLocaleString()}</span>
          </div>
          <div style="margin-top: 8px; width: 100%; height: 4px; background: rgba(0,0,0,0.06); border-radius: 99px; overflow: hidden;">
            <div style="width: ${execPct}%; height: 100%; background: linear-gradient(90deg, #6366f1, #06b6d4); border-radius: 99px; transition: width 1s ease;"></div>
          </div>
        </div>
        <span class="badge badge--${execPct >= 80 ? 'warning' : 'info'}">${execPct}% used</span>
      </div>
    </div>

    <div class="credits-panel__note">
      <span class="credits-panel__note-icon">ℹ️</span>
      <span>Credits cannot be added manually. To request additional design or execution credits, submit a request below and your admin will be notified.</span>
    </div>

    <button class="btn btn--primary" id="btn-request-credits" style="width: 100%;">
      <span>📩</span>
      Request Additional Credits
    </button>
  `;

  container.appendChild(el);

  // Bind the request credits button
  el.querySelector('#btn-request-credits').addEventListener('click', openCreditsRequestModal);

  return el;
}

/**
 * Open the credits request modal form.
 */
function openCreditsRequestModal() {
  const bodyHTML = `
    <form id="credits-request-form">
      <div class="form-group">
        <label class="form-label" for="credit-type-select">Credit Type</label>
        <select class="form-select" id="credit-type-select" name="creditType" required>
          <option value="" disabled selected>Select credit type</option>
          <option value="design">Design Credits</option>
          <option value="execution">Execution Credits</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="credit-amount-input">Amount Requested</label>
        <input class="form-input" type="number" id="credit-amount-input" name="amount" min="1" placeholder="e.g. 500" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="credit-reason-textarea">Reason (optional)</label>
        <textarea class="form-textarea" id="credit-reason-textarea" name="reason" placeholder="Briefly describe why you need additional credits..."></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--secondary" id="credits-cancel-btn">Cancel</button>
        <button type="submit" class="btn btn--primary" id="credits-submit-btn">
          <span>📤</span>
          Submit Request
        </button>
      </div>
    </form>
  `;

  const modal = createModal({
    title: 'Request Additional Credits',
    bodyHTML,
  });

  // Cancel button
  const cancelBtn = modal.el.querySelector('#credits-cancel-btn');
  cancelBtn.addEventListener('click', modal.close);

  // Form submission
  const form = modal.el.querySelector('#credits-request-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const creditType = form.creditType.value;
    const amount = parseInt(form.amount.value, 10);
    const reason = form.reason.value.trim();

    if (!creditType || !amount || amount < 1) {
      showToast('warning', 'Please fill in all required fields.');
      return;
    }

    // Disable submit button while loading
    const submitBtn = form.querySelector('#credits-submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> Submitting...';

    try {
      const result = await requestAdditionalCredits(creditType, amount, reason);

      if (result.success) {
        showToast('success', result.message);
        modal.close();
      } else {
        showToast('error', result.message || 'Failed to submit request.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>📤</span> Submit Request';
      }
    } catch (err) {
      showToast('error', 'Network error. Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>📤</span> Submit Request';
    }
  });
}
