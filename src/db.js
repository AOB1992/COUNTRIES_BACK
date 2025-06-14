require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//const Country = require('./models/Country'); //commented by me 20/12
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//bring the models

const ActivityModel = require("./models/Activity");
const CountryModel = require("./models/Country");
//postgresql://postgres:ILZmORhJtJRgjuyawQMmXcTfMroMkxkT@postgres.railway.internal:5432/railway
//`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`
const sequelize = new Sequelize("postgresql://postgres:ILZmORhJtJRgjuyawQMmXcTfMroMkxkT@postgres.railway.internal:5432/railway", {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
//const { Pokemon } = sequelize.models; //commented by me

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
ActivityModel(sequelize)
CountryModel(sequelize)

const { Activity, Country } = sequelize.models

//Activity.hasMany(Country)
//Country.hasMany(Activity)
Activity.belongsToMany(Country, {through: 'Country_Activity'})
Country.belongsToMany(Activity, {through: 'Country_Activity'})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
