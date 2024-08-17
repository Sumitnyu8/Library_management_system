import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminPanel from "./AdminPanel";

const defaultTheme = createTheme();

function AdminAddBook() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    cover: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    const { title, author, cover } = {
      ...formValues,
      [name]: value,
    };
    setIsFormValid(title && author && cover);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookData = {
      title: formValues.title,
      author: formValues.author,
      cover: formValues.cover,
    };

    // Post the book data to the JSON server
    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        console.log("Book added successfully");
        navigate("/lists"); // Navigate to the books list page on successful submission
      } else {
        console.error("Error adding book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Admin Panel
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add New Book
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              autoComplete="title"
              name="title"
              required
              fullWidth
              id="title"
              label="Book Title"
              autoFocus
              value={formValues.title}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              id="author"
              label="Author"
              name="author"
              autoComplete="author"
              value={formValues.author}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              required
              fullWidth
              name="cover"
              label="Cover Image URL"
              type="url"
              id="cover"
              autoComplete="cover"
              value={formValues.cover}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid}
            >
              Add Book
            </Button>
          </Box>
        </Box>
        <AdminPanel />
      </Container>
    </ThemeProvider>
  );
}

export default AdminAddBook;
