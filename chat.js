import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.46.5/dist/chat.bundle.es.js';

createChat({
  mode: 'window',
  webhookUrl: 'https://agenticflows.tokencraze.org/webhook/3eff179f-1d54-4839-9281-0c2b35819175/chat',
  loadPreviousSession: false,
  initialMessages: [
    'Hello. I can help you explore the JS-SEZ.',
    'Ask a question and I will point you to a playbook page.'
  ],
  i18n: {
    en: {
      title: 'JS-SEZ advisor',
      subtitle: 'A practical guide for manufacturers.',
      inputPlaceholder: 'Ask about the JS-SEZ...'
    }
  }
});

const enableKeyboardToggle = () => {
  const toggle = document.querySelector('#n8n-chat .chat-window-toggle');
  if (!toggle || toggle.dataset.keyboardAccessible) return Boolean(toggle);

  const panel = document.querySelector('#n8n-chat .chat-window');
  if (panel) {
    panel.id = 'n8n-chat-window';
    toggle.setAttribute('aria-controls', panel.id);
  }

  toggle.dataset.keyboardAccessible = 'true';
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('tabindex', '0');
  toggle.setAttribute('aria-label', 'Open JS-SEZ advisor');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('focus', () => toggle.classList.add('keyboard-focus'));
  toggle.addEventListener('blur', () => toggle.classList.remove('keyboard-focus'));
  toggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle.click();
    }
  });
  toggle.addEventListener('click', () => {
    requestAnimationFrame(() => {
      const isOpen = panel && getComputedStyle(panel).display !== 'none';
      toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
      toggle.setAttribute('aria-label', isOpen ? 'Close JS-SEZ advisor' : 'Open JS-SEZ advisor');
    });
  });
  return true;
};

if (!enableKeyboardToggle()) {
  const chatRoot = document.querySelector('#n8n-chat');
  if (chatRoot) {
    const observer = new MutationObserver(() => {
      if (enableKeyboardToggle()) observer.disconnect();
    });
    observer.observe(chatRoot, { childList: true, subtree: true });
  }
}
