const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a connection pool for MySQL



app.get('/',function(req,res){
   res.sendFile(__dirname+'/admin.html')
})

// Handle form submissions
app.post('/login/submit', (req, res) => {
  const { book_id, book_name, book_author, book_price, book_url, book_stock,book_type,book_section} = req.body;

 

  // Insert data into the database
  pool.query('INSERT INTO books (book_id, book_name, book_author, book_price, book_url, book_stock,book_type,book_section) VALUES (?, ?, ?, ?, ?, ?,?,?)',
    [book_id, book_name, book_author, book_price, book_url, book_stock,book_type,book_section],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data into database');
      }
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
