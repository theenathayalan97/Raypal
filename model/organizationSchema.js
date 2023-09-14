const { v4: uuidv4 } = require('uuid');

module.exports = (database, Sequelize) => {
    const organization = database.define("organization", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true
          },
        organization_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
        },
        created_by: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    },
        {
            timeStamps: true
        }
    );
    return organization;
}; 