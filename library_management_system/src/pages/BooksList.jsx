import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import SearchBar from '../components/SearchBar';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleRequestBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requested: true }),
    })
    .then(response => response.json())
    .then(data => {
      setBooks(books.map(book => book.id === id ? data : book));
    })
    .catch(error => console.error('Error requesting book:', error));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Library Books
      </Typography>
      <SearchBar query={query} setQuery={setQuery} />
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={book.cover}
                alt={book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
                {book.issued ? (
                  <Typography variant="body2" color="error">
                    Issued
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRequestBook(book.id)}
                    disabled={book.requested}
                  >
                    {book.requested ? 'Requested' : 'Request Book'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BooksList;
