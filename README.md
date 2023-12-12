## Préparer le lancement du projet

Tout d'abord, il faut lancer le serveur local:

Pour cela vous allez avoir besoin d'avoir [Node JS](https://nodejs.org/en/download)

Après l'installation de Node JS, ouvrez par la suite un terminal dans la racine (la racine correspond à l'intérieur du dossier MediPlan et utiliser les commandes

```bash
npm i #pour installer les dépendances

puis

npm run dev  #pour lancer le serveur
```
Une fois les commandes effectuez, créer un fichier .env dans la racine du projet si ce n'est pas déjà fait.

Ce fichier contiendra les données suivantes : 
```
NEXTAUTH_SECRET=my_ultra_secure_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
MONGO_URI=mongodb+srv://letscodebutinfo:6tRWAVN7DoVwtGKk@cluster0.vihedg3.mongodb.net/
```

ouvrez le projet sur [localhost:3000](http://localhost:3000) avec votre navigateur.


- une fois sur localhost vous devriez voir une page de connexion.
- Vous pouvez :
    - rentrer les informations de connexion si vous en avez
    - ne rien rentrez et cliquer sur connexion.
Cependant pour se connecter sans rien il est nécessaire d'avoir le fichier .env à la racine du projet.

Si vous n'avez pas ce fichier merci de nous contacter pour l'obtenir.
