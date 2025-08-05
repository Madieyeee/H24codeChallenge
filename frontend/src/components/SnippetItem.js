import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SnippetItem.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetItem = ({ snippet, onDelete }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success('Code copié dans le presse-papiers !');
  };

  const languageMap = {
    'PHP': 'php',
    'HTML': 'markup',
    'CSS': 'css'
  };
  const language = languageMap[snippet.category] || 'javascript';

  return (
    <div className="snippet-item">
      <Link to={`/snippets/${snippet.id}`} className="snippet-title-link">
        <h3>{snippet.title}</h3>
      </Link>
      <p className="snippet-category">{snippet.category}</p>
      <p>{snippet.description}</p>
      <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
        {snippet.code}
      </SyntaxHighlighter>
      <div className="snippet-actions">
        <button onClick={handleCopy} className="copy-btn">Copier le code</button>
        <Link to={`/edit/${snippet.id}`}>
          <button className="edit-btn">Modifier</button>
        </Link>
        <button onClick={() => onDelete(snippet.id)} className="delete-btn">Supprimer</button>
      </div>
    </div>
  );
};

export default SnippetItem;
