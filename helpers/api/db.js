import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';

// orm permet de creer une correspondance entre un modele objet et un modele relationnel de base de donnée 


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

    // init models and add them to the exported db object
    db.User = userModel(sequelize);
    db.Article =articleModel(sequelize);
    db.Event =eventModel(sequelize);
    // sync all models with database synchroniser les tables avec la base de donnée a chaque connexion
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

function eventModel(){
    const attributes ={
        title: {type: DataTypes.STRING, allowNull: false},
        description: {type:DataTypes.TEXT, allowNull: false},
        image: {type: DataTypes.STRING, allowNull: false},
        rdv : {type: DataTypes.STRING, allowNull: false}


    }
    return sequelize.define('Event', attributes);
}
