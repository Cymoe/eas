/**
 * Converts markdown text to HTML
 * @param markdown The markdown text to convert
 * @returns The HTML string
 */
export function convertMarkdownToHtml(markdown: string): string {
  // Sanitize input to prevent XSS
  const sanitizeHtml = (text: string): string => {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Process inline elements (bold, italic, code, links)
  const processInlineElements = (text: string): string => {
    // Handle inline code with backticks
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle bold text with double asterisks
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text with single asterisks
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Handle links [text](url) - sanitize the URL
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      // Sanitize URL (prevent javascript: URLs)
      if (/^javascript:/i.test(url)) {
        url = '#';
      }
      return `<a href="${url}">${text}</a>`;
    });
    
    return text;
  };

  // Sanitize the entire input
  markdown = sanitizeHtml(markdown);
  
  // Split content into lines
  const lines = markdown.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeContent = '';
  let inOrderedList = false;
  let inUnorderedList = false;
  let inBlockquote = false;
  let blockquoteContent = '';
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeContent = '';
      } else {
        html += `<pre><code>${codeContent}</code></pre>`;
        inCodeBlock = false;
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent += (codeContent ? '\n' : '') + line;
      continue;
    }
    
    // Handle blockquotes
    if (line.startsWith('> ')) {
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteContent = line.substring(2);
      } else {
        blockquoteContent += ' ' + line.substring(2);
      }
      
      // If this is the last line or the next line doesn't start with >, close the blockquote
      if (i === lines.length - 1 || !lines[i + 1].trim().startsWith('> ')) {
        html += `<blockquote>${processInlineElements(blockquoteContent)}</blockquote>`;
        inBlockquote = false;
      }
      
      continue;
    }
    
    // If we were in a blockquote but this line isn't one, make sure it's closed
    if (inBlockquote && !line.startsWith('> ')) {
      html += `<blockquote>${processInlineElements(blockquoteContent)}</blockquote>`;
      inBlockquote = false;
    }
    
    // Skip empty lines unless they're meant to end a paragraph
    if (line === '' && i < lines.length - 1) {
      // Close any open lists
      if (inOrderedList) {
        html += '</ol>';
        inOrderedList = false;
      }
      if (inUnorderedList) {
        html += '</ul>';
        inUnorderedList = false;
      }
      continue;
    }
    
    // Handle headings
    if (line.startsWith('# ')) {
      html += `<h1>${processInlineElements(line.substring(2))}</h1>`;
      continue;
    }
    if (line.startsWith('## ')) {
      html += `<h2>${processInlineElements(line.substring(3))}</h2>`;
      continue;
    }
    if (line.startsWith('### ')) {
      html += `<h3>${processInlineElements(line.substring(4))}</h3>`;
      continue;
    }
    
    // Handle unordered lists
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const indent = line.search(/\S/);
      const content = line.substring(line.indexOf(' ') + 1);
      
      if (!inUnorderedList) {
        html += '<ul>';
        inUnorderedList = true;
      }
      
      // Handle nested lists
      if (indent > 0) {
        html = html.slice(0, -5); // Remove the last </li>
        html += '<ul><li>' + processInlineElements(content) + '</li></ul></li>';
      } else {
        html += '<li>' + processInlineElements(content) + '</li>';
      }
      
      // If this is the last line or the next line isn't a list item, close the list
      if (i === lines.length - 1 || 
          !(lines[i + 1].trim().startsWith('* ') || lines[i + 1].trim().startsWith('- '))) {
        html += '</ul>';
        inUnorderedList = false;
      }
      
      continue;
    }
    
    // Handle ordered lists
    if (/^\d+\.\s/.test(line)) {
      if (!inOrderedList) {
        html += '<ol>';
        inOrderedList = true;
      }
      
      const content = line.substring(line.indexOf(' ') + 1);
      html += '<li>' + processInlineElements(content) + '</li>';
      
      // If this is the last line or the next line isn't an ordered list item, close the list
      if (i === lines.length - 1 || !/^\d+\.\s/.test(lines[i + 1])) {
        html += '</ol>';
        inOrderedList = false;
      }
      
      continue;
    }
    
    // Handle paragraphs (anything else that's not empty)
    if (line !== '') {
      html += `<p>${processInlineElements(line)}</p>`;
    }
  }
  
  // Close any open code blocks
  if (inCodeBlock) {
    html += `<pre><code>${codeContent}</code></pre>`;
  }
  
  // Close any open blockquotes
  if (inBlockquote) {
    html += `<blockquote>${processInlineElements(blockquoteContent)}</blockquote>`;
  }
  
  // Close any open lists
  if (inOrderedList) {
    html += '</ol>';
  }
  if (inUnorderedList) {
    html += '</ul>';
  }
  
  return html;
} 