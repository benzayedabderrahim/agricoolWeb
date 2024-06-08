module.exports = (sequelize, DataTypes) => {
    const Reclamation = sequelize.define("Reclamation", { 
        idAgriculteur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Agriculteur',
                key: 'idAgriculteur'
            }
        },
        idPost: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Publication',
                key: 'idPost'
            }
        },
        TextReclamation: {
            type: DataTypes.TEXT, 
            allowNull: false
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, { 
        timestamps: false,
        tableName: 'Reclamation',
        freezeTableName: true
    });
    
    const Agriculteur = require('./agriculteur')(sequelize, DataTypes);
    const Publication = require('./posts')(sequelize, DataTypes);

    Reclamation.belongsTo(Agriculteur, {
        foreignKey: 'idAgriculteur',
        targetKey: 'idAgriculteur'
    });

    Reclamation.belongsTo(Publication, {
        foreignKey: 'idPost',
        targetKey: 'idPost'
    });

    return Reclamation;
};
