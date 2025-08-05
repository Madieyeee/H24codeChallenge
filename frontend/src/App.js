import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import EditSnippetPage from './pages/EditSnippetPage';
import SnippetDetailPage from './pages/SnippetDetailPage';

function App() {
  return (
    <div className="App">
      <h1>SnipZone</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/snippet/:id" element={<SnippetDetailPage />} />
        <Route path="/snippet/:id/edit" element={<EditSnippetPage />} />
      </Routes>
    </div>
  );
}

export default App;
