// src/App.js
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList.jsx';
import CreateJob from './pages/CreateJob.jsx';
import './App.css';


function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobList />} />
          
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
