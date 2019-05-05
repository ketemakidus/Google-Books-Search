import axios from "axios";

const API_Key = "AIzaSyBYN0AtMwXho_2F8rHeMXYE81Yiw7rm8ls";


export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  searchBooks: function (keywords) {
    return axios.get(encodeURI(`https://www.googleapis.com/books/v1/volumes?q=${keywords}&key=${API_Key}`));
  }
};
