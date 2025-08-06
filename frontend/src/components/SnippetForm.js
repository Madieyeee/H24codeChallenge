import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosConfig';
import '../styles/Form.css';

const SnippetForm = ({ onSnippetAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('PHP');
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !code) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }
    try {
      const response = await axiosInstance.post('/snippets', { title, description, category, code });
      toast.success('Snippet ajouté avec succès !');
      onSnippetAdded(response.data);
      setTitle('');
      setDescription('');
      setCategory('PHP');
      setCode('');
    } catch (error) {
      console.error('Error adding snippet!', error);
      toast.error('Erreur lors de l\'ajout du snippet.');
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <h2>Ajouter un Code Snippet</h2>
        <div className="form-group">
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du snippet"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Courte description"
            required
          />
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Votre extrait de code"
            rows="10"
            required
          ></textarea>
        </div>
        <button type="submit">Ajouter le Snippet</button>
      </form>
    </div>
  );
};

export default SnippetForm;
