const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// express app
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
    next();

});

hbs.registerHelper('getCurrentYear', () => {
    return (new Date()).getFullYear();
})

app.get('/', (request, response) => {
    // response.send('<h1>Hello from express app.</h1>');
   response.render('home.hbs', {
        title: 'Home Page',
        welcome: 'You are not welcomed here.'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error encountered'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});