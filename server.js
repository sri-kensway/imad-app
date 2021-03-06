var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');


var config = {
            user:'srikensway'  ,  
            databasename: 'srikensway',
            host: 'db.imad.hasura-app.io',
            port: '5432',
            password: process.env.DB_PASSWORD
            };
var app = express();
app.use(morgan('combined'));



function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

var htmlTemplate = `
<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width-device-width, initial-scale=1">
    <link href="/ui/style.css" rel="stylesheet" />
</head>    

<body>
    <div class="container">
    <div>
        <a href="/"> Home </a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date.toDateString()}
    </div>
    <div>
       ${content}
    </div>
    </div>
</body>    
    
</html>
`;

return htmlTemplate;

}




var counter=0;
app.get('/counter',function (req,res){
  counter=counter+1;
  res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req,res){
    
    //send reqeust to select data
    pool.query('select * from test', function (err,result){
        if (err) {
                 res.status(500).send(err.toSrting());        
                }
                else {
                res.send(JSON.stringify(result.rows));    
                }
        
    });
    // return response with results
    
});



var names=[];
app.get('/submit-name', function (req,res){
    // Get the name from the request
    
    var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
    
});

function hash(input,salt){
    var hased = crypto.pbkdf2Sync(input, salt ,10000 , 512, 'sha512');
    return ["pbkdf2","10000",salt,hased.toString('hex')].join('$');
};
app.get('/hash/:input', function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
    
});


app.get('/articles/:articleName',function (req,res) {
    //articleName==article-one
    //articles[articleName]=={} content object for article one
    var articleName=req.params.articleName;
    pool.query("select * from article where title= $1", [articleName] , function (err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length==0){
                res.status(404).send('Article is not found');
            }else{
                var articleData = result.rows[0];
            res.send(createTemplate(articleData));
            }
        }
        
    });

});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
