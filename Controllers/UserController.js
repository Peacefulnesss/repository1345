const pool = require('../db')

class UserController {
    async getAllUsers (req, res) {
        try {
            const user = await pool.query(`SELECT * FROM users`)
            res.json(user.rows) 
        } catch (error) {
            console.log(error)
        }
    }

    async createUser (req, res) {
        const {name, email, password} = req.body 
        try {
            const user = await pool.query(`INSERT INTO users (name, email, password) VALUES ($2,$3,$4) RETURNING *`, [name, email, password]);
            res.json(user.rows);
        } catch (error) {
            console.error('error', error)
        }
    }
    async UpdateUser (req, res) {
        const id = parseInt (req.params.id, 10);
        const {name, email, password} = req.body
        try {
            const user = await pool.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [name,email,password, id]);
            res.json(user.pows);
        } catch (error) {
            console.error('error', error)
        }
    }
    async deleteUser (req, res) {
        const id = req.params.id;
        const user = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
        res.json(user.rows[0]);
    }
}
module.exports = new UserController();