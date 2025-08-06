import React from 'react';

const MarkdownRenderer = ({ content }: { content: string }) => {
  const toHtml = (text: string) => {
    let html = text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='rounded-lg my-6 w-full h-auto object-cover' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>")
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^\s*[-*] (.*)/gim, '<ul>\n<li>$1</li>\n</ul>')
      .replace(/<\/ul>\n<ul>/gim, '')
      .replace(/```(\w+)?\n([\s\S]*?)\n```/gim, `<pre class='bg-gray-800 p-4 rounded-md my-4 overflow-x-auto'><code>$2</code></pre>`)
      .replace(/`([^`]+)`/gim, `<code>$1</code>`);

    return html.split('\n').map(line => {
      if (line.trim() === '' || line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li') || line.startsWith('<blockquote>') || line.startsWith('<pre') || line.startsWith('<img')) {
        return line;
      }
      return `<p class=\"my-4\">${line}</p>`;
    }).join('');
  };

  return <div dangerouslySetInnerHTML={{ __html: toHtml(content) }} />;
};

export default MarkdownRenderer;
