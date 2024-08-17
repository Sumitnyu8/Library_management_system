import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login_signup from "./components/Login_signup";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import BooksList from "./pages/BooksList";
import AdminAddBook from "./pages/AddAdminBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login_signup />} />
        <Route path='/lists' element={<BooksList/>} />
        <Route path="/admin/add-book" element={<AdminAddBook/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
