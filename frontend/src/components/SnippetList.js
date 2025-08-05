import React from 'react';
import SnippetItem from './SnippetItem';
import './SnippetList.css';

const SnippetList = ({ snippets }) => {
  return (
    <div className="snippet-list">
      <h2>Code Snippets</h2>
      {snippets.map((snippet) => (
        <SnippetItem key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};

export default SnippetList;
