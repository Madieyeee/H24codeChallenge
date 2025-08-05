import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SnippetForm from './components/SnippetForm';
import SnippetList from './components/SnippetList';
import CategoryFilter from './components/CategoryFilter';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const url = selectedCategory === 'All' ? '/api/snippets' : `/api/snippets?category=${selectedCategory}`;
        const response = await axios.get(url);
        setSnippets(response.data);
      } catch (error) {
        console.error('Error fetching snippets!', error);
      }
    };

    fetchSnippets();
  }, [selectedCategory]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSnippetAdded = (newSnippet) => {
    setSnippets([newSnippet, ...snippets]);
  };

  return (
    <div className="App">
      <h1>SnipZone</h1>
      <SnippetForm onSnippetAdded={handleSnippetAdded} />
      <CategoryFilter onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />
      <SnippetList snippets={snippets} />
    </div>
  );
}

export default App;
