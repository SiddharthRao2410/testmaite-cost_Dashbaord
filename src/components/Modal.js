/**
 * Reusable Modal Component
 * =========================
 * Glassmorphism backdrop modal with spring animation.
 */

/**
 * Create and show a modal.
 * @param {object} options
 * @param {string} options.title
 * @param {string} options.bodyHTML
 * @param {function} [options.onClose]
 * @returns {{ el: HTMLElement, close: function }}
 */
export function createModal({ title, bodyHTML, onClose }) {
  const root = document.getElementById('modal-root') || document.body;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal__header">
        <h2 class="modal__title" id="modal-title">${title}</h2>
        <button class="modal__close" id="modal-close-btn" aria-label="Close modal">✕</button>
      </div>
      <div class="modal__body" id="modal-body">
        ${bodyHTML}
      </div>
    </div>
  `;

  root.appendChild(overlay);

  // Trigger open animation on next frame
  requestAnimationFrame(() => {
    overlay.classList.add('modal-overlay--visible');
  });

  const close = () => {
    overlay.classList.remove('modal-overlay--visible');
    setTimeout(() => {
      overlay.remove();
      if (onClose) onClose();
    }, 300);
  };

  // Close on overlay click (not modal body)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Close on button click
  overlay.querySelector('#modal-close-btn').addEventListener('click', close);

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  return { el: overlay, close };
}
