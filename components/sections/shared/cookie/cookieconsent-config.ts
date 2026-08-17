import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const GA4_MEASUREMENT_ID = 'G-GNRBF5M0E7';
const GA4_COOKIE_ID = '_ga_GNRBF5M0E7';
const MICROSOFT_CLARITY_PROJECT_ID = 'nn294zwqpz';

let googleAnalyticsInitialized = false;
let googleAnalyticsLoading = false;
let clarityInitialized = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    trackingFunctions?: {
      onLoad: (config: { appId: string }) => void;
    };
  }
}

/**
 * Schedule a callback during browser idle time.
 * Prevents third-party script loading from competing with LCP / FCP paint.
 */
const scheduleIdle = (fn: () => void, timeout = 2000) => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(() => fn(), { timeout });
  } else {
    setTimeout(fn, 100);
  }
};

const enableGoogleAnalytics = () => {
  if (
    typeof window === 'undefined' ||
    googleAnalyticsInitialized ||
    googleAnalyticsLoading
  ) {
    return;
  }

  // Defer actual script injection to idle time
  scheduleIdle(() => {
    if (googleAnalyticsInitialized || googleAnalyticsLoading) return;

    googleAnalyticsLoading = true;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
      window.gtag ??
      function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };

    const configureGoogleAnalytics = () => {
      if (googleAnalyticsInitialized) {
        return;
      }

      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
      window.gtag?.('js', new Date());
      window.gtag?.('config', GA4_MEASUREMENT_ID, {
        cookie_update: true,
        send_page_view: true,
      });
      googleAnalyticsInitialized = true;
      googleAnalyticsLoading = false;
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-ga4-id="${GA4_MEASUREMENT_ID}"]`,
    );

    if (existingScript) {
      configureGoogleAnalytics();
      return;
    }

    const script = document.createElement('script');

    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    script.dataset.ga4Id = GA4_MEASUREMENT_ID;
    script.addEventListener('load', configureGoogleAnalytics, { once: true });
    script.addEventListener(
      'error',
      () => {
        googleAnalyticsLoading = false;
      },
      { once: true },
    );
    document.head.append(script);
  });
};

const enableLinkedInInsight = () => {
  // TODO: Add the LinkedIn Partner ID here, then load the Insight Tag.
};

const enableMicrosoftClarity = async () => {
  if (typeof window === 'undefined' || clarityInitialized) {
    return;
  }

  clarityInitialized = true;

  // Defer Clarity initialization to idle time
  scheduleIdle(async () => {
    const { default: Clarity } = await import('@microsoft/clarity');

    Clarity.init(MICROSOFT_CLARITY_PROJECT_ID);
    Clarity.consentV2({
      ad_Storage: 'granted',
      analytics_Storage: 'granted',
    });
  });
};

let apolloInitialized = false;

const enableApolloTracking = () => {
  if (typeof window === 'undefined' || apolloInitialized) {
    return;
  }

  apolloInitialized = true;

  // Defer Apollo script injection to idle time
  scheduleIdle(() => {
    const n = Math.random().toString(36).substring(7);
    const o = document.createElement('script');
    o.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${n}`;
    o.async = true;
    o.onload = () => {
      window.trackingFunctions?.onLoad({ appId: '680a00e8c590a20021f0c777' });
    };
    document.head.appendChild(o);
  });
};

const disableGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }
};

const ensureServicesFromConsent = (services?: Record<string, string[]>) => {
  const analytics = services?.analytics ?? [];
  const marketing = services?.marketingAndInsights ?? [];

  if (analytics.includes('googleAnalytics')) enableGoogleAnalytics();
  else disableGoogleAnalytics();

  if (marketing.includes('apolloTracking')) enableApolloTracking();
  if (marketing.includes('microsoftClarity')) enableMicrosoftClarity();
  if (marketing.includes('linkedInInsight')) enableLinkedInInsight();
};

const pluginConfig: CookieConsentConfig = {
  autoShow: true,
  revision: 3,
  onFirstConsent: ({ cookie }) => {
    ensureServicesFromConsent(cookie.services);
  },
  onConsent: ({ cookie }) => {
    ensureServicesFromConsent(cookie.services);
  },
  onChange: ({ cookie }) => {
    ensureServicesFromConsent(cookie.services);
  },
  guiOptions: {
    consentModal: {
      layout: 'cloud',
      position: 'bottom left',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      enabled: true,
      services: {
        googleAnalytics: {
          label: 'Google Analytics',
          onAccept: enableGoogleAnalytics,
          onReject: disableGoogleAnalytics,
        },
      },
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid|_ga_.*)/,
          },
        ],
      },
    },
    marketingAndInsights: {
      enabled: true,
      services: {
        linkedInInsight: {
          label: 'LinkedIn Insight Tag',
          onAccept: enableLinkedInInsight,
        },
        microsoftClarity: {
          label: 'Microsoft Clarity',
          onAccept: enableMicrosoftClarity,
        },
        apolloTracking: {
          label: 'Apollo tracking',
          onAccept: enableApolloTracking,
        },
      },
      autoClear: {
        cookies: [
          {
            name: /^(bcookie|bscookie|li_gc|lidc|UserMatchHistory|AnalyticsSyncHistory)$/,
          },
          {
            name: /^(_clck|_clsk|CLID|ANONCHK|MR|MUID|SM)$/,
          },
          {
            name: /^apollo/,
          },
        ],
      },
    },
  },

  language: {
    default: 'en',

    translations: {
      en: {
        consentModal: {
          title: 'Cookie preferences at PrimeQA Solutions',
          description:
            'PrimeQA Solutions uses cookies to keep this website reliable, understand how visitors explore our QA and software testing services, and improve communication with startups and enterprise clients. <a href="#privacy-policy" data-cc="show-preferencesModal" class="cc__link">Manage preferences</a>',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Accept required only',
          showPreferencesBtn: 'Manage preferences',
          //closeIconLabel: 'Close',
          footer: `
            <a href="/legal/privacy-policy">Privacy Policy</a>
            <a href="/legal/cookie-policy">Cookie Policy</a>
          `,
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Accept required',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description:
                'PrimeQA Solutions is a NASSCOM member and Startup India-recognized software testing company based in Ahmedabad. We use cookies to keep the website stable, measure interest in services such as automation testing, performance testing, VAPT, mobile app testing, and API testing, and improve the experience for visitors from India, the USA, the UK, and other markets. For details, read our <a href="/legal/cookie-policy" class="cc__link">cookie policy</a>.',
            },
            {
              title:
                'Strictly necessary cookies <span class="pm__badge">Always enabled</span>',
              description:
                'These cookies support core website operation, reduce friction, and keep information about our QA services usable and reliable. They cannot be disabled.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analytics cookies',
              description:
                'These cookies are enabled by default and help us monitor site performance and understand which QA service pages visitors engage with. You can disable them anytime.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Service',
                  description: 'Description',
                  expiration: 'Expiration',
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'Google Analytics',
                    description:
                      'Helps measure website usage and understand which QA service pages visitors engage with.',
                    expiration: 'Up to 2 years',
                  },
                  {
                    name: GA4_COOKIE_ID,
                    domain: 'Google Analytics 4',
                    description:
                      'Stores the GA4 property session state for PrimeQA website measurement.',
                    expiration: 'Up to 2 years',
                  },
                  {
                    name: '_gid',
                    domain: 'Google Analytics',
                    description:
                      'Helps distinguish visits during a short session for website performance reporting.',
                    expiration: '24 hours',
                  },
                ],
              },
            },
            {
              title: 'Marketing and insight cookies',
              description:
                'These cookies are enabled by default and help us understand campaign performance, page interactions, and qualified business interest from startups and enterprises looking for QA support. You can disable them anytime.',
              linkedCategory: 'marketingAndInsights',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Service',
                  description: 'Description',
                  expiration: 'Expiration',
                },
                body: [
                  {
                    name: 'bcookie, li_gc, lidc',
                    domain: 'LinkedIn',
                    description:
                      'Helps measure LinkedIn campaign performance for PrimeQA content and service pages.',
                    expiration: 'Session to 2 years',
                  },
                  {
                    name: '_clck, _clsk',
                    domain: 'Microsoft Clarity',
                    description:
                      'Helps analyze page interactions so we can improve navigation and content clarity.',
                    expiration: 'Session to 1 year',
                  },
                  {
                    name: 'apollo*',
                    domain: 'Apollo',
                    description:
                      'Helps understand and qualify business visitor engagement for sales follow-up.',
                    expiration: 'Varies by Apollo configuration',
                  },
                ],
              },
            },
            {
              title: 'More information',
              description:
                'Questions about how PrimeQA Solutions uses cookies for website performance, service insights, or business communication? Please <a class="cc__link" href="/contact">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};

export default pluginConfig;
