import { convertMarkdownToHtml } from './markdownConverter';

describe('convertMarkdownToHtml', () => {
  test('should convert basic markdown elements', () => {
    const markdown = `# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold** and *italic* text.

* List item 1
* List item 2
  * Nested list item

1. Ordered item 1
2. Ordered item 2

[Link text](https://example.com)

\`inline code\`

\`\`\`
code block
multiple lines
\`\`\`

> Blockquote text
`;

    const expectedHtml = '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li>List item 1</li><li>List item 2<ul><li>Nested list item</li></ul></li></ul><ol><li>Ordered item 1</li><li>Ordered item 2</li></ol><p><a href="https://example.com">Link text</a></p><p><code>inline code</code></p><pre><code>code block\nmultiple lines</code></pre><blockquote>Blockquote text</blockquote>';
    
    expect(convertMarkdownToHtml(markdown)).toBe(expectedHtml);
  });

  test('should handle edge cases', () => {
    const markdown = `
Empty heading: #
**unclosed bold
*single asterisk
\`unclosed code
\`\`\`
unclosed code block

`;

    const expectedHtml = '<p>Empty heading: #</p><p>**unclosed bold</p><p>*single asterisk</p><p>`unclosed code</p><pre><code>unclosed code block</code></pre>';
    
    expect(convertMarkdownToHtml(markdown)).toBe(expectedHtml);
  });

  test('should sanitize XSS attempts', () => {
    const markdown = `
# <script>alert("XSS")</script>

[Link](javascript:alert('XSS'))

<img src="x" onerror="alert('XSS')">
`;

    const expectedHtml = '<h1>&lt;script&gt;alert("XSS")&lt;/script&gt;</h1><p><a href="#">Link</a></p><p>&lt;img src="x" onerror="alert(\'XSS\')"&gt;</p>';
    
    expect(convertMarkdownToHtml(markdown)).toBe(expectedHtml);
  });
}); 