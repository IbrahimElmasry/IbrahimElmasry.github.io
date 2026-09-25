(() => {
  document.querySelectorAll('.flow-trail[pathLength]').forEach(path => path.removeAttribute('pathLength'));
  const revealTargets = '.section-heading, .project-card, .timeline-item, .stack-intro, .skill-group, .contact-layout > div, .contact-section > .section-kicker, .service-card, .process-card, .about-grid > div, .pillar-card, .approach-banner, .faq-accordion-item, .proof-strip';
  let observer;
  let navObserver;
  const init = () => {
    const items = document.querySelectorAll(revealTargets);
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    observer ??= new IntersectionObserver((entries, current) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        current.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    items.forEach((item, index) => {
      if (item.classList.contains('reveal')) return;
      item.classList.add('reveal');
      item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
      observer.observe(item);
    });
  };
  const initNavObserver = () => {
    if (navObserver || !('IntersectionObserver' in window)) return;
    const sections = document.querySelectorAll('main section[id]');
    const links = document.querySelectorAll('.topbar nav a[href*="#"]');
    if (!sections.length || !links.length) return;
    navObserver = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      const activeHash = `#${current.target.id}`;
      links.forEach(link => {
        const active = new URL(link.href, location.href).hash === activeHash;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, .2, .5, .8] });
    sections.forEach(section => navObserver.observe(section));
  };
  let ticking = false;
  const updateScrollState = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? window.scrollY / range : 0;
      const bar = document.getElementById('scroll-progress-bar');
      if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      const header = document.querySelector('.topbar');
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
      const timeline = document.querySelector('.timeline');
      if (timeline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const rect = timeline.getBoundingClientRect();
        const focusLine = window.innerHeight * .62;
        const progress = Math.min(1, Math.max(0, (focusLine - rect.top) / rect.height));
        timeline.style.setProperty('--timeline-progress', progress.toFixed(4));
      }
      ticking = false;
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { init(); initNavObserver(); }, { once: true });
  else { init(); initNavObserver(); }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('pointermove', event => {
      const hero = event.target.closest?.('.hero');
      if (hero) {
        const heroCopy = hero.querySelector('.hero-copy');
        if (heroCopy) {
          const rect = heroCopy.getBoundingClientRect();
          heroCopy.style.setProperty('--hero-mouse-x', `${(event.clientX - rect.left).toFixed(1)}px`);
          heroCopy.style.setProperty('--hero-mouse-y', `${(event.clientY - rect.top).toFixed(1)}px`);
        }
      }
      const card = event.target.closest?.('.project-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - .5) * 2.2;
      const rotateX = (.5 - (y / rect.height)) * 1.6;
      card.style.setProperty('--spot-x', `${x}px`);
      card.style.setProperty('--spot-y', `${y}px`);
      card.style.setProperty('--card-rotate-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--card-rotate-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--cover-shift-x', `${(((x / rect.width) - .5) * -7).toFixed(1)}px`);
      card.style.setProperty('--cover-shift-y', `${(((y / rect.height) - .5) * -7).toFixed(1)}px`);
    });
    document.addEventListener('pointerout', event => {
      const card = event.target.closest?.('.project-card');
      if (!card || card.contains(event.relatedTarget)) return;
      ['--card-rotate-x','--card-rotate-y','--cover-shift-x','--cover-shift-y'].forEach(property => card.style.removeProperty(property));
    });
  }
  const app = document.getElementById('app');
  let handledHash = null;
  const scrollToHashTarget = () => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target || handledHash === id) return;
    handledHash = id;
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  window.portfolioScrollToHash = () => {
    handledHash = null;
    scrollToHashTarget();
  };
  window.addEventListener('hashchange', () => {
    handledHash = null;
    requestAnimationFrame(scrollToHashTarget);
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="#"]');
    if (!link || link.target || link.hasAttribute('download')) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || destination.pathname !== location.pathname || !destination.hash) return;
    const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    if (destination.hash !== location.hash) history.pushState(null, '', destination.hash);
    handledHash = null;
    scrollToHashTarget();
  });
  if (app && 'MutationObserver' in window) new MutationObserver(() => requestAnimationFrame(() => {
    init();
    initNavObserver();
    scrollToHashTarget();
    updateScrollState();
  })).observe(app, { childList: true, subtree: true });
  requestAnimationFrame(scrollToHashTarget);
  window.portfolioApplyScopeMessage = (message) => {
    const textarea = document.querySelector('form textarea[name="message"]');
    if (textarea) {
      textarea.value = message;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      textarea.focus();
      textarea.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    }
  };
  window.portfolioScrollChatBottom = () => {
    requestAnimationFrame(() => {
      const container = document.getElementById('chat-messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  };
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const btn = document.querySelector('.topbar-cmd-btn');
      if (btn) btn.click();
    }
  });
})();


