import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import AddBook from './AddBook';
import BooksList from './BooksList';
import * as BookHelper from './utils/BookHelper';



class BooksApp extends React.Component {
  state = {
    books: [],
    categorizedBooks: {},
    searchResult: []
  }

  //Get all book on the initial load of application
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(prevState => ({ ...prevState, books, categorizedBooks: BookHelper.groupBooks(books) }));
    }
    );
  }

  //Update books 
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(res => {
        this.setState(prevState => {
          const index = prevState.books.findIndex(elem => elem.id === book.id);
          if (index > -1) {
            prevState.books[index].shelf = shelf;

            if (shelf === 'none')
              BookHelper.remove(book, prevState.books);
          }
          else {
            book.shelf = shelf;
            prevState.books.push(book)
          }
          return ({ ...prevState, books: prevState.books, categorizedBooks: BookHelper.groupBooks(prevState.books) });
        })
      })
      .catch(err => console.error(err));
  }

  //Search books
  search = (query) => {
    if (!query) {
      this.setState(prevState => ({ ...prevState, searchResult: [] }));
      return;
    }
    BooksAPI.search(query)
      .then(books => {
        if (!books || books.error) {
          this.setState(prevState => ({ ...prevState, searchResult: [] }))
          return;
        }
        const searchResult = BookHelper.addShelf(books, this.state.books);
        this.setState(prevState => ({ ...prevState, searchResult: searchResult }));

      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList books={this.state.categorizedBooks} updateBook={this.updateBook} />
        )} />

        <Route path="/addBook" render={() => (
          <AddBook searchResult={this.state.searchResult} search={this.search} updateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
