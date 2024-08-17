import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function AdminPanel() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleIssueBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issued: true, requested: false }),
    })
    .then(response => response.json())
    .then(data => {
      setBooks(books.map(book => book.id === id ? data : book));
    })
    .catch(error => console.error('Error issuing book:', error));
  };

  const handleUnissueBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issued: false }),
    })
    .then(response => response.json())
    .then(data => {
      setBooks(books.map(book => book.id === id ? data : book));
    })
    .catch(error => console.error('Error unissuing book:', error));
  };

  const requestedBooks = books.filter(book => book.requested && !book.issued);
  const issuedBooks = books.filter(book => book.issued);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" component="div" gutterBottom>
        Requested Books
      </Typography>
      <List>
        {requestedBooks.map((book) => (
          <ListItem key={book.id} divider>
            <ListItemText
              primary={book.title}
              secondary={book.author}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleIssueBook(book.id)}
            >
              Issue Book
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="div" gutterBottom>
        Issued Books
      </Typography>
      <List>
        {issuedBooks.map((book) => (
          <ListItem key={book.id} divider>
            <ListItemText
              primary={book.title}
              secondary={book.author}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleUnissueBook(book.id)}
            >
              Unissue Book
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AdminPanel;
