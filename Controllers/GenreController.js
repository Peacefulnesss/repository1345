const { json } = require("express");
const pool = require("../db")

class GenreController {
    async createGenre(req,res) {
        const {genre_book} = req.body;
        const genre = await pool.query(
            "Insert into genres (genre_book) values ($1) returning *",
            [genre_book]
        );
        res.json(genre.rows[0]);
    }
    async getGenreByBook(req, res) {
        const id = req.params.id;   
        const genre = await pool.query("Select * from genres where book_id = $1", [id]);
        res.json(genre.rows)
    }
}

module.exports = new GenreController();