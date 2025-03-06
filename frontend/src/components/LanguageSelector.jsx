import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Button, Grid, Box, CircularProgress, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReactCountryFlag from 'react-country-flag';
import { getLanguages } from '../services/api';

// Mapping for top 10 languages to their corresponding country flags.
// If a language code is not in this mapping, no flag icon will be shown.
const flagMapping = {
  EN: 'GB', // English (using GB flag as common choice)
  ES: 'ES', // Spanish
  FR: 'FR', // French
  DE: 'DE', // German
  ZH: 'CN', // Chinese
  AR: 'SA', // Arabic (using Saudi Arabia flag)
  RU: 'RU', // Russian
  PT: 'PT', // Portuguese
  JA: 'JP', // Japanese
  IT: 'IT'  // Italian
};

const LanguageSelector = ({ setLanguage }) => {
  const [languages, setLanguages] = useState(null); // null indicates not loaded yet
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getLanguages().then(data => {
      if (typeof data === 'string') {
        // If an error message is returned, set it as error.
        setError(data);
      } else {
        setLanguages(data);
      }
    });
  }, []);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleProceed = () => {
    if (selected) {
      setLanguage(selected);
      navigate('/articles');
    }
  };

  // Show a centered spinner while waiting for data.
  if (languages === null && !error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  // If there's an error, display a centered error message.
  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />}>
          {error}
        </Alert>
      </Grid>
    );
  }

  // Display the language selector and OK button on one line.
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={10} md={6}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="language-select-label" sx={{ fontSize: 'small' }}>
              Select Language
            </InputLabel>
            <Select
              labelId="language-select-label"
              value={selected}
              onChange={handleSelect}
              label="Select Language"
              size="small"
            >
              {languages.map(lang => (
                <MenuItem key={lang.id} value={lang.id}>
                  {flagMapping[lang.id] && (
                    <ReactCountryFlag
                      countryCode={flagMapping[lang.id]}
                      svg
                      style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }}
                      title={lang.label}
                    />
                  )}
                  {lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" color="primary" onClick={handleProceed} size="small">
            OK
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LanguageSelector;
