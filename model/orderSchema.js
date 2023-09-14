const { v4: uuidv4 } = require('uuid');

module.exports = (database, Sequelize) => {
    const order = database.define("order", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
          },
        domain: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customer_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        payment_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        payment_method: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prize: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue : " bending "
        },
        links: {
            type: Sequelize.JSON,
            allowNull: false
        },
        transactions_status: {
            type: Sequelize.JSON,
            allowNull: false
        },
        is_active: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:true
        },
        is_delete: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue:false
        }
    },
        {
            timeStamps: true
        }
    );
    return order;
}; 


