import React from 'react';
import { ListItem, Box, Typography, Chip } from '@mui/material';

const ArticleListItem = ({ article, onClick, index }) => {
  // Alternate row background: even rows get a light gray background.
  const backgroundColor = index % 2 === 0 ? '#ccc' : '#aaa';

  return (
    <ListItem 
      button 
      onClick={onClick}
      sx={{
        backgroundColor,
        mb: 1,
        borderRadius: 1,
        transition: 'background-color 0.3s',
        '&:hover': { backgroundColor: '#A9D8FF', cursor: 'pointer' }
      }}
    >
      <Box width="100%">
        <Typography sx={{ fontWeight: '600' }}>
          {article.title}
        </Typography>
        <Box mt={1}>
          <Chip label={article.category} size="small" />
        </Box>
      </Box>
    </ListItem>
  );
};

export default ArticleListItem;
