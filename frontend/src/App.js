import logo from './logo.svg';
import './App.css';
import SnippetForm from './components/SnippetForm';
import SnippetList from './components/SnippetList';

function App() {
  return (
    <div className="App">
      <h1>ShareMyCode</h1>
      <SnippetForm />
      <SnippetList />
    </div>
  );
}

export default App;
