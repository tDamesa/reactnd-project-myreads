import React from 'react';
import AddBookIcon from './icons/add.svg';
import { Link } from 'react-router-dom';
import Book from './Book';

const BooksList = (props) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {Object.keys(props.books).map(key =>
                        props.books[key].length > 0 && (<div className="bookshelf" key={`${key}bookshelf`}>
                            <h2 className="bookshelf-title" key={`${key}title`}>{key}</h2>
                            <div className="bookshelf-books" key={`${key}books`}>
                                <Book books={props.books[key]} updateBook={props.updateBook} />
                            </div>
                        </div>)
                    )}
                </div>
            </div>
            <div className="open-search">
                <Link to="/addBook"> <img src={AddBookIcon} alt="Add a book" /></Link>
            </div>
        </div>
    );
}

export default BooksList;