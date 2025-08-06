import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './SnippetDetailPage.css';

const SnippetDetailPage = () => {
  const [snippet, setSnippet] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
                const response = await axios.get(`/snippets/${id}`);
        setSnippet(response.data);
      } catch (error) {
        console.error('Error fetching snippet!', error);
        navigate('/'); // Redirect if snippet not found
      }
    };
    fetchSnippet();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce snippet ?')) {
      try {
        await axios.delete(`/api/snippets/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error deleting snippet!', error);
      }
    }
  };

  if (!snippet) {
    return <div>Chargement...</div>;
  }

  const languageMap = {
    PHP: 'php',
    HTML: 'html',
    CSS: 'css',
  };
  const language = languageMap[snippet.category] || 'php';

  return (
    <div className="snippet-detail-card">
      <div className="snippet-detail-header">
        <h2>{snippet.title}</h2>
        <span className={`snippet-category-tag ${snippet.category.toLowerCase()}`}>{snippet.category}</span>
      </div>
      <p className="snippet-description">{snippet.description}</p>
      <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
        {snippet.code}
      </SyntaxHighlighter>
      <div className="snippet-actions">
        <button onClick={() => navigate(-1)} className="back-btn">Retour</button>
        <div>
          <Link to={`/snippet/${snippet.id}/edit`}>
            <button className="edit-btn">Modifier</button>
          </Link>
          <button onClick={handleDelete} className="delete-btn">Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailPage;
