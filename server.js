const express = require("express");
const mongoose = require("mongoose");
const shortUrl = require("./modals/shortUrl");
const ShortUrl = require("./modals/shortUrl");

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/urlShortner', {useNewUrlParser: true, useUnifiedTopology: true});


app.get("/", async (req,res) => {
  const shortUrls = await ShortUrl.find()
	res.render("index",{shortUrls: shortUrls});
});

app.post("/shortUrls", async (req,res) => {
	shortUrl.create({fill: req.body.fullUrl})
	res.redirect("/");
});

app.get("/:shortUrl", async (req,res) => {
	const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl })
	if(shortUrl == null)
		return res.sendStatus(404);
	
	shortUrl.clicks++;
	ShortUrl.save();

	res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 3000);
