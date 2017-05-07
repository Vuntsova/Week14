/**
 * Created by webohweb on 5/7/17.
 */

var path = require('path');
var express = require('express');

module.exports = function (app) {
    // Home page

    // Survey page
    app.get('/survey', function (req,res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));

    });
    app.use(express.static(__dirname + "/../public/style.css"));

    app.use(function (req,res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
};