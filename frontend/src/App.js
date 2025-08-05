import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HomePage from './pages/HomePage';
import EditSnippetPage from './pages/EditSnippetPage';
import SnippetDetailPage from './pages/SnippetDetailPage';
import ThemeToggleButton from './components/ThemeToggleButton';

function App() {
  return (
    <div className="App">
      <ThemeToggleButton />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>SnipZone</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditSnippetPage />} />
        <Route path="/snippets/:id" element={<SnippetDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
