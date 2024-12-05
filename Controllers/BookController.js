const { json } = require("express");
const pool = require("../db")

class BookController {
    async createBook(req,res) {
        const {book_name, author, genre_book, in_stock} = req.body;
        try{
        const book = await pool.query(
            `Insert into books (book_name, author, genre_book, in_stock) values ($1,$2,$3, $4) returning *`,
            [book_name, author, genre_book, in_stock]
        );
        res.json(book.rows);
    }catch(error){
        console.error('error', error)
    }
    }
    async getBookByAuthor(req, res) {
        const id = req.params.id;
        const book = await pool.query("Select * from books where author = $1", [id]);
        res.json(book.rows)
    }
}

module.exports = new BookController();