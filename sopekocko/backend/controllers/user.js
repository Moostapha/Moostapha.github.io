const bcrypt = require('bcrypt');    // bcypt enables password's hashing for security
const User = require('../models/User');  // calling of User Models
const jwt =  require('jsonwebtoken');   // Will setup token security for login


/*FONCTION SIGNUP
Utilisation de la fonction de hachage de bcrypt sur le mot de passe afin de le crypter
Fonction asynchrone avec une promesse
dans le bloc then, on crée un nouveau user dans la base de donnée avec son mot de passe crypté
et on envoie une réponse en cas de succès ou d'échec
*/
exports.signup = (req, res, next) => {     
    bcrypt.hash(req.body.password , 10)   // encrypt user's password salt 10 times
     .then(hash => {                 // taking hashed password and creating a new user with it
        const user = new User({    
            email: req.body.email,
            password: hash  
        });
        user.save()     // Saving our brand new user's encrypted password in database
        .then( () => res.status(201).json({ message: 'Utilisateur créé avec succés !'}))
        .catch( error => res.status(500).json({ error }));
    })
    .catch( error => res.status(500).json({ error }));
}; 


/*FONCTION LOGIN
Les tokens d'authentification permettent aux utilisateurs de ne se connecter 
qu'une seule fois à leur compte. Au moment de se connecter, 
ils recevront leur token et le renverront automatiquement à chaque requête par la suite. 
Ceci permettra au back-end de vérifier que la requête est authentifiée.
*/
exports.login = (req, res, next) => {  
    User.findOne({ email: req.body.email })  
    .then(user => {                        
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }                                                     
        bcrypt.compare(req.body.password , user.password)      
        .then(valid => {                                 
            if(!valid) {                           
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({ 
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        })
    .catch(error =>res.status(500).json({ error }));
    })
    .catch(error =>res.status(500).json({ error })) 
}; 

/* We export these functions to ../routes/user.js
1) We look for an email in DB matching user's login
2) If no matching we send this message
3) Comparing results from the DB with user's password
4) Checking validity
6) If user's mail not found we send an serveur error
*/