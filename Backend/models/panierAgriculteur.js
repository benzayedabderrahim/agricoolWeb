module.exports = (sequelize, DataTypes) => {
    const PanierAgriculteur = sequelize.define("PanierAgriculteur", {
        idPanieragriculteur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAgriculteur: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idTerrain: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'panieragriculteur',
        freezeTableName: true
    });
    const Agriculteur = require('./agriculteur')(sequelize, DataTypes);
    const Terrain = require('./terrain')(sequelize, DataTypes);

    PanierAgriculteur.belongsTo(Agriculteur, {
        foreignKey: 'idAgriculteur',
        allowNull: false
    });

    PanierAgriculteur.belongsTo(Terrain, {
        foreignKey: 'idTerrain',
        allowNull: false
    });


    try {
        PanierAgriculteur.sync();
    } catch (error) {
        throw new Error('Error defining associations for PanierAgriculteur: ' + error.message);
    }

    PanierAgriculteur.getAll = async function() {
        try {
            const panierAgriculteurs = await PanierAgriculteur.findAll({
                include: [Agriculteur, Terrain] 
            });
            return panierAgriculteurs;
        } catch (error) {
            throw new Error('Error fetching panieragriculteur: ' + error.message);
        }
    };

    return PanierAgriculteur;
};
