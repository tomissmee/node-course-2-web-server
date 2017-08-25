const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getDate', () => {
    return new Date().getFullYear();
});

//middleware==========================================
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e) {
            console.log('Unable to append file!');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});


app.get('/hbs', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome, user!'
    });
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>');
});

app.listen(3000, () => {
    console.log('servering started!');
});