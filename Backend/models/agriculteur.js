module.exports = (sequelize, DataTypes) => {
    const Agriculteur = sequelize.define("Agriculteur", {
        idAgriculteur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numtelephone: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        isSuspend: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        nombrealertes: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'Agriculteur',
        freezeTableName: true
    });

    Agriculteur.associate = function(models) {
        Agriculteur.hasMany(models.Produit, {
            foreignKey: 'idAgriculteur',
            as: 'Produits'
        });
    };

    return Agriculteur;
};
