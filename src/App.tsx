import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import MainLayout from './layouts/MainLayout';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
