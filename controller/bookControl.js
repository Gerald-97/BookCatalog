const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Book = require('../models/book');

const createBook = async(req, res, next) => {
    const { title, author, image, description, published } = req.body;
    try{
        const newBook = new Book({
            title,
            author,
            image,
            description,
            published
        });

        await newBook.save();
        return res.status(201).json({
            message: "This book has been added to the library",
            newBook
        });
    } 
    catch (err) {
        return next(err)
    }
}


const allBooks = async(req, res, next) => {
    try {
        const data = await Book.find();
        return res.status(200).json({ data })
    } 
    catch (err) {
        return next(err)
    }
} 

const bookEntry = async(req, res, next) => {
    try {
        const id = req.params.id
        const data = await Book.findOne({_id: id });
        res.status(200).json({ data })
    } 
    catch(err) {
        return next(err)
    }
}

const updateBook = (req, res, next) => {
    const id = req.params.id;
    const { title, author, image, description, published } = req.body;
    Book.findOne({ _id: id }, (err, data) => {
        if (err) next(err);
        if (!data) {
            return res.status(404).json({
                message: "Book doesn't exist"
            })
        } else {
            if (title) {
                data.title = title;
            }
            if (image) {
                data.image = image;
            }

            if (author) {
                data.author = author;
            }

            if (description) {
                data.description = description;
            }
            if (published) {
                data.published = published;
            }

            data.save((err, editedBook) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).send(editedBook);
                }
            })
        }
    })
}


const deleteBook = (req, res, next) => {
      const id = req.params.id;
      Book.findByIdAndDelete({ _id: id }, (err, data) => {
        if (err) next(err);
        if (!data) {
            return res.status(401).json({
                message: "No Book entry for this id"
            });
        } else {
            res.status(201).json({
                message: "Book deleted successfully"
            });
        }
    })
}

module.exports = {createBook, allBooks, bookEntry, updateBook, deleteBook}

