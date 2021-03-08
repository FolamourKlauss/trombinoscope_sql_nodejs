const promos = require('../../data/promos.json');
const students = require('../../data/students.json');
const { Client } = require('pg');
const client = new Client({
    host: 'pg.oclock.lan',
    port: 5432,
    user: 'etudiant',
    password: 'js4life',
    database: 'trombi'
});

const promoController = {
    list: (req, res) => {
        //je me connect a PG
        client.connect();
        //je fait la requete
        client.query(
            'select * from student where promo_id = 135;', 
            (error, result) => {
        
                // si error contient quelque chose soit le server est pt, soit notre sql est pourri 
                if(error) {
                    console.error(error);
                    return;
                }
                // lorsque PostgreSQL aura répondu au client, le client va appeler cette callback
        
                // dans les resultats on a le nombres de lignes trouvées et un tableau contenant les lignes
                // ce tableau se situe dans result.rows
                const promos = result.rows;
                console.log(promos);

                client.end();
            }
        );
        //je recup les resultats
        res.render('promo/list', {promos});
    },


    view: (req, res, next) => {
        // on recupère l'ID dans les parametres d'URL
        const promoId = parseInt(req.params.id, 10);

        // on cherche dans la liste des promo celle qui possede l'ID trouvé dans l'URL
        const promo = promos.find(
            (promo) => {
                return promo.id === promoId
            }
        );

        // gestion de la 404
        // Si on a pas trouvé de promo correspondant a l'ID
        if(!promo) {
            // on transmet la requete à la couche suivante de Express
            // la couche suivante c'est celle qui gére l'erreur 404
            // le return permet d'arreter l'execution de la methode ici
            return next();
        }

        // Si on a bien trouvé la promo correspondant a l'ID ALORS on affiche la template
        res.render('promo/view', {promo});
    },

    listStudents: (req, res, next) => {
        // on recupère l'ID dans les parametres d'URL
        const promoId = parseInt(req.params.id, 10);
        
        // on cherche dans la liste des promo celle qui possede l'ID trouvé dans l'URL
        const promo = promos.find(
            (promo) => {
                return promo.id === promoId
            }
        );
        
        // gestion de la 404
        // Si on a pas trouvé de promo correspondant a l'ID
        if(!promo) {
            // on transmet la requete à la couche suivante de Express
            // la couche suivante c'est celle qui gére l'erreur 404
            // le return permet d'arreter l'execution de la methode ici
            return next();
        }

        const promoStudents = students.filter(
            (student) => {
                return student.promo === promoId;
            }
        );

        res.render('promo/listStudents', {promo, promoStudents})
    }
}

module.exports = promoController;