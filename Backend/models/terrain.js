module.exports = (sequelize, DataTypes) => {
    const Terrain = sequelize.define("Terrain", {
        idTerrain: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titreTerrain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [0, 900] 
            }
        },
        prixTerrain: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        photo1: {
            type: DataTypes.STRING, 
            allowNull: true 
        },
        photo2: {
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
                model: 'agriculteur', 
                key: 'idAgriculteur' 
            }
        }
    }, {
        tableName: 'terrain',
        timestamps: false,
        freezeTableName: true 
    }); 

    Terrain.getAllProducts = async function() {
        return this.findAll({
            include: sequelize.models.Agriculteur // Include Agriculteur model to get nom and prenom
        });
    };

    //relation à un clé étranger
    Terrain.belongsTo(sequelize.models.Agriculteur, {
        foreignKey: 'idAgriculteur',
        allowNull: false
    });

    Terrain.createProduct = async function(data) {
        return this.create(data);
    };   

    return Terrain;
};
