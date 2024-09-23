const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const config = {
    user: 'your-username',
    password: 'your_password',
    server: 'your-server',
    database: 'your-database',
    options: {
        trustServerCertificate: true
    }
};

// open the database when app start
let pool;

(async function initializeDB() {
    try {
        pool = await sql.connect(config);
        console.log('MSSQL veritabanına bağlanıldı!');
    } catch (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err);
    }
})();

app.post('/api/users', async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, age } = req.body;

    try {
        // db connect
        const result = await pool.request()
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('age', sql.Int, age)
            .query('INSERT INTO users (firstName, lastName, age) VALUES (@firstName, @lastName, @age)');
        
        console.log('Veritabanı sonuç:', result);
        res.status(200).send('Kullanıcı başarıyla kaydedildi!');

    } catch (err) {
        console.error('Veritabanı hatası:', err);
        res.status(500).send('Bir hata oluştu.');
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});

