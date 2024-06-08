module.exports = (sequelize, DataTypes) => {
    const Commande = sequelize.define('Commande', {
        Quantite: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPanierCM: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idProduit: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },{
        timestamps: false,
        tableName: 'Commande',
        freezeTableName: true
    });

    Commande.associate = function(models) {
        Commande.belongsTo(models.PanierCM, { foreignKey: 'idPanierCM' });
        Commande.belongsTo(models.Produit, { foreignKey: 'idProduit' });
    };

    return Commande;
};