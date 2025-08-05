import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import { toast } from 'react-toastify';
import '../styles/HomePage.css';

const HomePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const params = { page: currentPage };
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        const response = await axios.get('/api/snippets', { params });
        setSnippets(response.data.data);
        setPaginationData(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des snippets.');
      }
    };

    fetchSnippets();
  }, [selectedCategory, currentPage]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await axios.delete(`/api/snippets/${id}`);
      setSnippets(snippets.filter(snippet => snippet.id !== id));
      toast.success('Snippet supprimé avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la suppression du snippet.');
    }
  };

  const handleSnippetAdded = (newSnippet) => {
    if (selectedCategory === 'All' || selectedCategory === newSnippet.category) {
        setSnippets([newSnippet, ...snippets]);
    } else {
        setSelectedCategory(newSnippet.category);
    }
  };

  const filteredSnippets = snippets.filter(snippet =>
    (snippet.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (snippet.description && snippet.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <SnippetForm onSnippetAdded={handleSnippetAdded} />
      <div className="filters-container">
        <CategoryFilter onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />
        <input
          type="text"
          placeholder="Rechercher par titre ou description..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <SnippetList snippets={filteredSnippets} onDelete={handleDeleteSnippet} />
      <Pagination paginationData={paginationData} onPageChange={handlePageChange} />
    </>
  );
};

export default HomePage;
