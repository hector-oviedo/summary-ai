import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import LanguageSelector from './components/LanguageSelector';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
    text: { primary: '#333' }
  }
});

const App = () => {
  const [language, setLanguage] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<LanguageSelector setLanguage={setLanguage} />} />
            <Route path="/articles" element={language ? <ArticleList language={language} /> : <Navigate to="/" />} />
            <Route path="/article" element={language ? <ArticleView language={language} /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
