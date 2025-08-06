import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Form.css';

const EditSnippetPage = () => {
  const [snippet, setSnippet] = useState({ title: '', description: '', category: 'PHP', code: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
                const response = await axios.get(`/snippets/${id}`);
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
          await axios.put(`/snippets/${id}`, snippet);
      toast.success('Snippet mis à jour avec succès !');
      navigate('/'); // Redirect to homepage after successful update
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du snippet.');
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
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
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
