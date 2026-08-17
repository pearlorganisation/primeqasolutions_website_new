'use client';
import { useEffect } from 'react';

// Split CSS: load only what is needed for the initial consent banner.
import 'vanilla-cookieconsent/dist/css-components/base.css';
import 'vanilla-cookieconsent/dist/css-components/consent-modal.css';
import 'vanilla-cookieconsent/dist/css-components/light-scheme.css';

let cookieConsentInitialized = false;

let preferencesStylesLoaded = false;
const loadPreferencesStyles = () => {
  if (preferencesStylesLoaded) return;
  preferencesStylesLoaded = true;
  import(
    /* webpackChunkName: "cc-preferences" */
    'vanilla-cookieconsent/dist/css-components/preferences-modal.css'
  );
};

const CookieConsentApiBtns = () => {
  useEffect(() => {
    if (cookieConsentInitialized) {
      return;
    }
    cookieConsentInitialized = true;

    const onPreferencesOpen = () => {
      loadPreferencesStyles();
      window.removeEventListener('cc:onModalShow', onPreferencesOpen);
    };
    window.addEventListener('cc:onModalShow', onPreferencesOpen, {
      once: true,
      passive: true,
    });

    const initCookieConsent = async () => {
      const [{ run }, { default: pluginConfig }] = await Promise.all([
        import('vanilla-cookieconsent'),
        import('./cookieconsent-config'),
      ]);
      void run(pluginConfig);
    };

    let idleId: ReturnType<typeof requestIdleCallback> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof requestIdleCallback === 'function') {
      idleId = requestIdleCallback(() => void initCookieConsent(), {
        timeout: 3500,
      });
    } else {
      timeoutId = setTimeout(() => void initCookieConsent(), 1500);
    }

    return () => {
      window.removeEventListener('cc:onModalShow', onPreferencesOpen);
      if (idleId !== undefined && typeof cancelIdleCallback === 'function') {
        cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
};

export default CookieConsentApiBtns;
