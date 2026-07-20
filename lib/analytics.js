'use client';
// SRX Performance — Google Tag / Ads / GA4 event tracking helpers.
// Safe if tag IDs are not yet configured — every function is a no-op in that case.

// Google Ads conversion identifiers, exposed at build time via NEXT_PUBLIC_*.
export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || '';
export const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL || '';
export const GADS_CALL_LABEL = process.env.NEXT_PUBLIC_GADS_CALL_LABEL || '';

// Generic dataLayer + gtag event push. Used for engagement events.
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (e) {
    // silent
  }
}

// Generic conversion firer. Pass a full send_to like 'AW-XXXX/YYYY'.
export function trackConversion(eventName, sendTo, params = {}) {
  if (typeof window === 'undefined' || !sendTo) return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: sendTo, ...params });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, conversion: true, send_to: sendTo, ...params });
  } catch (e) {
    // silent
  }
}

// Lead / appointment conversion — fires the exact event snippet supplied by
// Google Ads. Only call this AFTER the backend confirms the lead is captured.
export function trackLeadConversion(params = {}) {
  if (!GADS_ID || !GADS_LEAD_LABEL) return;
  const sendTo = `${GADS_ID}/${GADS_LEAD_LABEL}`;
  const payload = { value: 1.0, currency: 'GBP', ...params };
  trackConversion('lead_conversion', sendTo, payload);
}

// "Click to call" conversion — mirrors the exact snippet Google provided:
//
//   function gtag_report_conversion(url) {
//     var callback = function () {
//       if (typeof(url) != 'undefined') { window.location = url; }
//     };
//     gtag('event', 'conversion', {
//       'send_to': 'AW-18261047881/vh5rCMKO1tMcEMn0xYNE',
//       'value': 1.0, 'currency': 'GBP', 'event_callback': callback
//     });
//     return false;
//   }
//
// Attach to phone <a href="tel:..."> links via onClick.
// Returns false so the caller can `return trackCallConversion(url)`
// from an onClick to intercept the default link behaviour and let the
// event_callback perform navigation once the beacon is queued (this is
// what Google recommends for click-to-call attribution accuracy).
export function trackCallConversion(url) {
  if (typeof window === 'undefined') return false;
  // Always still push a generic event so GTM / GA4 see the click too.
  trackEvent('phone_number_click', { url });
  const navigate = () => {
    if (url) window.location.href = url;
  };
  if (!GADS_ID || !GADS_CALL_LABEL || typeof window.gtag !== 'function') {
    navigate();
    return false;
  }
  window.gtag('event', 'conversion', {
    send_to: `${GADS_ID}/${GADS_CALL_LABEL}`,
    value: 1.0,
    currency: 'GBP',
    event_callback: navigate,
  });
  // Fallback: if for some reason event_callback doesn't fire within 700ms,
  // navigate anyway so the customer's dialer still opens.
  setTimeout(navigate, 700);
  return false;
}

export const Events = {
  checkVehicle: 'check_my_vehicle_click',
  quoteRequest: 'quote_request_click',
  phoneClick: 'phone_number_click',
  emailClick: 'email_link_click',
  contactSubmit: 'contact_form_submit',
  vehicleLookup: 'vehicle_lookup',
  leadCapture: 'lead_capture_submit',
};
