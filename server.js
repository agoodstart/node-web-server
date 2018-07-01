const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) throw err;
        console.log('The log was appended to file!');
      });
    next()
})

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        welcomeMessage: 'The site is currently under maintenance. Please come back later',
        pageTitle: 'Under Maintenance'
    })
})

app.use(express.static(`${__dirname}/public`))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my brand new website!',
        pageTitle: 'Homepage',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})