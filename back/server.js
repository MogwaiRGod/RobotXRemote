/**
 * MODULES
 */

// notre application sera une application express
const express = require('express');
// on va la faire tourner sur un serveur HTTP si les navigateurs ne peuvent pas utiliser les connexions Web Socket de socket.io
const http = require('http');
// puis, on montera ce serveur sur un autre serveur, socket.io cette fois-ci
const { Server } = require('socket.io');
// pour traiter les URL
const bodyParser = require('body-parser');


/**
 * CONSTANTES
 */

// instanciation de l'app
const app = express();
// pour pouvoir lire les URL de manière standard (= ?param=value&param=value...)
app.use(bodyParser.urlencoded({extended:true}));
// instanciation du serveur http, sur lequel on monte l'application
const serverHttp = http.createServer(app);
// instanciation du serveur socket.io, sur lequel on monte le serveur HTTP
const io = new Server(serverHttp);
const port = 4000;


/**
 * SCRIPT
 */

// on autorise l'accès au fichier views
app.use(express.static("../views/html"));


/**
 * ROUTES
 */

app.get('/', (request, response) => {
    // affichage de la page robot
    response.send("La page est fonctionnelle");
});

// URL menant à la page web du robot
app.get('/robot', (request, response) => {
    // affichage de la page robot
    response.sendFile('/exos/1_REMOTE/views/html/robot.html');
});

// URL menant à la page web de la télécommande
app.get('/remote', (request, response) => {
    // affichage de la page téléceur connecté à la télécommande');
    response.sendFile('/exos/1_REMOTE/views/html/remote.html');
});


/**
 * ECOUTEURS D'EVENEMENTS
 */

// quand un utilisateur se connecte
io.on('connection', (socket) => {
    console.log("Utilisateur connecté");

    // à la réception par le serveur des données initiales du robot
    socket.on("init data", (data) => {
        // on l'envoie à la télécommande
        io.emit("init data", 
        /* le serveur ne peut pas envoyer d'objets JSON, donc on chaînifie la donnée */
        JSON.stringify(data));
    });

    /**
     * Données de position reçues depuis la télécommande
     */
    socket.on("moveY", (data) => {
        // on émét les données sur tous les canaux receveurs
        io.emit("moveY", data);
    });
    socket.on("moveX", (data) => {
        // on émét les données sur tous les canaux receveurs
        io.emit("moveX", data);
    });
    

    // on supprime les gestionnaires d'événements une fois l'utilisateur déconnecté
    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté');
        // on supprime les écouteurs d'événement pour éviter les erreurs
        socket.removeAllListeners();
    });
});


// on fait tourner le serveur http
serverHttp.listen(port, () => {
    console.log("L'application tourne sur le port " + port);
});
