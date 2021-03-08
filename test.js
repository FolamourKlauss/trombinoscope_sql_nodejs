// Dans le module pg (installé grace à la commande "npm i pg") je récupère uniquement le Client
const { Client } = require('pg');

// Méthode 1
// se connecter avec un objet de configuration
/*
const client = new Client({
    host: 'pg.oclock.lan',
    port: 5432,
    user: 'etudiant',
    password: 'js4life',
    database: 'trombi'
});
*/

// Méthode 2
// se connecter avec une chaine de connection
const client = new Client('postgresql://etudiant:js4life@pg.oclock.lan:5432/trombi');

// établi la connexion avec la BDD
client.connect();

// j'envoi un demande au server
client.query(
    'SELECT * FROM promo;', 
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

    }
);
