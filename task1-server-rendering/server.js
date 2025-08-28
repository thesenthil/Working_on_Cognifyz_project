const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// This line tells Express to use EJS as the view engine
app.set('view engine', 'ejs'); 

// Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS from "public" folder (optional)
app.use(express.static('public'));

// Route to show the form page
app.get('/', (req, res) => {
  res.render('index');  // This means "render views/index.ejs"
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.render('thankyou', { name, email });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
