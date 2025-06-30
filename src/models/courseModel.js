export default (sequelize, DataTypes) => {
    return sequelize.define('Course', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    });
};
