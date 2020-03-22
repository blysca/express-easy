// ! imports 
const express = require('express')
const  faker = require('faker')
const booksRouter = express.Router()
/*  */
const app = express()
const products = [faker.commerce.productName(),faker.commerce.productName(),faker.commerce.productName()]

// app.set('view engine', 'pug') // !PUG ENGINE 
// app.set('view engine', 'ejs') // !EJS ENGINE
app.set('view engine', 'hbs')
app.set('views', './views')

app.use((req,res,next) => {
    console.log('c====3', 'Date: ', new Date(),'Method: ', req.method, 'URL: ', req.originalUrl, 'IP: ', req.ip);
    next()
})

app.use('/static', express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send('It\'s working')
})

app.get('/products', (req, res, next) => {
    console.log('Page query: ', req.query.page)
    
    // res.json({products})
    res.send({products})
})
app.get('/products/:id', (req, res, next) => {
    console.log('Page params: ', req.params)
    if (products[req.params.id]) {
        res.send(products[req.params.id])
    } else {
        console.log('no product')
        res.status(404).send('Product not found')
    }
})

app.get('/downloadBooks', (req, res, next) => {
    res.download('./public/books.html', 'new-file-name', (err) => {
        if (err) {
            throw new Error('Download books trouble')
        }

        console.log('Books.html was sent');
        
    })
})

app.get('/blog', (req,res,next)=> {
    res.redirect(301, '/')
})

booksRouter.get('/', (req, res, next) => {
    res.send('Books')
})
booksRouter.get('/about', (req, res, next) => {
    res.send('About Books')
})
app.use('/books', booksRouter)

app.use((err, req,res,next) => {
    console.log('Error', err.stack)
    res.status(500).send(err.stack)
})
// ! PUG
app.get('/main', (req, res, next) => {
    res.render('main', {
        title: 'Products',
        message: 'Products List',
        products: products
    })
})

// ! EJS
app.get('/ejs', (req, res, next) => {
    res.render('main', {
        title: 'Products',
        message: 'Products List',
        products: products
    })
})

// ! HBS
app.get('/hbs', (req, res, next) => {
    res.render('main.hbs', {
        title: 'Products',
        message: 'Products List',
        products: products
    })
})

app.listen(5000, () => {
    console.log('It\s started! ', new Date());   
})