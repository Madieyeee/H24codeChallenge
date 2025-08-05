import React from 'react';
import './SnippetItem.css';

const SnippetItem = ({ snippet }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="snippet-item">
      <h3>{snippet.title}</h3>
      <p className="snippet-category">{snippet.category}</p>
      <p>{snippet.description}</p>
      <pre><code>{snippet.code}</code></pre>
      <button onClick={handleCopy}>Copy Code</button>
    </div>
  );
};

export default SnippetItem;
