const { v4: uuidv4 } = require('uuid');

module.exports = (database, Sequelize) => {
    const role = database.define("role", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
          },
        role_name: {
            type: Sequelize.STRING,
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
    return role;
}; 