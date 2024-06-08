module.exports = (sequelize, DataTypes) => {
    const PanierCM = sequelize.define('PanierCM', {
        idPanierCM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCM: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProduit: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'PanierCM',
        freezeTableName: true
    });

    PanierCM.associate = function(models) {
        PanierCM.belongsTo(models.Produit, { foreignKey: 'idProduit' });
        PanierCM.belongsTo(models.Commeragricole, { foreignKey: 'idCM' }); 
        PanierCM.hasMany(models.Commande, { foreignKey: 'idPanierCM' });
    };

    return PanierCM;
};
