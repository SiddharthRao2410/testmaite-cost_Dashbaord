/**
 * Toast Notification System
 * ==========================
 * Lightweight, auto-dismissing toast notifications.
 */

const TOAST_ICONS = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const TOAST_DURATION = 4500;
let containerEl = null;

function ensureContainer() {
  if (!containerEl) {
    containerEl = document.createElement('div');
    containerEl.className = 'toast-container';
    containerEl.id = 'toast-container';
    const root = document.getElementById('toast-root');
    if (root) {
      root.appendChild(containerEl);
    } else {
      document.body.appendChild(containerEl);
    }
  }
  return containerEl;
}

/**
 * Show a toast notification.
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {string} message
 * @param {number} [duration]
 */
export function showToast(type, message, duration = TOAST_DURATION) {
  const container = ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${TOAST_ICONS[type]}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="Close notification">✕</button>
  `;

  const closeBtn = toast.querySelector('.toast__close');
  const dismiss = () => {
    toast.classList.add('toast--exiting');
    setTimeout(() => toast.remove(), 300);
  };

  closeBtn.addEventListener('click', dismiss);

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  return { dismiss };
}
