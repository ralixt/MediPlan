## Préparer le lancement du projet

Tout d'abord, il faut lancer le serveur local:

Pour cela vous allez avoir besoin d'avoir [Docker](https://docs.docker.com/engine/install/)

Après l'installation de docker, lancer docker et ouvrez par la suite un terminal dans la racine (la racine correspond à l'intérieur du dossier MediPlan) et utiliser les commandes

```bash
docker compose up
```
Le serveur est alors lancé lorsque sur le terminal il y a ceci :
```
mediplan-node-1  | > mediplan@0.1.0 start
mediplan-node-1  | > next start
mediplan-node-1  |
mediplan-node-1  |   ▲ Next.js 13.5.4
mediplan-node-1  |   - Local:        http://localhost:3000
mediplan-node-1  |
mediplan-node-1  |  ✓ Ready in 1144ms
```

ouvrez le projet sur [localhost:3000](http://localhost:3000) avec votre navigateur.


- une fois sur localhost vous devriez voir une page de connexion.
- Pour vous connecter utilisez :
  - utilisateur : test
  - mdp: test
