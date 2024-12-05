const Router = require('express')
const router = new Router()
const GenreController = require('../Controllers/GenreController') 

router.get('/genre/:id', GenreController.getGenreByBook)
router.post('/genre', GenreController.createGenre)

module.exports = router