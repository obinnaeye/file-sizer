var express = require("express");
//multer is used to parsed form data with multipart type
var multer  = require('multer');
var upload = multer();
//use this if you want the files to be saved in the folder "uploads"
//var upload = multer({ dest: 'uploads/' });
var app = express();

//var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.set('views',  './views');
app.set("view engine", "pug");

app.use(express.static(__dirname + '/views'));
        
//res.render("index");

app.get("/", function(req, res){
    res.render("index");
});


app.post('/filesize', upload.single('fileObj'), function (req, res) {
    //if(!req.file){res.send("No File Selected. Please Select a file to for upload and view the size.")}
  var outPutJson = { filesize: req.file.size };
  res.status(200).json(outPutJson);
});


// custom 500 page see https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  //you can also render custom html file
  res.send('500: Internal Server Error. Please ensure you selected a file for upload before submitting.');
});

// custom 404 page, see https://expressjs.com/en/starter/faq.html
app.use(function (req, res, next) {
  res.status(404);
  //console.error(err);
  //you can also render custom html file
  res.send('404: Page not found!');
});

app.listen(process.env.PORT, function(){
    console.log("Your Connection Listening at port: ", process.env.PORT);
});