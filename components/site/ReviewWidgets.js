'use client';
import { useEffect, useRef } from 'react';

// Reviewability / revu.cloud review widgets.
// The vendor scripts locate their container via document.currentScript.parentElement,
// so we inject the <script> as a child of the container on mount. This also makes the
// widgets re-initialise correctly on client-side page navigation.

const REVU_URL = 'https://app.revu.cloud';
const BUSINESS_ID = '177835';
const BANNER_AID = '32313';
const WIDGET_SRC = 'https://widget.reviewability.com/js/widgetAdv.min.js';
const POPUP_SRC = 'https://widget.reviewability.com/js/popupWidget.min.js';
const POPUP_PIXEL = 'https://app.revu.cloud/popup-pixel/get/0a9f9953429c54424d0f1ce277f70dfcc7574b95';

const injectScript = (container, src, attrs = {}) => {
  if (!container || container.querySelector('script[data-srx-injected]')) return;
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.setAttribute('data-srx-injected', 'true');
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  container.appendChild(s);
};

const ReviewWidget = ({ aid, testId, className = '' }) => {
  const ref = useRef(null);
  useEffect(() => { injectScript(ref.current, WIDGET_SRC); }, []);
  return (
    <div className={className} data-testid={testId}>
      <div
        ref={ref}
        data-bid={BUSINESS_ID}
        data-url={REVU_URL}
        {...(aid ? { 'data-aid': aid } : {})}
        suppressHydrationWarning
      />
      <script className="json-ld-content" type="application/ld+json" suppressHydrationWarning />
    </div>
  );
};

// Banner section — home/landing page
export const ReviewBanner = (props) => <ReviewWidget aid={BANNER_AID} testId="review-banner-widget" {...props} />;

// Full page — dedicated testimonials page
export const ReviewFullPage = (props) => <ReviewWidget testId="review-fullpage-widget" {...props} />;

// Popup — sitewide (mounted once in the root layout)
export const ReviewPopup = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (document.getElementById('popup-rating-widget-script')) return;
    injectScript(ref.current, POPUP_SRC, { id: 'popup-rating-widget-script', 'data-gfspw': POPUP_PIXEL });
  }, []);
  return <div id="popup-rating-widget" ref={ref} suppressHydrationWarning />;
};
