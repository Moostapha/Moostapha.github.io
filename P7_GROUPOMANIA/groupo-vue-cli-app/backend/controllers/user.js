// Import du package de cryptage pour password
const bcrypt = require('bcrypt');
// Import du package de remise de TOKEN pour authentification
const jwt = require('jsonwebtoken');
// schema de donnees User de User/model
const User = require('../models/User'); 


/* API LOGIQUES METIERS CRUD LIE AU USER qui doit pouvoir :
1) créer un compte => signup avec mail et password sécurisés dans la bdMysql 
2) se connecter =>  login de manière authentique et sécurisée (bcrypt, jsonwebtoken)
3) Pouvoir avoir accés à son compte ,une fois ces étapes effectuées, Doit pouvoir le modifier => readMyAccount et UpdateMyAccount
4) Le supprimer => deleteMyAccount
5) Editer un post
6) Poster un commentaire sur son post ou celui des autres.
7) Liker/disliker des commentaires => Fonctions likePost et dislikePost
*/


/* Fonction signup création de compte user et cryptant le password
Utilisation de la fonction de hachage de bcrypt sur le mot de passe afin de le crypter
afin de stocker les passwods des users cryptés sur la BD SQL*/
exports.signup = (req, res, next) => {
    // récupération infos envoyées par le front
    // récupération corps requetes POST du frontend du nouvel utilisateur du réseau social
    const newUser = req.body
    
    // hash du password
    bcrypt.hash(newUser.password , 10) // cryptage de ce dernier
    .then (
        async(hash) => {
            const inscription = await User.signUp(newUser.username, newUser.email, hash); // params fonction ici dans le meme ordre que params fonction du Model
            res.status(201).json({ account: inscription });
            console.log(inscription);
        }
    )
    .catch( error => res.status(500).json({ message: error }) );
};



/* Fonction login connexion sécurisée et authentifiée du user 
Les tokens d'authentification permettent aux utilisateurs de ne se connecter 
qu'une seule fois à leur compte. Au moment de se connecter, 
ils recevront leur token et le renverront automatiquement à chaque requête par la suite. 
Ceci permettra au back-end de vérifier que la requête est authentifiée.
Le Token est assigné à l'id clé primaire du user dans notre BD SQL. L'id clé primaire 
nous servira aussi à identifier de manière unique un user qui se connecte à l'app.
*/
exports.login = async(req, res, next) => {

    // Récupération password et email send avec requête depuis le front
    const password = req.body.password;
    console.log(" Password venant du front:  ",password); 
    const email = req.body.email; 
    // infos user à la connexion (inputs) ou le mail apparait (all champs) récupération promesse faite dans User.js
    // On passe dans la constante la promise login avec paramètre l'email entré en input form => le password correspondant sera dans result
    const result = await User.login(email); // on récupére le resultat de la promise ici
    console.log("résultat de la promise", result[0]); // resultat de la promise affichée dans console toujours sur des var et des resultats attendus comme await
    bcrypt.compare(password, result[0].password)  // comparaison password entré avec password stocké dans db
    .then( valid => { 
        // cas ou la comparaison est vraie
        if (!valid) {
            return res.status(401).json({error: 'Mot de passe incorrect !!!'}); 
        }
        // émission du token d'authentification du user
        const token = jwt.sign(
            {userId: result[0].id},
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h'},
        );
        console.log(token);
        res.status(200).json({ account: token }); // succés et assignation
        res.status(200).json({ message: 'Connexion à votre compte réussie !!!' }); // message de succés
    })
    .catch( error => res.status(500).json({error}) );
};




//Fonction pour lire mon compte user
exports.getMyAccount = async(req, res, next) => {
    const userId = req.params.id // id encodé dans l'URL
    const myAccount = await User.getOneUser(userId); // on reprend la fonction getOneUser du model
    res.status(200).json({ account: myAccount });
};


// Fonction modif de mon compte user
exports.updateMyAccount = async(req, res, next) => {
    const userId  = req.params.id;
    const modify = req.body;
    const updatedAccount = await User.updateUser(  
        modify.username, 
        modify.email, 
        modify.password, // Doit on recrypter le password modifié? Apparemment oui
        userId 
    );
    res.status(200).json({ account: updatedAccount });
};



// Fonction suppression de mon compte user
exports.deleteMyAccount = async(req, res, next) => {
    const userId  = req.params.id;
    const deletedAccount = await User.deleteUser(userId);
    res.status(200).json({ account : deletedAccount });
};
    














