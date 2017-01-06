var express = require("express");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();

//var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.set('views',  './views');
app.set("view engine", "pug");

app.use(express.static(__dirname + '/views'));
        
//res.render("index");

app.get("/", function(req, res){
    res.render("index");
})


app.post('/filesize', upload.single('fileObj'), function (req, res) {
  var outPutJson = { filesize: req.file.size };
  res.json(outPutJson);
});

app.listen(process.env.PORT, function(){
    console.log("Your Connection Listening at port: ", process.env.PORT);
});