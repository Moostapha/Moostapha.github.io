const express = require('express'); // PARTIE IMPORT DE app.js package express
// utilisation d'express
const app = express(); 
//const mysql = require('mysql');
// package bodyparser
const bodyParser = require('body-parser');
// package contre injections xss
const xss = require('xss-clean'); 
// package protection headers
const helmet = require('helmet');


// Import des routes USER | POST | COMMENT
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


// PARTIE MIDDLEWARES de app.js
// Middleware général pouvant gérer l'erreur CORS ou cross origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Middleware Node.js de connection pour sécuriser les users inputs venant de POST, GET et des URL PARAMS
app.use(xss()); 
// Middleware de sécurite des headers
app.use(helmet());
// Middleware pour bodyparser qui transforme le corps de la requête en objet JS utilisable
app.use(bodyParser.json()); 




//PARTIE DES ROUTES DE app.js => USER POST ET COMMENT
app.use('/api/user', userRoutes); // Route user
app.use('/api/post', postRoutes)  // Route post
app.use('/api/comment', commentRoutes);  // Route commentaire

// export vers le server.js
module.exports= app;