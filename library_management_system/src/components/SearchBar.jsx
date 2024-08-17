// src/SearchBar.jsx
import React from 'react';
import { TextField, Box } from '@mui/material';

function SearchBar({ query, setQuery }) {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        fullWidth
        label="Search Books"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
      />
    </Box>
  );
}

export default SearchBar;
