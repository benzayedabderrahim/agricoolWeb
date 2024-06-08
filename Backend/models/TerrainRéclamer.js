module.exports = (sequelize, DataTypes) => {
    const TerrainRéclamer = sequelize.define("TerrainRéclamer", {
        idAgriculteur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Agriculteur', 
                key: 'idAgriculteur'
            }
        },
        idTerrain: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Terrain', 
                key: 'idTerrain'
            }
        },
        objet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false, 
        tableName: 'TerrainRéclamer', 
        freezeTableName: true 
    });

    TerrainRéclamer.belongsTo(sequelize.models.Agriculteur, { foreignKey: 'idAgriculteur' });
    TerrainRéclamer.belongsTo(sequelize.models.Terrain, { foreignKey: 'idTerrain' });

    return TerrainRéclamer;
};
