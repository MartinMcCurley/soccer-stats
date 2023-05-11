// Importing necessary modules
const express = require("express"); // Express.js for server creation
const mysql = require("mysql"); // MySQL for database interaction

// Creating an instance of an express application
const app = express();

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Listening on the defined port and logging a message to the console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Define a route handler for GET requests made to the root path ('/')
app.get("/", (req, res) => {
    res.send("Hello, world!"); // Send a response to the client
});

// Define the configuration for the MySQL database connection
const db = mysql.createConnection({
    host: "localhost", // The hostname of the database server
    user: "root", // The MySQL user to authenticate as
    password: "TheGers1955!", // The password of that MySQL user
    database: "soccer_stats_db", // The name of the database to use
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