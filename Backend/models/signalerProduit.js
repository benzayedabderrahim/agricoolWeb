module.exports = (sequelize, DataTypes) => {
    const SignalerProduit = sequelize.define("SignalerProduit", {
        idCM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idProduit: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'SignalerProduit',
        freezeTableName: true
    });

    SignalerProduit.belongsTo(sequelize.models.Commeragricole, { foreignKey: 'idCM' });
    SignalerProduit.belongsTo(sequelize.models.Produit, { foreignKey: 'idProduit' });

    return SignalerProduit;
};
