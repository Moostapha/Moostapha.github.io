const dbmySql = require('../mysqlconnection');  // import configuration de connection avec BD sql

/* FICHIER MODEL POST AVEC TOUTES LES REQUETES SQL CRUD concernant le tableau 'posts' de notre DB mysql
Requetes sql de l'API pour les 'posts'
Table post => id | post | userId | username |  date_creation */

// REQUETES CRUD SUR LA TABLE POSTS DE NOTRE DB MYSQL

// Fonction requête sql pour affichage de tous les posts
exports.getAll = () => {
    return new Promise((resolve, reject) => { 
        // Préparation requête SQL
        // const sql = 'SELECT * FROM posts' changement SQL avec jointure sur table users
        // faire des tests ici pour enlever le duplicated key id et userId the same
        const sql = 'SELECT * FROM posts ORDER BY posts.date_creation DESC';
        // Exécution requête
        dbmySql.query( sql, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
};


// Fonction requête sql pour affichage d'un seul post
// Requete query on selectionne toutes les colonnes correspondant à l'id_post en parametre
exports.getOne = (id_primary) => { // idPost === primaryId
    return new Promise((resolve, reject) => { //gestion asynchrone
        // const sql = 'SELECT * FROM posts WHERE id= ?';
        const sql = 'SELECT * FROM posts JOIN users ON posts.userId = users.id WHERE id=?'
        dbmySql.query( sql , [id_primary] , function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
        })
    })
};


// Fonction requête sql pour CREATION d'une ligne dans la table post
// userId est la clé primaire id de user
exports.create = (post, userId, username) => { 
    return new Promise((resolve, reject) => {
        const dataInserted = [post, userId, username]
        const sql = 'INSERT INTO posts ( post, userId, username) VALUES (?,?,?)';
        dbmySql.query(sql, dataInserted, function (error, results, fields){
            if (error) reject (error);
            resolve(results);
            console.log(results);
        })
    })
};


// Fonction requête sql pour MODIFIER un post
exports.update = ( post, userId, idPost ) => {
    return new Promise((resolve,reject) => {
        //requete sql dans une const
        const sql = 'UPDATE posts SET post=? WHERE id=? AND userId=? ';
        let dataUpdated = [post, userId, idPost]
        dbmySql.query( sql, dataUpdated , function (error, results, fields){
            if (error) reject (error);
            resolve(results);
        })
    })
};


// Fonction requête sql pour SUPPRIMER un post
exports.delete = (id_post) => { 
    return new Promise((resolve,reject) => {
        // const sql = 'DELETE FROM posts WHERE id= ?';
        const sql = 'DELETE FROM posts WHERE id=?';
        dbmySql.query( sql, [id_post], function (error, results, fields){
            if (error) reject (error);
            resolve(results);
        })
    })
};

// DELETE FROM `posts` WHERE `posts`.`id` = 1;