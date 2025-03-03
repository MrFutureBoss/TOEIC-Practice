import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Note from './pages/Note';
import Upload from './pages/Upload';
import Home from './pages/Home/Home';
import './i18n.js'; 
import MiniDrawer from './pages/Home/Test';
import AdminHome from './pages/Home/AdminHome.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/test" element={<MiniDrawer />} />
        <Route path="/note" element={<Note />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;