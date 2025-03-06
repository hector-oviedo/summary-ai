import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate, useLocation } from 'react-router-dom';
import { getArticleDetails } from '../services/api';

const ArticleView = ({ language }) => {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  useEffect(() => {
    const link = getQueryParam("link");
    const lang = getQueryParam("lang") || language;
    if (link) {
      getArticleDetails(link, lang).then(data => {
        if (typeof data === 'string') {
          // If data is a string, assume it's an error message.
          setError(data);
          setArticle(null);
        } else {
          setArticle(data);
        }
      });
    }
  }, [location.search, language]);

  // Show a centered spinner while loading.
  if (!article && !error) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  // If there's an error, display a centered error message.
  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />}>
          {error}
        </Alert>
      </Grid>
    );
  }

  // Display the article in a Card with header, body and footer.
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ p: 2, height: '100vh' }}>
      <Grid item xs={12} sm={10} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {article.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {article.content}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ArticleView;
