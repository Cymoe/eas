import sanitizeHtmlLib from 'sanitize-html';

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: { [key: string]: string[] };
}

const DEFAULT_OPTIONS = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 
    'strong', 'em', 'code', 'pre', 'blockquote', 'br', 'hr', 'img',
    'div', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ],
  allowedAttributes: {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'title'],
    'code': ['class'],
    'pre': ['class']
  }
};

export function sanitizeHtml(html: string, options: SanitizeOptions = {}): string {
  if (!html) return html;

  const sanitizeOptions = {
    allowedTags: options.allowedTags || DEFAULT_OPTIONS.allowedTags,
    allowedAttributes: options.allowedAttributes || DEFAULT_OPTIONS.allowedAttributes
  };

  return sanitizeHtmlLib(html, sanitizeOptions);
} 