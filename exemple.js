//l asynchrone est que le code s execute pendant q'une ou plusieur requetes sont en cours

// L’AJAX est une technologie permettant de mettre à jour simplement des parties du DOM d'une page HTML au lieu de devoir recharger la page entière. 

// AJAX permet également d’exécuter du code de manière asynchrone, c'est-à-dire que votre code continue à s'exécuter pendant qu’une ou plusieurs requêtes sont en cours.

// fetch est une web api qui permet d envoyer des requetes http

let pathWith = path.split("/");
    if (pathWith.length > 3) {
      path = "/" + pathWith[1] + "/" + pathWith[2];
    }

    // mettre en dessous de const path dans _app (attention const path devient let path)

    // à mettre dans helpers/api/jwt-middleware dans la variable path
    { url: /^\/api\/projets\/.*/, methods: ["GET"] },