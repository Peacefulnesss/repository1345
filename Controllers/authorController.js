const pool = require('../db')

class AuthorController {
    async getAllAuthors(req,res) {
        try {
            const author = await pool.query(`SELECT * FROM authors`)
            res.json(author.rows)
        } catch (error) {
            console.log(error)
        }
    }

    async createAuthor(req,res) {
        const {name, surname, books} = req.body
        try {
            const author = await pool.query(`INSERT INTO authors (name, surname, books) VALUES ($1, $2, $3) RETURNING *`, [name, surname, books]);
            res.json(author.rows)
            res.json("server work")
        } catch (error) {
            console.error('error', error)
        }
    }

    async updateAuthor(req,res) {
        const id = parseInt(req.params.id, 10);
        const {name, surname, books} = req.body
        try {
            const author = await pool.query(`UPDATE authors SET name = $1, surname = $2, books = $3, WHERE id = $4 RETURNING *`, [name, surname, books, id]);
            res.json(author.rows);
        } catch (error) {
            console.error('error', error)
        }
    }

    async deleteAuthor(req,res) {
        const id = req.params.id;
        const author = await pool.query(`DELETE FROM author s WHERE id = $1`, [id])
        res.json(author.rows[0]);
    }
}

module.exports = new AuthorController();