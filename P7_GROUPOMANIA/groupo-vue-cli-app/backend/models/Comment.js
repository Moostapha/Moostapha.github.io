const dbmySql = require('../mysqlConnection');   // import configuration de connection avec BD sql

// Nous écrivons les fonctions query du model Comment:
// User doit pouvoir créer | modifier | effacer son commentaire
// Table Comments => id | commentaire | postId | userId | date_creation

exports.read = () => {
    return new Promise((resolve, reject) => {
        dbmySql.query('SELECT * FROM comments', function(error, results, fields){
            if (error) reject(error);
            resolve(results);
            // console.log(fields);
        })
    })
};
// 'SELECT comments.*, users.avatar FROM comments JOIN users ON comments.idAuteur = users.id AND comments.idPost="'+req.params.id+'" ORDER BY id DESC'


exports.create = ( commentaire, postId, userId, username ) => {
    return new Promise((resolve, reject) => {
        // respecter ordre champs des tables 
        const sql = 'INSERT INTO comments (commentaire, postId, userId, username) VALUES (?, ?, ?, ?)'
        let dataInserted = [commentaire, postId, userId, username]
        dbmySql.query( sql, dataInserted , function(error, result, field) {
            if (error) reject (error);
            resolve (result);
            // console.log(field);
        })
    })
};



exports.update = ( commentaire, postId, userId ) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE posts SET commentaire=?, postId=?, userId=? WHERE id=?'
        let dataUpdated = [commentaire, postId, userId, id]
        dbmySql.query( sql , dataUpdated ,function(error, result, field) {
            if ( error ) reject( error );
            resolve(result);
            // console.log(field)
        })
    })
};


exports.delete = (id_primary) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM comments WHERE id=?'
        let dataDeleted = [id_primary]
        dbmySql.query( sql, dataDeleted ,function(error, result, field){
            if (error) reject(error);
            resolve(result);
            // console.log(field)
        })
    })
};
