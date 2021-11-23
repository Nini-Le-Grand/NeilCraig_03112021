# NeilCraig_03112021
OCR projet 7


Afin de pouvoir utiliser ce projet, veuillez suivre ces étapes :
1) Avoir Nodejs et mySQL installé sur son ordinateur
2) Créer une base de donnée SQL comportant 6 tables:
  - users {
    - id (int AI PK)
    - isAmdin (tinyint)
    - email (UNIQUE, varchar(255))
    - password (varchar(255))
    - firstName (varchar(45))
    - lastName (varchar(45))
    - imageUrl (varchar(255))
    - position (varchar(255))
    - description (mediumtext)
    - createdAt (datetime)
    - updatedAt (datetime)
  },
  - posts {
    - id (int AI PK)
    - userId (varchar(45))
    - title (varchar(255))
    - message (longtext)
    - imageUrl (varchar(255))
    - createdAt (datetime)
    - updatedAt (datetime)
  },
  - comments {
    - id (int AI PK)
    - userId (varchar(45))
    - postId (varchar(45))
    - message (mediumtext)
    - createdAt (datetime)
    - updatedAt (datetime)
  },
  - users_users {
    - id (int AI PK)
    - userId (varchar(45))
    - partnerId (varchar(45))
    - createdAt (datetime)
  },
  - posts_likes {
    - id (int AI PK)
    - postId (int)
    - userId (int)
    - createdAt (datetime)
  },
  - comments_likes {
    - id (int AI PK)
    - commentId (int)
    - userId (int)
    - postId (int)
    - createdAt (datetime)
  }
  
3) Télécharger le répertoire à partir de Github
4) Dans le dossier backend, compléter le fichier .envconfig puis le renommer .env
5) Dans le dossier backend, créer un dossier images contenant deux sous dossier : posts, users
6) Dans le terminal, se placer dans le dossier backend et lancer l'installation des packages avec la commande npm install
7) Dans le terminal, se placer dans le dossier frontend et lancer l'installation des packages avec la commande npm install
8) Dans le terminal, se placer dans le dossier backend et lancer le serveur avec la commande nodemon server
9) Dans le terminal, se placer dans le dossier frontend et lancer le serveur avec la commande npm run serve

L'application est prête à l'emploi ! Rendez-vous à l'addresse http://localhost:8080
