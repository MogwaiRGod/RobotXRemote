# RobotXRemote
> Application-serveur permettant à un client via une page web de contrôler un robot sur une autre page web

### Auteur 
Diane (MogwaiRGod)

<hr>

# Technologies

## Plateformes logicielles
* Node.Js
* Docker

## Langages
| HTML |
| CSS |
| JavaScript |
|-|

## Bibliothèques

| Module | Version |
|:--|:--:|
|socket.io| 4.6.1 |
|http|0.0.1-security|
|express|4.18.2|

<br>
<hr>
<br>

# Fonctionnement
Application Express tournant sur un serveur HTTP lui-même monté sur un serveur socket.io, afin de bénéficier de ses connexions en temps-réel. Les modules ont été importés en utilisant l'image Docker Alpine.
## Utilisation
* Après téléchargement des dossiers, installer les modules nécessaires et se déplacer dans le dossier back pour lancer le serveur.
* Aller sur : 
```
localhost:4000/robot
```
* Sur une autre page du navigateur, aller sur : 
```
localhost:4000/remote
```
Utiliser les flèches directionneles ou ZQSD pour déplacer le robot de l'autre page.
 
# Contenu
## /back
* server.js <br>
L'application-serveur qui gère les requêtes envoyées du côté client (la télécommande) et qui en renvoie à un autre client (le robot).
## /views
### /html
| Page | Description |
|:--|:--|
|**remote.html**|Sur cette page, en utlisant les flèches directionnelles ou les touches ZQSD on fait déplacer le robot sur l'autre page web.|
|**robot.html**|L'utilisateur n'interagit pas avec cette page. C'est juste pour la plaisir de regarder le robot se mouvoir.|
