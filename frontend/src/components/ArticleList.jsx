import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Grid, Box, CircularProgress, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { getTopNews } from '../services/api';
import ArticleListItem from './ArticleListItem';

const ArticleList = ({ language }) => {
  const [articles, setArticles] = useState(null); // null means loading
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getTopNews(language).then(data => {
      if (typeof data === 'string') {
        // An error message was returned.
        setError(data);
        setArticles([]);
      } else {
        setArticles(data);
      }
    });
  }, [language]);

  const handleArticleClick = (link) => {
    navigate(`/article?link=${encodeURIComponent(link)}&lang=${language}`);
  };

  // Loading state: show centered spinner.
  if (articles === null && !error) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  // If error or no articles available, display a centered alert.
  if (error || (articles && articles.length === 0)) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Alert severity={error ? "error" : "warning"} icon={<ErrorOutlineIcon fontSize="inherit" />}>
          {error || "No articles available."}
        </Alert>
      </Grid>
    );
  }

  return (
    <Box p={2}>
      <Box 
        sx={{ 
          backgroundColor: '#1976d2', 
          color: '#fff', 
          p: 2, 
          borderRadius: 1, 
          mb: 2, 
          textAlign: 'center' 
        }}
      >
        <Typography variant="h5">Top News</Typography>
      </Box>
      <List>
        {articles.map((article, index) => (
          <ArticleListItem 
            key={index} 
            article={article} 
            index={index}
            onClick={() => handleArticleClick(article.link)} 
          />
        ))}
      </List>
      <Box textAlign="center" mt={2}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleList;
