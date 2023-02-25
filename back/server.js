/**
 * # README
 * 
 * ## FONCTIONNEMENT
 * Application Express tournant sur un serveur HTTP lui-même monté sur un serveur socket.io, afin de bénéficier de ses connexions en temps-réel.
 * 
 * 
 * ## CONTENU
 * /back
 * -> server.js
 * L'application-serveur qui gère les requêtes envoyées du côté client (la télécommande) et qui en renvoie à un autre client (le robot)
 * /views
 * -> /html
 * -> -> remote.html
 * Boutons qui, au clic, permettent de déplacer le robot. Les clics envoient des requêtes au serveur.
 * Fonctionne également à la pression de touches (flèches ou QZDS)
 * -> -> robot.html
 * 
 */ 

/**
 * MODULES
 */

// notre application sera une application express
const express = require('express');
// on va la faire tourner sur un serveur HTTP si les navigateurs ne peuvent pas utiliser les connexions Web Socket de socket.io
const http = require('http');
// puis, on montera ce serveur sur un autre serveur, socket.io cette fois-ci
const io = require('socket.io');


/**
 * CONSTANTES
 */

// instanciation de l'app
const app = express();
// instanciation du serveur http, sur lequel on monte l'application
const serverHttp = http.createServer(app);
// instanciation du serveur socket.io, sur lequel on monte le serveur HTTP
const serverIo = new io.Server(serverHttp);
const port = 8080;

// on fait tourner le serveur
serverHttp.listen(port, () => {
    console.log("L'application tourne sur le port " + port);
});


/**
 * SCRIPT
 */

