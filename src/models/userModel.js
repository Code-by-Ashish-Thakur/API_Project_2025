export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING
    });
};
