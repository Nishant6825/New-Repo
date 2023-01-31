const express = require('express');
const cors = require('cors');
const app = express();

const whiteList = [ 'http://localhost:4000', 'https://localhost:4443'];
var corsOptionDelegate = (req, callback) => {
    var corsOptions;
    if (whiteList.indexOf(req.header('origin')) !== -1){
        corsOptions = {origin: true};
    }
    else{
        corsOptions = {origin: false};
    }
    callback(null, corsOptions);
}
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);
