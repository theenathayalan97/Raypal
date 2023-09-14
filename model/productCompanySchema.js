const { v4: uuidv4 } = require('uuid');

module.exports = (database, Sequelize) => {
    const product_company = database.define("product_company", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
          },
        product_company_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_prize: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        product_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        product_created_by: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
        {
            timeStamps: true
        }
    );
    return product_company;
}; 