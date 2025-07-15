import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer
} from '@mui/material';
import { useUrls } from '../context/UrlContext';
import { useNavigate } from 'react-router-dom';
import { logEvent } from '../utils/logger';

const StatisticsPage: React.FC = () => {
  const { urls, incrementClick } = useUrls();
  const token = localStorage.getItem('access_token') || '';

  const handleRedirect = (shortcode: string, original: string) => {
    incrementClick(shortcode);
    logEvent(token, 'frontend', 'info', 'component', `Redirected shortcode ${shortcode}`);
    window.location.href = original;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Shortcode</strong></TableCell>
              <TableCell><strong>Original URL</strong></TableCell>
              <TableCell><strong>Expiry</strong></TableCell>
              <TableCell><strong>Clicks</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No URLs found.
                </TableCell>
              </TableRow>
            ) : (
              urls.map((u) => (
                <TableRow
                  key={u.shortcode}
                  hover
                  onClick={() => handleRedirect(u.shortcode, u.original)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{u.shortcode}</TableCell>
                  <TableCell sx={{ maxWidth: 300, overflowWrap: 'break-word' }}>{u.original}</TableCell>
                  <TableCell>{new Date(u.expiry).toLocaleString()}</TableCell>
                  <TableCell>{u.clicks}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StatisticsPage;
