module.exports = (sequelize, DataTypes) => {
    const Réaction = sequelize.define('Réaction', {
        idReaction: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Textréaction: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        idAgriculteur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Agriculteur',
                key: 'idAgriculteur',
            },
        },
        idPost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Publication',
                key: 'idPost',
            },
        },
    }, {
        timestamps: false,
        tableName: 'Réaction',
        freezeTableName: true,
    });

    Réaction.associate = (models) => {
        Réaction.belongsTo(models.Agriculteur, {
            foreignKey: 'idAgriculteur',
            allowNull: false,
        });
        Réaction.belongsTo(models.Publication, {
            foreignKey: 'idPost',
            allowNull: false,
        });
    };

    return Réaction;
};
