const Sequelize = require("sequelize"); 

const database = new Sequelize('paypal', 'root', '1234', { 
 		host: "localhost", 
  		dialect: 'mysql', 
}); 

const db = {}; 

db.Sequelize = Sequelize; 
db.database = database; 

db.user = require ("../model/userSchema") (database, Sequelize); 
db.role = require ("../model/roleSchema") (database, Sequelize); 
db.organization = require ("../model/organizationSchema") (database, Sequelize); 
db.product_company = require ("../model/productCompanySchema") (database, Sequelize); 
db.order = require ("../model/orderSchema") (database, Sequelize); 

module.exports = db; 