/**
 * HTML Sanitization Utility
 *
 * This utility provides safe HTML rendering to prevent XSS attacks.
 * Use this instead of dangerouslySetInnerHTML with unsanitized content.
 *
 * @module utils/sanitizeHtml
 */

import DOMPurify from 'dompurify';

/**
 * Default DOMPurify configuration
 * These settings balance security with common HTML formatting needs
 */
const DEFAULT_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span',
    'b', 'i', 's', 'strike', 'sub', 'sup', 'hr'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
    'style', 'width', 'height', 'align', 'colspan', 'rowspan'
  ],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'style', 'form', 'input'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_DOM_IMPORT: false,
  FORCE_BODY: false,
  SANITIZE_DOM: true,
  IN_PLACE: false,
};

/**
 * Strict configuration for untrusted content
 * Use when rendering completely untrusted user input
 */
const STRICT_CONFIG = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'style', 'form', 'input', 'img'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
  KEEP_CONTENT: true,
  SANITIZE_DOM: true,
};

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param {string} dirty - The potentially unsafe HTML string
 * @param {Object} config - Optional DOMPurify configuration (defaults to DEFAULT_CONFIG)
 * @returns {string} Sanitized HTML safe for rendering
 *
 * @example
 * import { sanitizeHtml } from 'utils/sanitizeHtml';
 *
 * const userInput = '<script>alert("XSS")</script><p>Hello</p>';
 * const safe = sanitizeHtml(userInput);
 * // Result: '<p>Hello</p>'
 *
 * <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(userInput) }} />
 */
export const sanitizeHtml = (dirty, config = DEFAULT_CONFIG) => {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(dirty, config);
};

/**
 * Sanitize HTML with strict security settings
 * Use for completely untrusted user content
 *
 * @param {string} dirty - The potentially unsafe HTML string
 * @returns {string} Sanitized HTML with minimal allowed tags
 *
 * @example
 * import { sanitizeHtmlStrict } from 'utils/sanitizeHtml';
 *
 * const commentText = userComment; // From untrusted source
 * const safe = sanitizeHtmlStrict(commentText);
 */
export const sanitizeHtmlStrict = (dirty) => {
  return sanitizeHtml(dirty, STRICT_CONFIG);
};

/**
 * Sanitize text-only content (strips all HTML)
 * Use when you only want plain text with no formatting
 *
 * @param {string} dirty - The potentially unsafe string
 * @returns {string} Plain text with all HTML removed
 *
 * @example
 * import { sanitizeText } from 'utils/sanitizeHtml';
 *
 * const input = '<script>alert("XSS")</script><p>Hello <strong>World</strong></p>';
 * const text = sanitizeText(input);
 * // Result: 'Hello World'
 */
export const sanitizeText = (dirty) => {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  });
};

/**
 * React component for safely rendering HTML
 * Alternative to using dangerouslySetInnerHTML directly
 *
 * @param {Object} props - Component props
 * @param {string} props.html - The HTML content to render
 * @param {string} props.className - Optional CSS class
 * @param {Object} props.config - Optional DOMPurify config
 * @param {boolean} props.strict - Use strict sanitization
 * @returns {JSX.Element}
 *
 * @example
 * import { SafeHtml } from 'utils/sanitizeHtml';
 *
 * <SafeHtml html={userContent} className="content" />
 * <SafeHtml html={untrustedContent} strict={true} />
 */
export const SafeHtml = ({ html, className = '', config, strict = false, ...props }) => {
  const cleanHtml = strict
    ? sanitizeHtmlStrict(html)
    : sanitizeHtml(html, config);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      {...props}
    />
  );
};

/**
 * Check if a URL is safe (no javascript: or data: protocols)
 *
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is safe
 *
 * @example
 * if (isSafeUrl(userProvidedUrl)) {
 *   window.location.href = userProvidedUrl;
 * }
 */
export const isSafeUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const dangerous = /^(javascript|data|vbscript):/i;
  return !dangerous.test(url.trim());
};

/**
 * Sanitize a URL for use in href attributes
 *
 * @param {string} url - URL to sanitize
 * @param {string} fallback - Fallback URL if unsafe (default: '#')
 * @returns {string} Safe URL
 */
export const sanitizeUrl = (url, fallback = '#') => {
  return isSafeUrl(url) ? url : fallback;
};

export default {
  sanitizeHtml,
  sanitizeHtmlStrict,
  sanitizeText,
  SafeHtml,
  isSafeUrl,
  sanitizeUrl,
};
