module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define("Publication", {
        idPost: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pubText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [0, 3000] 
            }
        },
        photo: {
            type: DataTypes.STRING, 
            allowNull: true 
        },
        video: {
            type: DataTypes.STRING, 
            allowNull: true 
        },
        hide: {
            type: DataTypes.BOOLEAN, 
            allowNull: true 
        },
        idAgriculteur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Agriculteur', 
                key: 'idAgriculteur' 
            }
        }
    },{
        timestamps: false,
        tableName: 'Publication',
        freezeTableName: true,
    });

    Publication.associate = (models) => {
        Publication.belongsTo(models.Agriculteur, {
            foreignKey: 'idAgriculteur',
            allowNull: false
        });

        Publication.hasMany(models.Réaction, {
            foreignKey: 'idPost',
            as: 'likes',
            scope: {
                Textréaction: null
            }
        });

        Publication.hasMany(models.Réaction, {
            foreignKey: 'idPost',
            as: 'comments',
            scope: {
                Textréaction: {
                    [sequelize.Sequelize.Op.ne]: null
                }
            }
        });
    };

    return Publication;
};
