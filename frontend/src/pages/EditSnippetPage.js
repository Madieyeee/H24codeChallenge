import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const EditSnippetPage = () => {
  const [snippet, setSnippet] = useState({ title: '', description: '', category: 'PHP', code: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await axios.get(`/api/snippets/${id}`);
        setSnippet(response.data);
      } catch (error) {
        console.error('Error fetching snippet!', error);
      }
    };
    fetchSnippet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSnippet(prevSnippet => ({ ...prevSnippet, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/snippets/${id}`, snippet);
      navigate('/'); // Redirect to homepage after successful update
    } catch (error) {
      console.error('Error updating snippet!', error);
    }
  };

  return (
    <div className="form-card">
      <h2>Modifier le Snippet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={snippet.title}
            onChange={handleChange}
            placeholder="Titre du snippet"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={snippet.description}
            onChange={handleChange}
            placeholder="Courte description"
            required
          />
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select name="category" value={snippet.category} onChange={handleChange}>
            <option value="PHP">PHP</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Code</label>
          <textarea
            name="code"
            value={snippet.code}
            onChange={handleChange}
            placeholder="Votre extrait de code"
            rows="10"
            required
          ></textarea>
        </div>
        <div className="form-actions">
            <button type="submit" className="submit-btn">Mettre à jour</button>
            <button type="button" onClick={() => navigate('/')} className="cancel-btn">Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default EditSnippetPage;
