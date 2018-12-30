# nodejs_Games

This is a simple nodejs application using ejs for the front end. It is currently in development for use as a hands on learning tool for nodejs, sequelize, and express. Currently there is one game "Hangman" which has no UI styling and simply attempts to handle all game conditions.

# DB Setup
1. This application uses a MySQL database connection. The script is located in /config/database.sql
2. Create a mysql database call node_js_games
3. Run the above script to generate tables

# Optional
You can run this application without the MySQL database. Instead of selecting a word from the database,
hangman will pick from a default list of words as its puzzle word.

TODO:
  Styling UI
  
  Implement hangman difficulty selector
