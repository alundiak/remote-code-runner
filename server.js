var express = require('express')
var path = require('path')
var fs = require('fs')
var shell = require('shelljs')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var php = require("node-php");
const uuidv4 = require('uuid/v4');

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

function interpretCode(ext, fileName) {
    var res;

    switch (ext) {
        case 'java':
            console.log(`\nJava file ${fileName} created. Compiling...`);
            shell.exec('javac Solution.java');
            console.log(`${fileName} file compiled. Running...`);
            res = shell.exec('java Solution');
            // shell.rm('Solution.class');
            console.log('\nSolution.class removed');
            break;
        case 'js':
            console.log(`\nJavaScript file ${fileName} created. Running via Node...`);
            res = shell.exec('node ' + fileName);
            break;
        case 'c':
            console.log(`\nC file ${fileName} created. Compiling...`);
            res = shell.exec('gcc ' + fileName + ' && ./a.out'); // a.out is default file name and extension created after compiling.
            // shell.rm('./a.out');
            break;
        case 'cpp':
            console.log(`\nC++ file ${fileName} created. Compiling...`);
            res = shell.exec('g++ ' + fileName + ' && ./a.out');
            // shell.rm('./a.out');
            break;
        case 'py':
            console.log(`\nPython file ${fileName} created. Executing...`);
            res = shell.exec('python ' + fileName);
            break;
        case 'php':
            console.log(`\nPHP file ${fileName} created. Executing...`);
            res = shell.exec('php -f ' + fileName);
            var a = php.cgi(fileName);
            // console.log(a);
            break;
    }

    // console.log(res);

    // shell.rm(fileName);
    // console.log(`\n ${fileName} removed`);

    return {
        result: res.stdout,
        error: res.stderr
    };

}

app.post('/interpret', function(request, response) {
    var ext = request.body.language;

    const folderName = 'temp_' + uuidv4();
    shell.mkdir(folderName);
    shell.cd(folderName);

    var fileName = 'Solution.' + ext; // for Java it's important, because *.java file contains Class name, which is later used by java command.

    fs.writeFile(fileName, request.body.code, function(err) {
        if (err) {
            return console.log(err);
        }

        response.send(interpretCode(ext, fileName))
        shell.cd('../');
        shell.rm('-rf', folderName);
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
