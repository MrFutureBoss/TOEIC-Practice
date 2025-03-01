import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Note from './pages/Note';
import Upload from './pages/Upload';
import Home from './pages/Home/Home';
import Test from './pages/Home/Test';
import './i18n.js'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
        <Route path="/note" element={<Note />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;