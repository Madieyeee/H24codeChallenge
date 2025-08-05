import React from 'react';
import './ShareButtons.css';

const ShareButtons = ({ snippet }) => {
  const url = `${window.location.origin}/snippets/${snippet.id}`;
  const title = `Découvrez ce snippet : "${snippet.title}" sur SnipZone`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      // Idéalement, on utiliserait une notification toast ici
      alert('Lien copié dans le presse-papiers !');
    }).catch(err => {
      console.error('Erreur lors de la copie : ', err);
    });
  };

  return (
    <div className="share-buttons">
      <span>Partager :</span>
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn twitter"
      >
        Twitter
      </a>
      <a 
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn linkedin"
      >
        LinkedIn
      </a>
      <button onClick={copyToClipboard} className="share-btn copy-link">
        Copier Lien
      </button>
    </div>
  );
};

export default ShareButtons;
