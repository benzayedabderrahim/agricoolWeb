module.exports = (sequelize, DataTypes) => {
    const DemandeTerrain = sequelize.define("DemandeTerrain", {
        idPanieragriculteur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'PanierAgriculteur',
                key: 'idPanieragriculteur'
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
        }
    }, {
        timestamps: false,
        tableName: 'DemandeTerrain',
        freezeTableName: true
    });

    const PanierAgriculteur = require('./panierAgriculteur')(sequelize, DataTypes);
    const Terrain = require('./terrain')(sequelize, DataTypes);

    DemandeTerrain.belongsTo(PanierAgriculteur, {
        foreignKey: 'idPanieragriculteur',
        allowNull: false
    });

    DemandeTerrain.belongsTo(Terrain, {
        foreignKey: 'idTerrain',
        allowNull: false
    });

    return DemandeTerrain;
};
