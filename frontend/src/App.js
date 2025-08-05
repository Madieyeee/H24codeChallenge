import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SnippetForm from './components/SnippetForm';
import SnippetList from './components/SnippetList';

function App() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('/api/snippets');
        setSnippets(response.data);
      } catch (error) {
        console.error('Error fetching snippets!', error);
      }
    };

    fetchSnippets();
  }, []);

  const handleSnippetAdded = (newSnippet) => {
    setSnippets([newSnippet, ...snippets]);
  };

  return (
    <div className="App">
      <h1>ShareMyCode</h1>
      <SnippetForm onSnippetAdded={handleSnippetAdded} />
      <SnippetList snippets={snippets} />
    </div>
  );
}

export default App;
