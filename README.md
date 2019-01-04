# Hangman

This is a simple nodejs using express for the server, and ejs with bootstrap for the front end.

# To run

NOTE: This app requires nodejs.

Start the server with nodejs by calling "node app" in the command line from the same directory as "app.js", the entry point of the application.
Access the home page by typing "localhost:3000" in your browser. The app is configured to run on port 3000 by default, and will need that port to execute.

# DB Setup
1. This application uses a MySQL database connection. The script is located in /config/database.sql
2. Create a mysql database call node_js_games
3. Run the above script to generate tables

# Optional
You can run this application without the MySQL database. Instead of selecting a word from the database,
hangman will pick from a default list of words as its puzzle word.

# Bugs
When a user attempts to refresh the game over page, the app redirects to the game page already in progress. Users should use the "Play again" link to avoid this until a fix can be made.
