const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const Razorpay = require('razorpay');
const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'final_year_book_project'
});

const razorpay = new Razorpay({
  key_id: 'rzp_test_QuvkzrymIqOAUN',
  key_secret:'U7vDyYHwWEoA1X2fek3EkFfD'
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.post('/refund', async (req, res) => {
  const { payment_id, refund_amount } = req.body;

  try {
      const refundResponse = await razorpay.payments.refund(payment_id, {
          amount: refund_amount * 100, // Amount should be in paisa
          speed: 'optimum' // Refund speed
      });

      res.sendFile(path.join(__dirname, 'public', 'refundSuccessful.html'));

  } catch (error) {
      console.error('Error initiating refund:', error);
      res.status(500).json({ 
          success: false,
          error: 'Error initiating refund. Please try again later.' 
      });
  }
});




function gototHomePage(){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}


connection.connect();

app.use(express.static('public'));

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });  

});

app.get('/forgot',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'admin_forgot.html'));
})

app.post('/forgotPassword', (req, res) => {
  const { dob } = req.body;

  // Query the database to check if the submitted DOB matches any admin's DOB
  connection.query(
      'SELECT * FROM admin_login WHERE dob = ?',
      [dob],
      (error, results) => {
          if (error) {
              console.error('Error querying data:', error);
              return res.status(500).send('Error querying data from database');
          }
          
          // If a matching DOB is found, allow the admin to change password
          if (results.length > 0) {
              // Render a password change form or perform password change logic here
              res.sendFile(path.join(__dirname, 'public', 'changeadminpass.html'));
          } else {
              // If no matching DOB is found, display an error message
              res.status(401).send('Invalid date of birth');
          }
      }
  );
});

app.post('/changePassword', (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
      return res.status(400).send('New password and confirm password do not match');
  }

  const adminId = "ankush@gmail.com"

  connection.query(
      'UPDATE admin_login SET PASSWORD = ? WHERE id = ?',
      [newPassword,adminId],
      (error, results) => {
          if (error) {
              console.error('Error updating password:', error);
              return res.status(500).send('Error updating password in the database');
          }

          // Check if the password was successfully updated
          if (results.affectedRows > 0) {
              return res.send('Password updated successfully');
          } else {
              return res.status(404).send('Admin not found or password not updated');
          }
      }
  );
});

app.post('/after_payment', (req, res) => {
  
  const {payment_id,book_name,book_total_price,book_quantity,user_name,user_email,book_url,order_status} = req.body;

  connection.query('INSERT INTO user_orders2 (payment_id,book_name,book_price,  book_quantity,user_name,user_email,order_datetime,book_url,order_status) VALUES (?,?,?, ?,?,?, NOW(),?,?)',
    [payment_id,book_name,book_total_price,book_quantity,user_name,user_email,book_url,order_status],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
       // res.sendFile(path.join(__dirname, 'public', 'BuySignIn.html'));
        res.send("error")
        return;
      }
      console.log('after payment data inserted');
      res.redirect('/');
     
       //res.send("order data submitted")
    });
});

app.post('/payment', (req, res) => {
  
     
     res.sendFile(path.join(__dirname, 'public', 'PaymentPage.html'));
    
    
});

app.post('/search_payment', (req, res) => {


  // Send the 'submitOrder.html' file as the response
  res.sendFile(path.join(__dirname, 'public', 'searchPaymentPage.html'));
});

app.post('/payment2', (req, res) => {


  // Send the 'submitOrder.html' file as the response
  res.sendFile(path.join(__dirname, 'public', 'PaymentPage2.html'));
});





app.post('/login', (req, res) => {
  
  const {admin_id,admin_pass} = req.body;

  // Check if admin_id and admin_pass are provided
  if (!admin_id || !admin_pass) {
      return res.status(400).send('Admin ID and password are required');
  }

  connection.query('SELECT * FROM admin_login WHERE id = ? AND PASSWORD = ?',
    [admin_id, admin_pass],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
        return res.status(401).send('Invalid admin ID or password');
      }
      console.log('Logged in successfully');
     res.sendFile(path.join(__dirname, 'public', 'admin_operations.html'));
    });
});

app.post('/user_login', (req, res) => {
  
  const {uname1,upass2} = req.body;

  // Check if admin_id and admin_pass are provided
  /*if (!admin_id || !admin_pass) {
      return res.status(400).send('Admin ID and password are required');
  }*/

  

  connection.query('SELECT * FROM user_ids WHERE user_name = ? AND user_pass= ?',
    [uname1, upass2],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
        return res.status(401).send('Invalid admin ID or password');
      }
      console.log('Logged in successfully');
     //res.sendFile(path.join(__dirname, 'public', 'admin_operations.html'));
     console.log('Logged in successfully');
     res.sendFile(path.join(__dirname, 'public', 'user_account_interface.html'));
    });
});

app.post('/cart_user_buy_login', (req, res) => {
  
  const {uname1,upass2} = req.body;

  connection.query('SELECT * FROM user_ids WHERE user_name = ? AND user_pass = ?',
    [uname1, upass2],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
        res.sendFile(path.join(__dirname, 'public', 'BuySignUp.html'));
        return;
      }
      console.log('Logged in successfully cart user');
     res.sendFile(path.join(__dirname, 'public', 'CartbuyPage.html'));
     //res.send("logged in user")
    });
});

app.post('/search_cart_user_buy_login', (req, res) => {
  
  const {uname1,upass2} = req.body;

  connection.query('SELECT * FROM user_ids WHERE user_name = ? AND user_pass = ?',
    [uname1, upass2],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
        res.sendFile(path.join(__dirname, 'public', 'BuySignUp.html'));
        return;
      }
      console.log('Logged in successfully Search cart user');
     res.sendFile(path.join(__dirname, 'public', 'searchCartbuyPage.html'));
     //res.send("logged in user")
    });
});

app.post('/instant_user_buy_login', (req, res) => {
  
  const {uname1,upass2} = req.body;

  connection.query('SELECT * FROM user_ids WHERE user_name = ? AND user_pass = ?',
    [uname1, upass2],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
        res.sendFile(path.join(__dirname, 'public', 'BuySignUp.html'));
        return;
      }
      console.log('Logged in successfully instant user');
     res.sendFile(path.join(__dirname, 'public', 'instantBuyPage.html'));
     //res.send("logged in user")
    });
});

app.post('/user_signup', (req, res) => {
  
  const {email,name,pass,phone,address,pincode,state,city} = req.body;

  connection.query('insert into user_ids (user_email,user_name,user_pass,user_phone,user_location,user_pincode,user_state,user_city) values (?,?,?,?,?,?,?,?)',
    [email,name,pass,phone,address,pincode,state,city],
    (error, results) => {
      if (error) {
        console.error('Error querying data:', error);
        return res.status(500).send('Error querying data from database');
      }
      // Check if any rows were returned
      if (results.length === 0) {
       // res.sendFile(path.join(__dirname, 'public', 'BuySignIn.html'));
        res.send("error")
        return;
      }
      console.log('Logged in successfully');
     res.sendFile(path.join(__dirname, 'public', 'buySignIn.html'));
     //res.send("logged in user")
    });
});



app.post('/insert', (req, res) => {
  const { book_id, book_name, book_author, book_price,book_stock, book_url,book_type,book_section} = req.body;

  /*if(book_id || book_name || book_author || book_price || book_url || book_stock || book_type || book_section ==""){
    return res.send("value cannot be empty");
  }*/



  connection.query('INSERT INTO books (book_id, book_name, book_author, book_price,book_stock, book_url,book_type,book_section) VALUES (?, ?, ?, ?, ?, ?,?,?)',
    [book_id, book_name, book_author, book_price,book_stock, book_url,book_type,book_section],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data into database');
      }
      console.log('Data inserted successfully');
      //res.status(200)
      res.sendFile(path.join(__dirname, 'public', 'admin_operations.html'));
      //res.status(200).send('Data inserted successfully');
    });
});

app.post('/update', (req, res) => {
  const { book_id, book_name, book_author, book_price, book_url, book_stock,book_type,book_section} = req.body;


  connection.query('INSERT INTO books (book_id, book_name, book_author, book_price, book_url, book_stock,book_type,book_section) VALUES (?, ?, ?, ?, ?, ?,?,?)',
    [book_id, book_name, book_author, book_price, book_url, book_stock,book_type,book_section],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data into database');
      }
      console.log('Data updated successfully');
      res.status(200).send('Data inserted successfully');
    });
});


  app.post('/delete', (req, res) => {
    const { book_id } = req.body;
  
    connection.query('DELETE FROM books WHERE book_name = ?', [book_id], (error, results) => {
      if (error) {
        console.error('Error deleting data:', error);
        return res.status(500).send('Error deleting data from database');
      }
      console.log('Data deleted successfully');
      res.status(200).send('Book Record deleted successfully');
    });
  });

app.post('/signup', (req, res) => {
  const { uid, uemail, uname, upass,uphone, ulocation} = req.body;
  connection.query('INSERT INTO user_ids(user_id,user_email,user_name,user_password,user_phone,user_location) VALUES (?, ?, ?, ?, ?,?)',
    [uid, uemail, uname, upass,uphone, ulocation],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data into database');
      }
      console.log('Data inserted successfully');
      res.status(200).send('user created');
    });
});


app.get('/admin_login', (req, res) => {
  const sql = 'SELECT * FROM admin_login ORDER BY timestamp DESC LIMIT 1';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });  

});

app.get('/user_details', (req, res) => {
  const sql = 'SELECT * FROM user_ids';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });  

});


app.get('/user_details_and_order', (req, res) => {
  const sql = 'SELECT * FROM user_orders2';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });  

});

app.get('/reviews', (req, res) => {
  const sql = 'SELECT * FROM user_review';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });  

});

app.post('/changestatus', (req, res) => {
  const { order_id } = req.body;

  connection.query(
    'UPDATE user_orders2 SET order_status = "dead" WHERE order_id = ?',
    [order_id],
    (error, results) => {
      if (error) {
        console.error('Error updating data:', error);
        return res.status(500).send('Error updating data in the database');
      }
      console.log('Data updated successfully');
      res.sendFile(path.join(__dirname, 'public', 'user_account_interface.html'));
    }
  );
});

app.post('/comment', (req, res) => {
  const comment = req.body.dropurcomment;
  res.redirect(`/CommentDetails.html?comment=${comment}`);
  
});


app.post('/submitComment',(req,res)=>{
  const { book_name,commentData} = req.body;
  const user_name = "ankush"
  connection.query('INSERT INTO user_review(user_name,book_name,user_comment) VALUES (?,?,?)',
    [user_name,book_name,commentData],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send('Error inserting data into database');
      }
      console.log('Data inserted successfully');
      res.sendFile(path.join(__dirname, 'public', 'updatedcart.html'));
    });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





