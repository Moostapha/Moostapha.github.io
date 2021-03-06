// Import des paramètres de connexion à notre bd groupomania
const dbmySql = require('../mysqlConnection'); 


/*FONCTIONS ET REQUETES SQL LIEES A LA TABLE users | OPERATIONS CRUD SUR TABLE user
Sur la table users, on doit pouvoir manipuler les données de la maniere suivante:
create | update | delete => on doit avoir ici les requêtes sql permettant d'effectuer 
ces opérations sur cette table => users: id (autoincrement) | username | email | password | date_creation
*/

// exemple de requete sql donné apres ajout dans bd:
// ALTER TABLE `users` ADD `test` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `date_creation`;

// Fonction de création de compte user sur l'application avec email et mot de passe

exports.signUp = (username, email, password) => {
    return new Promise((resolve, reject) => {
        // préparation requete SQL modif car ajout de username
        // Attention dans VALUES, ne pas mettre champ=? mais juste des ? sinon le user est créé 
        // mais dans les champs de la db => 0 sera écrit à la place des infos attendues 
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ? )'; 
        let dataNewUser = [username, email, password]
        // excécution requete SQL
        dbmySql.query( sql, dataNewUser, function(error, result, field) {
            if(error) reject(error);
            resolve(result);
            console.log(result);
        })
    })
};


/* Fonction de connexion sécurisée avec remise de tokens
Les tokens d'authentification permettent aux utilisateurs de ne se connecter 
qu'une seule fois à leur compte. Au moment de se connecter, 
ils recevront leur token et le renverront automatiquement à chaque requête par la suite. 
Ceci permettra au back-end de vérifier que la requête est authentifiée. */
exports.login = (email) => {
    return new Promise((resolve, reject) => {
        // requete SQL préparée qui renverra tous les champs de la ligne ou cet email apparait:
        const sql = 'SELECT * FROM users WHERE email=?'; 
        // excécution de la requête SQL:
        dbmySql.query( sql, [email], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            console.log(error);
            console.log(result);
        })
    })
};


// Fonction affichant un user par son id
exports.getOneUser = (id) => {
    return new Promise((resolve, reject) =>{
        // Préparation requête:
        const sql = 'SELECT * FROM users WHERE id=?'; 
        // exécution requête:
        dbmySql.query( sql, [id], function(error, result, field){
            if(error) reject (error);
            resolve(result);
            console.log(result);
            // console.log(field);
        })
    })
};


// Fonction modifiant une ligne de la table users
exports.updateUser = (username,  password, primaryId) => {
    return new Promise((resolve, reject) =>{
        // prepared request
        const sql ='UPDATE FROM users SET username=?, password=? WHERE id=?'; // est ce que la requête correspond à update Username || password?
        let dataUpdated = [username, password, primaryId]
        //executed request
        dbmySql.query( sql, dataUpdated, function(error, result, field){ // modif car ajout clé username dans table
            if(error) reject(error);
            resolve(result);
            // console.log(field);
        })
    })
};


// Fonction requete sql effacant la ligne liée à l'id de la table user
exports.deleteUser = (primaryId) => {
    return new Promise((resolve, reject) => {
        const sql ='DELETE FROM users WHERE id=?';
        dbmySql.query( sql, [primaryId], function(error, result, field){
            if(error) reject(error);
            resolve(result);
            // console.log(field);
        })
    })
};


// Fonction requête pour afficher tous les users
exports.getUsers = () => {
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM users WHERE is_admin=0';
        dbmySql.query(sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        })
    })

};