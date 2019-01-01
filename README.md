# hangman

This is a simple nodejs using express for the server, and ejs with bootstrap for the front end.

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
