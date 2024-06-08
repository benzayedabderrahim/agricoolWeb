module.exports = (sequelize, DataTypes) => {
    const Commeragricole = sequelize.define("Commeragricole", {
        idCM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photo: {
            type: DataTypes.STRING(255),
            allowNull: true
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
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numtelephone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    }, { 
        timestamps: false, 
        tableName: 'Commeragricole',
        freezeTableName: true
    });

    return Commeragricole;
};