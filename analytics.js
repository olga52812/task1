(() => {
  'use strict';
  const config = window.TERRA_CONFIG || {};
  const id = config.gaMeasurementId || '';
  const configured = /^G-[A-Z0-9]+$/.test(id);
  let active = false;
  const read = () => { try { return localStorage.getItem('terra-analytics-consent'); } catch { return null; } };
  const write = value => { try { localStorage.setItem('terra-analytics-consent', value); } catch { /* Session choice still works. */ } };
  function start() {
    if (!configured || active) return;
    active = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: true, allow_google_signals: false, allow_ad_personalization_signals: false, debug_mode: Boolean(config.gaDebug) });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  window.terraTrack = (name, parameters = {}) => {
    if (active && window.gtag) window.gtag('event', name, parameters);
  };
  const dialog = document.getElementById('consent-dialog');
  document.getElementById('analytics-status').textContent = configured ? 'Вибір можна змінити через посилання внизу сторінки.' : 'У демонстраційній версії Google Analytics ще не підключено.';
  document.getElementById('consent-yes').disabled = !configured;
  document.getElementById('privacy').addEventListener('click', () => dialog.showModal());
  document.getElementById('consent-yes').addEventListener('click', () => { write('granted'); start(); dialog.close(); });
  document.getElementById('consent-no').addEventListener('click', () => {
    write('denied');
    // Reload stops an already-loaded Google script from collecting further events.
    if (active) { window['ga-disable-' + id] = true; location.reload(); }
    else dialog.close();
  });
  if (configured && read() === 'granted') start();
  else if (configured && read() === null) dialog.showModal();
})();
