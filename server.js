var express = require('express')
var path = require('path')
var fs = require('fs')
var shell = require('shelljs')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var php = require("node-php"); 

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

/*
var router = express.Router();
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/interpret')
    .post(function(req, res) {
        // req.params {} - if params
        // req.query {}
        // req.body (if form)
        console.log(req, req.body, req.query, req.params)

        res.json({ message: 'Bear created!' });
    });
app.use('/api', router);
*/

function interpretCode(ext, fileName){
    var res;

    switch (ext) {
        case 'java':
            console.log('Java file created. Compiling...');
            shell.exec('javac Solution.java');
            console.log('Java file compiled. Running...');
            res = shell.exec('java Solution');
            shell.rm('Solution.class');
            break;
        case 'js':
            console.log('JavaScript file created. Running via Node...');
            res = shell.exec('node '+ fileName);
            break;
        case 'cpp':
            console.log('C++ file created. Compiling...');
            res = shell.exec('cpp '+ fileName);
            break;
        case 'py':
            console.log('Python file created. Compiling...');
            res = shell.exec('py '+ fileName);
            break;
        case 'php':
            console.log('PHP file created. Compiling...');
            res = shell.exec('php -f '+ fileName);
            var a = php.cgi(fileName);
            console.log(a);
            break;
    }

    // shell.rm(fileName);

    console.log(res);

    return {
        result: res.stdout,
        error: res.stderr
    };

}

app.post('/interpret', function(request, response) {
    var ext = request.body.language;
    
    shell.cd('solutions');

    var fileName = 'Solution.' + ext; // for Java it's important, because *.java file contains Class name, which is later used by java command.

    fs.writeFile(fileName, request.body.code, function(err) {
        if (err) {
            return console.log(err);
        }

        response.send(interpretCode(ext, fileName))
        shell.cd('../');
    });

    // request.on('data', function() {
    //     var post = request.data;
    //     console.log(post);

    //     response.send({
    //         result: 'Result'
    //     })    
    // });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
