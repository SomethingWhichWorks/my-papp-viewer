import * as express from "express";
import * as bodyParser from "body-parser";
import * as _ from "lodash";
import { join } from "path";

var app = express();
var router = express.Router();

app.use(bodyParser.json());   // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Pass to next layer of middleware
    next();
});

app.use(function (req, res, next) {
    if (req.path.indexOf('api') !== -1) {
        var logResp = {
            'Time': Date.now(),
            'request api': req.path,
            'request method': req.method,
            'request body': req.body,
            'request paras': JSON.stringify(req.params)
        };
        console.log(JSON.stringify(logResp));
    }
    next();
});

app.use(express.static(__dirname));
app.use('/', express.static(join(__dirname, '../', 'build')));

var port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log("Server listening on port ", port);
});

