/* Shared "alive" motion layer for boutique section previews.
   Non-structural: only WAAPI + inline transforms on existing nodes, so React reconciliation is unaffected. */
(function () {
  if (window.Alive) return;
  const EASE = 'cubic-bezier(.16,1,.3,1)';
  const reducedMQ = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const fs = (el) => parseFloat(getComputedStyle(el).fontSize) || 0;
  const vis = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; };

  function grain() {
    if (document.getElementById('alive-grain')) return;
    const g = document.createElement('div');
    g.id = 'alive-grain';
    g.setAttribute('aria-hidden', 'true');
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";
    Object.assign(g.style, { position: 'fixed', inset: '-50%', zIndex: 2147483000, pointerEvents: 'none', opacity: '.06', mixBlendMode: 'multiply', backgroundImage: 'url("data:image/svg+xml;utf8,' + svg + '")' });
    document.body.appendChild(g);
    g.animate([{ transform: 'translate(0,0)' }, { transform: 'translate(-3%,2%)' }, { transform: 'translate(2%,-3%)' }, { transform: 'translate(-1%,3%)' }, { transform: 'translate(0,0)' }], { duration: 900, iterations: Infinity, easing: 'steps(5)' });
  }

  function attach(root, opts = {}) {
    if (!root || (reducedMQ && reducedMQ.matches) || opts.reduced) return () => {};
    grain();
    const offs = [];
    const seen = new WeakSet();
    const parallax = new Set(), drift = new Set();

    const reveal = (el) => {
      if (el.dataset.alv === 'done') return;
      el.dataset.alv = 'done';
      const tag = el.tagName;
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      if (tag === 'H2' || (tag === 'P' && fs(el) >= 40)) {
        el.animate([{ clipPath: 'inset(0 0 100% 0)', transform: 'translateY(.35em)', filter: 'blur(8px)', opacity: 0 }, { clipPath: 'inset(0 0 -20% 0)', transform: 'none', filter: 'blur(0)', opacity: 1 }], { duration: 1100, easing: EASE, fill: 'backwards' });
        countUp(el);
      } else if (el.hasAttribute('data-rv')) {
        el.animate([{ clipPath: 'inset(14% 10% 14% 10%)', opacity: 0.2 }, { clipPath: 'inset(0 0 0 0)', opacity: 1 }], { duration: 1200, easing: EASE, fill: 'backwards' });
        const m = el.firstElementChild;
        if (m) m.animate([{ scale: '1.18' }, { scale: '1' }], { duration: 1600, easing: EASE, fill: 'backwards', composite: 'add' });
      } else if (el.hasAttribute('data-it')) {
        el.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: Math.min(sib, 8) * 70, easing: EASE, fill: 'backwards' });
      } else {
        el.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 800, easing: EASE, fill: 'backwards' });
        countUp(el);
      }
    };

    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    function countUp(el) {
      if (el.children.length > 1) return;
      const node = [...el.childNodes].find((n) => n.nodeType === 3 && n.nodeValue.trim());
      if (!node || fs(el) < 56) return;
      const final = node.nodeValue, m = final.match(/^(\D*)([\d,]+(?:\.\d+)?)(\D*)$/);
      if (!m) return;
      const target = parseFloat(m[2].replace(/,/g, '')), dec = (m[2].split('.')[1] || '').length, comma = m[2].includes(',');
      if (!isFinite(target) || target === 0) return;
      const t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4), v = target * e;
        let s = dec ? v.toFixed(dec) : Math.round(v).toString();
        if (comma) s = Number(s).toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (node.nodeValue !== final && p < 1 || p === 0) node.nodeValue = m[1] + s + m[3];
        if (p < 1) requestAnimationFrame(step); else node.nodeValue = final;
      };
      node.nodeValue = m[1] + '0' + m[3];
      requestAnimationFrame(step);
    }

    function shimmer(em) {
      if (em.dataset.alsh) return;
      em.dataset.alsh = '1';
      const c = getComputedStyle(em).color;
      Object.assign(em.style, { backgroundImage: 'linear-gradient(100deg,' + c + ' 0 42%,color-mix(in oklab,' + c + ' 35%,#fff8e1) 50%,' + c + ' 58% 100%)', backgroundSize: '250% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' });
      em.animate([{ backgroundPosition: '100% 0' }, { backgroundPosition: '100% 0', offset: 0.55 }, { backgroundPosition: '-50% 0' }], { duration: 7000, iterations: Infinity, delay: Math.random() * 3000, easing: 'ease-in-out' });
    }

    function magnetic(el) {
      if (el.dataset.almg) return;
      el.dataset.almg = '1';
      const mv = (e) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left - r.width / 2) * 0.22, y = (e.clientY - r.top - r.height / 2) * 0.3; el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px'; };
      const lv = () => { el.animate([{ translate: el.style.translate || '0 0' }, { translate: '0 0' }], { duration: 600, easing: 'cubic-bezier(.34,1.56,.64,1)' }); el.style.translate = '0 0'; };
      el.style.transition = (el.style.transition ? el.style.transition + ',' : '') + 'box-shadow 300ms';
      const en = () => { el.style.boxShadow = '0 18px 40px -18px color-mix(in oklab,var(--c-primary) 70%,transparent)'; };
      const ex = () => { el.style.boxShadow = ''; lv(); };
      el.addEventListener('pointermove', mv); el.addEventListener('pointerenter', en); el.addEventListener('pointerleave', ex);
      offs.push(() => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerenter', en); el.removeEventListener('pointerleave', ex); });
    }

    function tilt(el) {
      if (el.dataset.altl) return;
      el.dataset.altl = '1';
      const m = el.firstElementChild; if (!m) return;
      const mv = (e) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; m.style.rotate = 'none'; m.style.transform = 'perspective(900px) rotateY(' + (x * 5).toFixed(2) + 'deg) rotateX(' + (-y * 5).toFixed(2) + 'deg)'; m.style.transition = 'transform 120ms'; };
      const lv = () => { m.style.transition = 'transform 700ms ' + EASE; m.style.transform = ''; };
      el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv);
      offs.push(() => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv); });
    }

    function scan() {
      root.querySelectorAll('h2, [data-rv], [data-it], blockquote, section p, section h3, section ul, section ol').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.closest('[data-it]') && el !== el.closest('[data-it]')) return;
        if (el.closest('[data-rv]') && el !== el.closest('[data-rv]')) return;
        if (vis(el)) { el.dataset.alv = 'done'; countUp(el); } else io.observe(el);
      });
      root.querySelectorAll('h2 em, h3 em').forEach(shimmer);
      root.querySelectorAll('a[target="_blank"], button').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && r.width < 420 && r.height <= 72 && getComputedStyle(el).borderRadius !== '0px') magnetic(el); });
      root.querySelectorAll('[data-rv]').forEach((el) => { if (el.querySelector(':scope > div > img, :scope > img')) { parallax.add(el); tilt(el); } });
      root.querySelectorAll('h2').forEach((el) => { if (fs(el) >= 64) drift.add(el); });
      root.querySelectorAll('[data-pulse]').forEach((el) => { if (el.dataset.alp) return; el.dataset.alp = '1'; el.animate([{ transform: 'scale(1)', opacity: 0.55 }, { transform: 'scale(1.7)', opacity: 0 }], { duration: 1800, iterations: Infinity, easing: 'cubic-bezier(.2,.7,.3,1)' }); });
      root.querySelectorAll('[data-spin]').forEach((el) => { if (el.dataset.als) return; el.dataset.als = '1'; el.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 14000, iterations: Infinity }); });
      root.querySelectorAll('[data-typing]').forEach((el) => { if (el.dataset.alt) return; el.dataset.alt = '1'; el.animate([{ transform: 'translateY(0)', opacity: 0.4 }, { transform: 'translateY(-4px)', opacity: 1 }, { transform: 'translateY(0)', opacity: 0.4 }], { duration: 900, iterations: Infinity, delay: (+el.dataset.typing - 1) * 150 }); });
      root.querySelectorAll('[data-marquee]').forEach((el) => { if (el.dataset.alm) return; el.dataset.alm = '1'; el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 22000, iterations: Infinity }); });
      root.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
        if (el.dataset.alam || !/radial-gradient/.test(el.style.background || el.style.backgroundImage || '')) return;
        el.dataset.alam = '1';
        el.animate([{ transform: el.style.transform || 'none', opacity: 0.85 }, { transform: (el.style.transform || '') + ' scale(1.12) translate(2%,-3%)', opacity: 1 }], { duration: 9000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = innerHeight;
        parallax.forEach((el) => { if (!el.isConnected) return parallax.delete(el); const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; const p = (r.top + r.height / 2 - vh / 2) / vh; const m = el.querySelector(':scope > div') || el.firstElementChild; if (m) { m.style.translate = '0 ' + (p * -6).toFixed(2) + '%'; m.style.scale = '1.12'; } });
        drift.forEach((el) => { if (!el.isConnected) return drift.delete(el); const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; const p = (r.top - vh / 2) / vh; el.style.translate = (p * -18).toFixed(1) + 'px 0'; });
      });
    };
    addEventListener('scroll', onScroll, { capture: true, passive: true });
    addEventListener('resize', onScroll);
    offs.push(() => { removeEventListener('scroll', onScroll, { capture: true }); removeEventListener('resize', onScroll); });

    let mt = 0;
    const mo = new MutationObserver((recs) => {
      const big = recs.some((r) => r.addedNodes.length && [...r.addedNodes].some((n) => n.nodeType === 1 && n.tagName === 'SECTION'));
      clearTimeout(mt);
      mt = setTimeout(() => {
        if (big) root.animate([{ opacity: 0.35, transform: 'translateY(10px)', filter: 'blur(4px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 650, easing: EASE });
        scan(); onScroll();
      }, 60);
    });
    mo.observe(root, { childList: true, subtree: true });
    offs.push(() => mo.disconnect(), () => io.disconnect());

    scan(); onScroll();
    return () => offs.forEach((f) => f());
  }

  window.Alive = { attach };
})();
