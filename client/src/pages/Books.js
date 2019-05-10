import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import "./style.css"

class Books extends Component {
  state = {
    keywords: "",
    books: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.keywords) {
      API.searchBooks(this.state.keywords)
        .then(res => this.setState({ books: res.data.items}))
        .catch(err => console.log(err));
    }
  };
  
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleSaveEvent = (book) => {
    let newbook = {

      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "",
      link: book.volumeInfo.infoLink
    }

    API.saveBook(newbook)
      .then(res => {
        let found = this.state.books.filter(x => x.id !== book.id);
        this.setState({ books: found });
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Google Books Search
                <hr />
                Search for and save Books of interest
              </h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.keywords}
                onChange={this.handleInputChange}
                name="keywords"
                placeholder="Search Book"
              />
              <FormBtn
                disabled={!this.state.keywords}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id} id={book.id}>
                      {book.volumeInfo.title}
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>Books</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
