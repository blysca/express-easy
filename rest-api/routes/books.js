const express = require('express')
const { v4: uuidV4 } = require('uuid');

const router = express.Router()

let books = [{
    id: 1,
    author: 'John Doe',
    title: 'javascript book'
}]

router.get('/', (req,res) => {
    res.json(books)
})

router.post('/', (req,res) => {
    let book = {
        id: uuidV4(),
        author: req.body.author || 'Default Author',
        title: req.body.title || 'Default Title'
    }
    console.log('post book: ', req.body)
    console.log('book: ', book)

    books = [...books, book]

    return res.json(book)
})

router.get('/:id', (req,res) => {
    const bookId = parseInt(req.params.id, 10)

    const book = books.filter(book => book.id === bookId)

    if (book){
        return res.json(book)
    } 

    return res.status(404).json({
        status: `Book with id: ${bookId} not found`
    })
})

router.put('/:id', (req,res) => {
    const bookId = parseInt(req.params.id, 10)
 
    books.map(book => {
        if (book.id === bookId) {
            book.author = req.body.author
            book.title = req.body.title
        }
        return book
    })       

    if (updatedBook){
        return res.json(updatedBook)
    } 

    return res.status(404).json({
        status: `Book with id: ${bookId} not found`
    })
})

router.delete('/:id', (req,res) => {
    const bookId = parseInt(req.params.id, 10)
    books = books.filter(book => book.id !== bookId)
    const existBook = books.filter(book => book.id === bookId)

    console.log('books: ',books);
    console.log('existBook: ',existBook);
    
    console.log('book id: ', bookId, typeof bookId);
    console.log('existBook.length: ',existBook.length);
    console.log('!existBook.length: ', !existBook.length);
    

    if (!existBook.length){
        return res.status(200).send(`Book with ID: ${bookId}, was deleted`)
    } else {
        return res.status(404).send('Something wrong')
    }
})

module.exports = router