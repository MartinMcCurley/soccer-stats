// Importing necessary modules
const express = require("express"); // Express.js for server creation
const mysql = require("mysql"); // MySQL for database interaction
const matchRoutes = require('./routes/index');  // import the route module
const { create: createHandlebars } = require('express-handlebars');
const fs = require('fs'); // File system for reading files
require('dotenv').config();

// Creating an instance of an express application
const app = express();
const hbs = createHandlebars({ defaultLayout: 'main' });

hbs.handlebars.registerPartial(
    'match', 
    fs.readFileSync(__dirname + '/views/match.handlebars', 'utf8')
);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Define the path to public directory
app.use(express.static('public'));

// Use the imported route module at the /api path
app.use('/api', matchRoutes);

// Define a route handler for GET requests made to the root path ('/')
app.get("/", (req, res) => {
    res.render('home'); // Render home.handlebars view
});

// Define the configuration for the MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "soccer_stats_db",
});

// Attempt to connect to the database
db.connect((err) => {
    if (err) {
        // If an error occurred during the connection, log it and throw the error
        console.error("An error occurred while connecting to the DB");
        throw err;
    }
    // If the connection was successful, log a success message
    console.log("Connected to the database.");
});

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Listening on the defined port and logging a message to the console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
