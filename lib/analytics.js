'use client';
// Lightweight GTM + gtag event tracking helper. Safe if IDs are not configured.
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

// Google Ads conversion tracking helper.
// Once you have a conversion label from Google Ads (send_to: 'AW-XXXX/YYYY'),
// call trackConversion('lead_capture', 'AW-18261047881/YourLabel', { value: 10, currency: 'GBP' })
export function trackConversion(eventName, sendTo, params = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function' && sendTo) {
      window.gtag('event', 'conversion', { send_to: sendTo, ...params });
    }
    // Always push to dataLayer for GTM triggers
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, conversion: true, ...params });
  } catch (e) {
    // silent
  }
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
