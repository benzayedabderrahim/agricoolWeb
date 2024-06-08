module.exports = (sequelize, DataTypes) => {
    const Produit = sequelize.define("Produit", {
        idProduit: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomProduit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        marque: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prix: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'Produit',
        freezeTableName: true
    });

    Produit.associate = (models) => {
        Produit.belongsTo(models.Agriculteur, { foreignKey: 'idAgriculteur' });
        Produit.hasMany(models.Commande, { foreignKey: 'idProduit' });
    };

    return Produit;
};
