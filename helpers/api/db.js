import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';

// orm permet de creer une correspondance entre un modele objet et un modele relationnel de base de donnée 
// Sequelize ORM (Object Relational Mapper) est utilisé pour connecter, interroger et gérer les données dans la base de données MySQL. Sequelize prend également en charge la synchronisation des modèles pour générer automatiquement des tables et des colonnes de base de données basées sur des modèles définis dans le code.

const { serverRuntimeConfig } = getConfig();


export const db = {
    initialized: false,
    initialize
};
// creation des tables dans la base de donnees
// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // initialise les modèles  ajoute à l'objet de base de données
    db.User = userModel(sequelize);
    db.Article = articleModel(sequelize);
    db.Event = eventModel(sequelize);
    db.Horaire = horaireModel(sequelize);
    // synchroniser les tables avec la base de donnée a chaque connexion  vérifie quel est l'état actuel de la table dans la base de données puis effectue les modifications nécessaires dans la table pour qu'elle corresponde au modèle.
    await sequelize.sync({ alter: true });

    db.initialized = true;
}

// sequelize models with schema definitions
// on cree le model pour l'utilisateur
function userModel(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        // defaultValue quand on enregitre une personne sans préciser son roles il est automatiquement un USER
        roles: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' },

    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}

// on constitue le model pour les articles
function articleModel(sequelize){
    const attributes = {
        title: {type: DataTypes.STRING, allowNull: false},
        content: {type: DataTypes.TEXT, allowNull:false},
        image: {type: DataTypes.STRING, allowNull: false}
    }
    return sequelize.define('Article', attributes);

}

// model Evenement

function eventModel(sequelize ){
    const attributes ={
        title: {type: DataTypes.STRING, allowNull: false},
        description: {type:DataTypes.TEXT, allowNull: false},
        image: {type: DataTypes.STRING, allowNull: false},
        rdv : {type: DataTypes.STRING, allowNull: false}


    }
    return sequelize.define('Event', attributes);
}


// modele horaires

function horaireModel(sequelize){
    const attributes ={
        jour: {type: DataTypes.STRING, allowNull: false},
        debut_matin: {type: DataTypes.STRING, allowNull: false},
        fin_matin: {type: DataTypes.STRING, allowNull: false},
        debut_apresmidi: {type: DataTypes.STRING, allowNull: false},
        fin_apresmidi: {type: DataTypes.STRING, allowNull: false},
        fermeture_matin: {type: DataTypes.TINYINT, allowNull: false},
        fermeture_apresmidi: {type: DataTypes.TINYINT, allowNull: false},
    };
    return sequelize.define('Horaire', attributes);
}