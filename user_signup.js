const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a connection pool for MySQL



app.get('/',function(req,res){
   res.sendFile(__dirname+'/user_signup.html')
})