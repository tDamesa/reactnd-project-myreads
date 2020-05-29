
// Map book shelf title with shelf
export const bookCategory = (shelf) => {
    switch (shelf) {
        case 'currentlyReading':
            return 'Currently Reading'
        case 'read':
            return 'Read'
        case 'wantToRead':
            return 'Want to Read'
        default:
            break;
    }
}

// Group books by shelf
export const groupBooks = (books) => {
    return books.reduce((groupedBooks, book) => {
        const categoryName = bookCategory(book.shelf);
        if (book.shelf !== 'none') {
            groupedBooks[categoryName] = groupedBooks[categoryName] || [];
            groupedBooks[categoryName].push(book);
        }
        return groupedBooks;
    }, { "Currently Reading": [], "Read": [], "Want to Read": [] })
}

// Remove an element of array
export const remove = (elem, arr) => {
    const index = arr.indexOf(elem);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// Add shelf to search result
export const addShelf = (searchResult, booksWithShelf) => {
    searchResult.forEach(elem => {
        const found = booksWithShelf.find(book => book.id === elem.id);
        if (found)
            elem.shelf = found.shelf;

        else
            elem.shelf = 'none';
    });
    return searchResult;
}