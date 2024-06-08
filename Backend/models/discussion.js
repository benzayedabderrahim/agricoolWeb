module.exports = (sequelize, DataTypes) => {
    const Discussion = sequelize.define("Discussion", {
        idAgriculteur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Agriculteur', 
                key: 'idAgriculteur'
            }
        },
        idCM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Commeragricole', 
                key: 'idCM'
            }
        }
    }, {
        timestamps: false, 
        tableName: 'Discussion', 
        freezeTableName: true 
    });

    Discussion.belongsTo(sequelize.models.Agriculteur, { foreignKey: 'idAgriculteur' });
    Discussion.belongsTo(sequelize.models.Commeragricole, { foreignKey: 'idCM' });

    return Discussion;
};
