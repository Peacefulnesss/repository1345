const Router = require("express")
const router = new Router()
const BookController = require("../Controllers/BookController")

router.post("/book", BookController.createBook)
router.get("/book/:id", BookController.getBookByAuthor)

module.exports = router;