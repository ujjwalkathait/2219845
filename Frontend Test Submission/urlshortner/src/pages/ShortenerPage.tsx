import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // ✅ correct import
import { useUrls } from '../context/UrlContext';
import { logEvent } from '../utils/logger';

const generateShortcode = () => Math.random().toString(36).substring(2, 8);

const ShortenerPage: React.FC = () => {
  const { addUrl } = useUrls();
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('30');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('access_token') || '';

  const handleSubmit = () => {
    setError('');
    try {
      new URL(longUrl);
    } catch {
      return setError('Invalid URL format');
    }

    const code = shortcode || generateShortcode();
    const expiry = new Date(Date.now() + parseInt(validity) * 60000);
    addUrl({ original: longUrl, shortcode: code, expiry });

    logEvent(token, 'frontend', 'info', 'component', `Shortened URL ${longUrl} -> ${code}`);

    setLongUrl('');
    setShortcode('');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            fullWidth
            label="Long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            label="Validity (min)"
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={3}>
          <TextField
            fullWidth
            label="Custom shortcode"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={2}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Shorten
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShortenerPage;
