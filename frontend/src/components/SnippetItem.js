import React from 'react';
import './SnippetItem.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetItem = ({ snippet }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    alert('Code copié dans le presse-papiers !');
  };

  const languageMap = {
    'PHP': 'php',
    'HTML': 'markup',
    'CSS': 'css'
  };
  const language = languageMap[snippet.category] || 'javascript';

  return (
    <div className="snippet-item">
      <h3>{snippet.title}</h3>
      <p className="snippet-category">{snippet.category}</p>
      <p>{snippet.description}</p>
      <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
        {snippet.code}
      </SyntaxHighlighter>
      <button onClick={handleCopy}>Copier le code</button>
    </div>
  );
};

export default SnippetItem;
