import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import MainPage from './components/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
