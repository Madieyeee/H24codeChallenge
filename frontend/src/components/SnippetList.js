import React from 'react';
import SnippetItem from './SnippetItem';
import './SnippetList.css';

const SnippetList = ({ snippets, onDelete, onLike, likedSnippets }) => {
  return (
    <div className="snippet-list">
      <h2>Code Snippets</h2>
      {snippets.map((snippet) => (
        <SnippetItem key={snippet.id} snippet={snippet} onDelete={onDelete} onLike={onLike} isLiked={likedSnippets.includes(snippet.id)} />
      ))}
    </div>
  );
};

export default SnippetList;
