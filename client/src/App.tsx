import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Note from './pages/Note';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/note" element={<Note />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;