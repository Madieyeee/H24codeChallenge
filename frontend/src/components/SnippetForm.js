import React, { useState } from 'react';
import axios from 'axios';
import './SnippetForm.css';

const SnippetForm = ({ onSnippetAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('PHP');
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/snippets', { title, description, category, code });
      onSnippetAdded(response.data);
      setTitle('');
      setDescription('');
      setCategory('PHP');
      setCode('');
    } catch (error) {
      console.error('There was an error adding the snippet!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <h2>Ajouter un Code Snippet</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>
          Sélectionnez une catégorie
        </option>
        <option value="PHP">PHP</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
      </select>
      <textarea
        placeholder="Votre code ici..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        rows="10"
      ></textarea>
      <button type="submit">Ajouter le Snippet</button>
    </form>
  );
};

export default SnippetForm;
