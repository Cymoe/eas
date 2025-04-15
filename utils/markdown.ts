import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Converts markdown string to sanitized HTML
 * @param markdown - Raw markdown string
 * @returns Sanitized HTML string
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  
  // Convert markdown to HTML
  const rawHtml = marked(markdown);
  
  // Sanitize HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'code', 'pre', 'blockquote'],
    ALLOWED_ATTR: ['href']
  });

  return sanitizedHtml;
}; 