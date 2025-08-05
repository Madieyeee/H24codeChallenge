import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import CategoryFilter from '../components/CategoryFilter';

const HomePage = () => {
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

  const handleDeleteSnippet = async (id) => {
    try {
      await axios.delete(`/api/snippets/${id}`);
      setSnippets(snippets.filter(snippet => snippet.id !== id));
    } catch (error) {
      console.error('Error deleting snippet!', error);
    }
  };

  const handleSnippetAdded = (newSnippet) => {
    // If the new snippet matches the current filter, add it to the list
    if (selectedCategory === 'All' || selectedCategory === newSnippet.category) {
        setSnippets([newSnippet, ...snippets]);
    } else {
        // Optionally, switch to the new snippet's category
        setSelectedCategory(newSnippet.category);
    }
  };

  return (
    <>
      <SnippetForm onSnippetAdded={handleSnippetAdded} />
      <CategoryFilter onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />
      <SnippetList snippets={snippets} onDelete={handleDeleteSnippet} />
    </>
  );
};

export default HomePage;
