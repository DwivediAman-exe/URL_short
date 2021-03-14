const express = require("express");
const mongoose = require("mongoose")
const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/UrlDB', {useNewUrlParser: true, useUnifiedTopology: true});


app.get("/", (req,res) => {
  res.render("index");
});

app.post("/shortUrls", (req,res) => {

});

app.listen(process.env.PORT || 3000);
