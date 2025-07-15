import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import { logEvent } from './utils/logger';

const App = () => {
  const token = localStorage.getItem('access_token') || '';

  useEffect(() => {
    logEvent(token, 'frontend', 'info', 'page', 'App loaded');
  }, [token]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" href="/">Shortener</Button>
          <Button color="inherit" href="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
