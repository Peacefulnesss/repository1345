async function createTables(pool) {
    try {

        //sql - запросы для создания таблиц
        const createAuthorsTable = `
            CREATE TABLE IF NOT EXISTS authors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                surname VARCHAR(100) NOT NULL,
                books VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const createGenreTable = `
            CREATE TABLE IF NOT EXISTS genres (
                book_id SERIAL PRIMARY KEY,
                genre_book VARCHAR(100) NOT NULL 
            )
        `;

        const createUserTable = `
            CREATE TABLE IF NOT EXISTS users (
            id  SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL
            
        )`; 
        const createBookTable = `
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                book_name VARCHAR(255) NOT NULL,
                author INTEGER REFERENCES authors(id) ON DELETE CASCADE,
                in_stock BOOL NOT NULL,
                genre_book INT REFERENCES genres(book_id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;


        //ВЫПОЛНЯЕМ SQL ЗАПРОСЫ
        await pool.query(createUserTable);
        console.log('Users table created.');

        await pool.query(createAuthorsTable);
        console.log('Authors table created.');

        await pool.query(createGenreTable);
        console.log('Genre table created.');

        await pool.query(createBookTable);
        console.log('Books table created.');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
}

module.exports = createTables;