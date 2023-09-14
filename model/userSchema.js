const { v4: uuidv4 } = require('uuid');

module.exports = (database, Sequelize) => {
    const user = database.define("user", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
          },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role_id: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "ef7497ff-7714-4f4f-bf5e-6c20bd26f49a"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        organization_id:{
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        domain: {
            type: Sequelize.STRING,
            allowNull: true
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:true
        },
        is_delete: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:false
        }
    },
        {
            timeStamps: true
        }
    );
    return user;
}; 