const express = require('express');
const createTables = require('C:/Users/safiu/OneDrive/Desktop/api_book/db/setup');
const pool = require('C:/Users/safiu/OneDrive/Desktop/api_book/db/index')

const authorRouter = require('./Routes/authorRouter');
const bookRouter = require('./Routes/bookRouter')
const genreRouter = require('./Routes/genreRouter')
const userRouter = require('./Routes/userRouter')

//создаем приложение express 
const app = express();
const PORT = process.env.PORT || 5001

//middleware для парсинга json в теле запроса
app.use(express.json());

app.use('/api', authorRouter)
app.use('/api', genreRouter)
app.use('/api', userRouter)
app.use('/api', bookRouter)

async function initializeApp() {
    try {
        //Создаем таблицы 
        await createTables(pool); //передаем pool как параметр для использования в createsTables 

        //запускаем сервер и выводим сообщение о том, что сервер запущен 
        app.listen(PORT,() => {
            console.log(`Server is running on port ${PORT}`); 
        })
    } catch (error) {
        console.error('Error initializing app:', error.message);
    }
}

//инициализируем приложение
initializeApp();
