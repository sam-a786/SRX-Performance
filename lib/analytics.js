'use client';
// SRX Performance — Google Tag / Ads / GA4 event tracking helpers.
// Safe if tag IDs are not yet configured — every function is a no-op in that case.

// Google Ads conversion identifiers, exposed at build time via NEXT_PUBLIC_*.
export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || '';
export const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL || '';

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
// Google Ads for this conversion action.
//
// Corresponds to:
//   gtag('event', 'conversion', {
//     'send_to': 'AW-18261047881/ylSRCMX6jcMcEMn0xYNE',
//     'value': 1.0,
//     'currency': 'GBP'
//   });
//
// Call this ONLY after a lead is confirmed captured on the backend, so that
// Google Ads only counts genuine conversions (not button clicks).
export function trackLeadConversion(params = {}) {
  if (!GADS_ID || !GADS_LEAD_LABEL) return;
  const sendTo = `${GADS_ID}/${GADS_LEAD_LABEL}`;
  const payload = { value: 1.0, currency: 'GBP', ...params };
  trackConversion('lead_conversion', sendTo, payload);
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
