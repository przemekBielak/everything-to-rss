const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const gmail = require('./gmail.js')

app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}`))

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// });

app.get('/api', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.get('/rss2', (req, res) => {
  fs.readFile('./rss.xml', 'utf-8', (err, data) => {
    res.send(data);
  })
});

let newsletterNames = [];
let activeNewsLetters = [];

app.post('/rss', (req, res) => {
  newsletterNames.push(req.body.newsletterName)
  console.log(newsletterNames)
})


// gmail()