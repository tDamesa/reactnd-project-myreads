import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';



class AddBook extends Component {
  state = {
    query: ''
  }

  //Update the search based on search input value/query
  handleChange = (query) => {
    this.setState(() => ({ query }));
    console.log(this.state.query);
    this.props.search(query);
  }

  //TODO: Implement debounce
  
  delayQuery(fn, delay) {
    let lastCalled;
    return function () {
      let context = this;
      let args = arguments;
      console.log(args);
      clearTimeout(lastCalled);
      lastCalled = setTimeout(() => {
        fn.apply(context, args);
      }, delay)
    }
  }

  render() {
    // console.log(this.state);
    const { searchResult, updateBook } = this.props;
    console.log('searchResult', searchResult);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={event => this.handleChange(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult ? <Book books={searchResult} updateBook={updateBook} /> : <p> No results found</p>}
          </ol>
        </div>
      </div>
    )
  }
}

export default AddBook;